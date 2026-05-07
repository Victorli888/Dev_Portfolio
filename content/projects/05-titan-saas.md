---
title: "Titan SaaS"
origin: "Light & Wonder"
slug: "titan-saas"
summary: "Built a Class 2 gaming middleware platform from scratch — REST API, WPF Bingo UI, RNG, and progressive broadcasting — after being handed a fullstack engineering role with only a game dev background."
stack: ["C#", "ASP.NET Core", "WPF", "Docker"]
tags: ["saas", "gaming", "middleware", "api", "dotnet", "fullstack"]
---

## Problem

Class 2 gaming machines (EGMs) require a regulatory-compliant middleware layer between the physical machine and the Central Determination Server (CDS) — handling things like CD-approved random number generation, Bingo ball and card generation, progressive jackpot broadcasting, and game configuration. The existing stack had no clean abstraction for this. Customer trials were coming up, and the team needed a proper SaaS platform — now called Hyperion — that could sit on each EGM as a standalone service and speak the right protocols.

The scope was broad: RESTful API for the EGM client, a WPF Bingo UI overlay meeting Class 2 regulations, a configuration store for dynamic game settings, and real-time progressive broadcasting to the CDS. None of this existed yet.

The added constraint: I was handed this project as a game developer. My background was C# and Unity. I had never built a web API, designed a system architecture, or touched ASP.NET. I had to build the product and develop the engineering skills simultaneously.

## Design Decisions

**Monolithic over microservices.** The RFC for Hyperion explored a microservices architecture, but we rejected it. We were a small team, didn't have independent features blocking each other, and didn't need the operational overhead. A monolith let us move fast without the coordination cost. The design keeps the door open — if a customer engagement grows the team and the feature surface, the boundaries are clean enough to split later.

**ASP.NET Core for the API layer.** The existing Platform Services and CDS used the MK2SVC framework, so building on top of ASP.NET Core with the same foundation kept the integration surface familiar and reduced reinvention. About 30 endpoints cover full EGM game state — start, pause, reset, configuration reads and writes, progressive reporting.

**Protobuf for inter-process communication.** The Bingo UI runs as a separate WPF process and communicates with the Hyperion backend over a dedicated TCP port using Protocol Buffers. This mirrors the messaging pattern already used in Platform Services and CDS, keeps the message format compact, and keeps the UI process decoupled from direct business logic.

**Per-EGM deployment as a standalone Windows executable.** Rather than centralizing Hyperion on a single server, each EGM runs its own instance. This eliminates a single point of failure across a property's floor, matches how the existing MK2/Titan EGMs operated, and makes the deployment model simple — standard Windows executable management, no cluster orchestration required.

The Windows executable is the current shipping form. The planned next step is containerizing Hyperion as a Docker image, which would make the service OS-agnostic and open the door to deploying on Linux-based EGM hardware — removing the Windows dependency without changing the service contract for any EGM client.

**Existing Titan RNG.** Rather than building a new random number generator, Hyperion integrates the existing Titan RNG engine. Class 2 regulations require a CD-approved RNG, and Titan was already approved. Using it directly avoided a costly re-certification process.

## Trade-offs

Skipping authentication was a deliberate, reasoned call. Hyperion runs inside a closed LAN on the EGM floor — external access doesn't exist by design. Adding auth mechanisms would have added development time without meaningfully reducing the real threat surface in this deployment context. The document explicitly flags what would need to change if a customer required it: CDS-registered auth and network monitoring. It's deferred, not forgotten.

The configuration store supports multiple paytables but doesn't yet have a mechanism to validate which paytable is active and confirm that state is reflected on the CDS. That gap — along with cashout handling and proper health monitoring — represents the next layer of production-hardening work before a wider rollout.

## Challenges + Debugging

The hardest part of this project wasn't a technical problem — it was the skill gap. I came in knowing C# and Unity game development. Building Hyperion meant learning REST API design, HTTP, ASP.NET Core, system architecture tradeoffs, Protobuf, WPF inter-process communication, and CI/CD pipeline configuration, mostly in parallel, under real delivery pressure.

The mental shift from game developer to fullstack engineer was steep. In game dev, the "backend" is a game loop — deterministic, self-contained, frame-by-frame. In a web API context, requests arrive concurrently, state is distributed across processes, and failures are often silent until something downstream breaks. Learning to reason about that model while simultaneously shipping features took deliberate effort.

One concrete debugging challenge was the TCP channel between the Bingo UI process and the Hyperion backend. Early in development, the UI would occasionally stall — the WPF process had sent a Protobuf message over TCP but received no response, leaving the UI in a hanging state. The root cause was a message framing issue: TCP is a stream protocol, not a message protocol, and without explicit length-prefixing on the Protobuf messages, the reader on the backend side was sometimes blocking waiting for bytes that had already arrived in a prior read. Adding proper length-prefix framing to both sides resolved it completely.

## Impact

- Delivered a functioning Class 2 gaming middleware platform — API, Bingo UI, RNG, progressive broadcasting, config store — from zero.
- Load testing showed no performance bottlenecks compared to standard MK2/Titan EGMs on CDS.
- GitHub Actions CI pipeline catches build failures and runs unit tests on every PR and push to main.
- Positioned the team to onboard a pilot customer and iterate quickly on their feedback, with a CI/CD expansion plan in place for fast turnaround during the trial period.
- Personally grew from game developer to fullstack engineer — system design, REST APIs, inter-process communication, and infrastructure — in the span of this single project.
