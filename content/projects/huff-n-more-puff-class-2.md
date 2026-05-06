---
title: "HuffNMorePuff Class 2"
slug: "huff-n-more-puff-class-2"
summary: "Solo-developed a Class 2 slot game inspired by the Three Little Pigs — owning the full product lifecycle from Class 3 conversion to math generation to field deployment."
stack: ["C#", "Unity"]
tags: ["gaming", "class-2", "solo", "sdlc", "math"]
---

## Problem

HuffNMorePuff is a Class 2 slot game built around the story of the Three Little Pigs — players earn through a base game, bonus rounds, and jackpots, with the wolf's "huff and puff" mechanic driving the game's identity. The starting point was an existing Class 3 game: one where outcomes are determined locally by the machine's own RNG. The goal was to convert it to Class 2 — where game outcomes are determined by a Central Determination Server (CDS) using a CD-approved Bingo-based RNG — and get it certified and into the field.

This was my first project with full end-to-end ownership. No senior developer to hand off the hard parts. I was the sole developer and the main technical point of contact across product management, the art team, and QA throughout the entire lifecycle.

## Design Decisions

**Class 3 → Class 2 conversion as the architectural spine.** Class 2 compliance isn't a feature you bolt on — it changes how the game fundamentally resolves outcomes. The local RNG calls had to be replaced with CDS-mediated requests, and the game logic had to be restructured around receiving externally-determined outcomes rather than generating them internally. Every place in the codebase that produced a game result was audited and re-routed.

**Class 2 math generation from scratch.** Class 2 games require a separate math model that maps Bingo outcomes from the CDS to game results (reel stops, bonus triggers, jackpot awards). Generating this math meant building paytables and probability distributions that satisfied both the regulatory requirements and the game's target return-to-player. The math had to be submitted for approval as part of certification.

**Keeping the Class 3 game as a reference.** Rather than rebuilding from nothing, the existing Class 3 game served as the visual and gameplay reference. This let the art and product teams stay aligned on what the game should look and feel like, while the engineering work focused on the underlying mechanism change. It also gave QA a direct comparison target for regression testing.

## Trade-offs

Being the sole developer meant prioritizing ruthlessly. There was no bandwidth to build every feature the product team wanted in the first release. Early conversations with product management established a clear scope for the initial field build — base game, bonus, and jackpot — with more speculative features pushed to a potential follow-up. Getting a stable, certified game to field was the success criterion, not feature completeness.

Cross-team communication also required time that would otherwise go into code. As the main point of contact for art, QA, and product, I was the integration layer between disciplines that didn't always speak the same language. That was non-negotiable — no one else could resolve an art asset spec question or a QA repro ambiguity at the technical level — but it meant context-switching constantly during development.

## Challenges + Debugging

The steepest challenge was the sheer scope of ownership. In prior work I had always had a layer of support — a senior developer who had seen the problem before, or a narrower slice of the system to own. Here, every category of problem was mine: bugs the art team introduced through asset updates, QA-reported edge cases in bonus logic, math discrepancies caught during review, build issues in the CI pipeline. Learning to triage all of that simultaneously, without losing forward momentum on the core development work, was the real skill built on this project.

One recurring class of bugs came from the Class 2 outcome mapping. The CDS returns a Bingo result, and the game has to translate that into a specific reel outcome deterministically. Early in development, certain CDS result patterns would map to reel states that the paytable didn't account for — either producing incorrect payouts or crashing the outcome resolver. Fixing these required going back to the math model, identifying the gap in the mapping table, regenerating the affected math, and re-validating end-to-end. It was slow, methodical work, and it taught me to think about the full input space of a system before declaring it done.

## Impact

- Shipped a complete Class 2 game — base game, bonuses, and jackpots — from conversion through certification to field deployment.
- Sole developer and cross-functional point of contact across product, art, and QA for the full project lifecycle.
- Developed a working understanding of the full software development lifecycle: requirements, design, implementation, testing, certification, and deployment.
- The project established a personal baseline: what it actually takes to own something from idea to field, and how to problem-solve without a safety net.
