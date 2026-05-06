---
title: "Small Talk"
slug: "small-talk"
summary: "An AI-powered Cantonese practice tool that teaches colloquial speech and local idioms — built to help me speak more deeply with my parents."
stack: ["TypeScript", "Deno", "Deno Fresh", "Preact", "Claude API"]
tags: ["personal", "ai", "language", "cantonese", "claude", "deno"]
---

## Problem

I was born and raised as a Chinese American. My parents only speak Cantonese — no English. Growing up, Cantonese was just the language of the house. But as I got older, the gap widened. My Cantonese stayed functional while theirs stayed fully native. I could talk about surface things — food, what I did today — but not deeply. The idioms, the metaphors, the colloquial expressions that carry real meaning in conversation: those I didn't have.

I wanted to close that gap. Not just to communicate better, but to actually connect. The kind of conversations that require you to sound like you belong in the language, not like a heritage speaker filling in vocabulary holes.

The problem with existing language tools is that they teach textbook language. Duolingo gives you correct Cantonese. It doesn't give you the way your parents' generation actually talks — the idioms a local uses, the metaphors that don't translate literally, the phrasing that signals you're comfortable in the language rather than performing it.

## Design Decisions

**AI as conversation partner and grader.** The core loop is practice through dialogue. Claude plays the role of a native Cantonese speaker in a realistic conversational scenario. After each exchange, it grades the response — not just for grammatical correctness but for naturalness: would a local say it this way, and if not, how would they actually say it? The feedback is specific and instructive, not just a score.

**Focus on colloquial speech and idioms.** The content is deliberately informal. Scenarios are modeled on the kinds of conversations that actually happen in daily Cantonese life — not "please direct me to the train station" but the small talk, the family conversation, the way you express frustration or affection or humor in the language. Claude's breadth of knowledge about regional Cantonese usage made it the right fit for generating and evaluating this kind of content.

**Deno + Deno Fresh.** This project was also an opportunity to learn outside of my established stack. Deno Fresh uses islands architecture — minimal JavaScript shipped to the client, with interactive components hydrated selectively. For a tool that's mostly text input and response rendering, that model fit well. Preact kept the component layer lightweight.

## Trade-offs

The grading is only as good as Claude's knowledge of colloquial Cantonese, which has limits — especially for highly regional expressions or very contemporary slang. The tool is more reliable for the kind of Cantonese my parents' generation speaks than for whatever is current on Hong Kong social media. That's actually fine for my use case, but it's a meaningful constraint if the tool were to serve a broader audience.

There's also no speech component. Real Cantonese fluency is deeply tonal and the written romanization (Jyutping) doesn't fully capture it. A text-based practice tool improves vocabulary and phrasing but can't train the ear or the mouth. That's a significant gap for a complete language learning product — and a real engineering challenge (speech recognition for tonal languages is harder) that I scoped out deliberately.

## Challenges + Debugging

The hardest prompt engineering problem was getting Claude to grade responses in a way that was genuinely instructive rather than either overly forgiving or pedantically corrective. Early prompts produced feedback that was either "great job, here's a minor tweak" (too soft to be useful) or a rewrite of the entire response with no explanation of why (too opaque to learn from). The right prompt structure explicitly asked Claude to identify the specific phrase or construction that felt unnatural, explain why a native speaker would phrase it differently, and provide one concrete alternative — keeping the feedback actionable and learnable.

The other challenge was personal: building a tool for a deeply personal reason is motivating but also harder to stay objective about. There were features I wanted to add because they felt meaningful — voice input, character practice, extended scenario packs — that would have made the project sprawl without making the core loop better. Shipping the practice-and-grade loop first, and leaving the rest for later, required the same discipline as any other scope decision.

## Impact

- A working practice tool I actually use for Cantonese conversation and idiom learning.
- The grading loop surfaces patterns in my own speech I hadn't noticed — recurring phrasing that sounds foreign, specific constructions to replace.
- Learned Deno and Fresh end-to-end on a real project, expanding my web stack beyond React/Node.
- Built something that matters personally: closing the language gap with my parents.
