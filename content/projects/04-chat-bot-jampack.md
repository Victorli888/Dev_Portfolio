---
title: "Hybrid AI Chat Bot"
origin: "Games For Love"
slug: "chat-bot-jampack"
summary: "Built a budget-aware AI chatbot for a children's hospital gaming non-profit — using a question-mapping layer to minimize API calls and keep costs sustainable for an organization with no room for waste."
stack: ["PHP", "WordPress", "Bricks UI"]
tags: ["ai", "chatbot", "nonprofit", "wordpress", "php", "budget"]
---

## Problem

Jampack is a subsidiary of Games for Love, a non-profit that supports children fighting for their lives in hospitals by delivering gaming content and community — giving kids a way to cope, connect, and find joy during some of the hardest experiences of their lives. The platform delivers that content digitally, and like any community platform, it generates questions: from users, volunteers, donors, and partners.

The challenge was answering those questions at scale without a full support team — and without the budget to use AI carelessly. Games for Love is a non-profit. Every dollar spent on API calls is a dollar not spent on getting gaming equipment into a hospital. The solution had to be smart about cost from the start, not as an optimization added later.

## Design Decisions

**Question mapping as the first line of defense.** Before a message ever reaches the AI, it passes through a pattern-matching layer that maps common questions to pre-written answers. FAQs, event information, volunteer onboarding questions, platform how-tos — a significant portion of inbound questions are variations of things the organization answers repeatedly. Catching those early and returning a direct answer costs nothing. The AI is reserved for questions the mapping layer can't confidently resolve.

This two-tier architecture — deterministic answers first, AI fallback second — was the core cost-control mechanism. The goal was to minimize AI invocations without degrading the experience for users asking questions that genuinely needed generative responses.

**PHP + WordPress + Bricks UI.** Jampack's existing stack was WordPress-based, so the chatbot had to integrate without a platform migration. The logic runs server-side in PHP, embedded into the WordPress environment. Bricks UI handled the frontend component integration. Working within the existing stack rather than introducing new infrastructure kept deployment simple and maintenance accessible to a team without dedicated engineering resources.

## Trade-offs

A mapping-first approach requires maintaining the mapping layer. As the organization evolves — new programs, new events, policy changes — the pre-written answers go stale if no one updates them. For an engineering team this is a minor overhead; for a small non-profit team where the people maintaining the chatbot aren't engineers, it's real friction. The design choice favored cost predictability over maintenance simplicity, which was the right call for the budget constraint but would need tooling to make the mapping layer editable by non-technical staff at scale.

The mapping layer also can't handle ambiguity well. A question that half-matches two different patterns either routes incorrectly or falls through to AI. Getting the matching logic right required iterating on the pattern definitions after seeing real user questions, not just hypothetical ones.

## Challenges + Debugging

This was my first real experience with context management in an AI integration. The chatbot needed to maintain conversational coherence — a follow-up question should be understood in the context of what was asked before, not treated as a new conversation from scratch. Managing that context window in a stateless PHP environment meant explicitly storing and passing conversation history with each request, rather than relying on any built-in session handling.

The early implementation had a subtle bug: context was being accumulated without any pruning. Long conversations would eventually pass so much history in the request that responses slowed down, costs crept up, and in edge cases the context window limit was hit. Adding a rolling window — keeping only the most recent N turns of history — fixed the performance and cost issue while preserving enough context for follow-up questions to make sense.

Working in PHP was also a new environment. My background was in C# and JavaScript; PHP's approach to web server integration, request handling, and WordPress's plugin/hook architecture all had their own learning curve. Getting the chatbot logic to work reliably within WordPress's lifecycle without conflicting with the existing site behavior required more careful integration work than building something greenfield would have.

## Impact

- Delivered an AI chatbot for a non-profit children's hospital gaming platform with cost-conscious architecture built in from day one.
- The question-mapping layer handles the high-frequency, low-complexity queries that would otherwise consume the majority of API budget for minimal added value.
- First hands-on experience with context management in an AI product — a lesson that directly informed how I approached the problem on every AI project that followed.
- Supported an organization whose mission is giving kids in hospitals something to look forward to.
