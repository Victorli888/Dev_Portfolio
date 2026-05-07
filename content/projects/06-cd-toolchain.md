---
title: "CDToolchain Math Sim Overhaul"
origin: "Light & Wonder"
slug: "cd-toolchain-streamline-overhaul"
summary: "Re-architected a .NET math generation engine with async processing, cutting simulation time from weeks to days."
stack: ["C#", ".NET Framework", "WPF"]
tags: ["tooling", "devtools", "async", "performance", "dotnet"]
---

## Problem

Our game math SDK had accumulated years of tooling debt. Different team members had built different utilities independently, so the toolchain was a sprawl of overlapping tools — some widely used, some touched by one person years ago, most with no clear ownership. The result was a confusing SDK surface where onboarding a new developer meant a scavenger hunt just to figure out which tool to actually run.

Underneath that surface problem was a harder one: the math simulation pipeline was entirely synchronous. Every simulation step blocked the thread it ran on. On large game configurations, a full simulation run could take **weeks**, which meant developers were context-switching constantly, scheduling simulations as overnight or weekend jobs, and frequently discovering failures only after multi-day waits.

## Design Decisions

The core decision was to separate the overhaul into two distinct efforts: **surface cleanup** (consolidating the tool inventory) and **pipeline re-architecture** (async processing).

For surface cleanup, I audited usage across the SDK and interviewed team members to map which functions and modes were actively relied on versus legacy dead weight. Unused modes were removed rather than deprecated-in-place — deprecation notices tend to linger forever; hard removal forces the conversation. The consolidated toolset was reorganized around actual team workflows instead of how the original authors had thought about the problem.

For the pipeline, the re-architecture enabled parallel simulations across all bets and percentages — allowing automatic flow between each simulation stage, making it possible to run the entire process in a single operation. That meant a developer could kick off a full simulation run in the background during the workday or before leaving the office, and come back to completed results rather than scheduling it as a multi-day overnight job. Less waiting, more building.

## Trade-offs

The async refactor introduced non-trivial complexity around shared state. The original synchronous design made state management simple — one thing ran at a time, so there were no races. Moving to concurrent task execution meant auditing every piece of mutable state the simulation engine touched and either making it thread-safe or restructuring ownership so tasks didn't share mutable data.

We chose not to parallelize everything. Some simulation stages have strict ordering dependencies. Over-parallelizing would have required introducing synchronization primitives throughout, trading one kind of complexity for another. The goal was to eliminate unnecessary blocking, not to maximize raw concurrency.

The surface cleanup also carried organizational risk: removing modes someone considered "just in case" infrastructure. Getting team buy-in before cutting anything was slower than acting unilaterally, but it was the right call — it surfaced a few legitimate edge-case uses that would have been broken silently.

## Challenges + Debugging

The hardest debugging session involved a class of intermittent failures in simulation output — results that were wrong but not obviously so. The culprit turned out to be a shared random number generator being accessed concurrently from multiple tasks. In the synchronous world this was invisible; under async execution, tasks were racing to read and advance the RNG state, producing non-deterministic output. The fix was to give each task its own seeded RNG instance rather than sharing one, but finding the root cause required adding deterministic replay logging to the simulation so we could isolate which task sequence produced the divergent output.


## Impact

- Simulation time dropped from **weeks to days** — a reduction that materially changed how the team could iterate on game math, moving it from a scheduled batch job to something fast enough for a development feedback loop.
- Tool sprawl was eliminated. The consolidated SDK surface made onboarding straightforward and reduced the "which tool do I actually use?" confusion to zero.
- Removed years of dead code and unused modes, shrinking the maintenance surface the team had to reason about going forward.
