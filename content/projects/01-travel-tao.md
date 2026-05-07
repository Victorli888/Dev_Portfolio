---
title: "Travel Tao"
origin: "Personal"
slug: "travel-tao"
summary: "A personal AI travel planning assistant powered by Claude — built to eliminate doom-scrolling, centralize trip research, and adapt plans dynamically when better options surface."
stack: ["TypeScript", "React", "Tailwind CSS", "Neon Postgres", "Claude API"]
tags: ["personal", "ai", "travel", "fullstack", "claude", "postgres"]
links:
  - label: GitHub
    url: https://github.com/Victorli888/travel-dao
---

## Problem

Planning a trip involves three distinct pain points that none of the existing tools solve together.

First, **discovery**: finding relevant content means spending hours across Reddit threads, travel blogs, YouTube videos, and review sites — most of it noise, none of it organized. The good stuff gets buried or lost in browser tabs.

Second, **organization**: once you have information, there's no good place to put it that ties together the what, the where, and the when. Spreadsheets are tedious. Notes apps lose structure. Travel apps are opinionated about itinerary format and don't accommodate the way you actually think about a trip.

Third, **adaptation**: even a well-researched plan falls apart on the ground. You hear about a place from a local, stumble onto something unexpected, or realize the original plan doesn't work. Re-planning mid-trip with scattered notes is friction at exactly the moment you don't want it.

I wanted a single AI-powered assistant that addressed all three: help me research, help me organize, and help me re-plan without losing context.

## Design Decisions

**Claude API as the core intelligence.** Claude handles the heavy lifting — synthesizing travel research into recommendations, structuring itinerary drafts from unstructured notes, and responding to re-planning requests mid-trip with full context of what's already been decided. The conversational interface means the planning process stays natural: you describe what you're looking for and Claude shapes it, rather than forcing input into rigid form fields.

**Neon Postgres for persistent conversation and trip state.** Trip planning isn't a single session. You come back to it over days or weeks, and the assistant needs to remember what was already discussed — destinations locked in, preferences stated, things ruled out. Neon's serverless Postgres stores conversation history and trip data persistently, so every session picks up where the last one left off without re-establishing context.

**React + Tailwind for the frontend.** The UI is intentionally minimal — a chat interface plus a structured trip view. Tailwind kept styling fast without a design system overhead. React managed the real-time feel of the assistant interaction and kept the conversation state in sync with the persisted trip data.

## Trade-offs

This is a personal tool first. There's no multi-user auth, no sharing features, no mobile app. Building those would have shifted the project from "solve my own problem" to "build a product" — a meaningful scope jump that wasn't the goal. The constraint of building only for myself kept decisions fast and the surface area small.

Using the Claude API also means ongoing cost per session. For a personal tool with low usage volume, this is negligible. At product scale it would require thinking about caching, prompt compression, and cost controls — trade-offs that aren't relevant here but would be the first things to address before any broader release.

## Challenges + Debugging

The hardest design problem was **context management**. A travel planning conversation can get long — multiple destinations, many preferences, evolving constraints. Naively passing the full conversation history to Claude on every message works until the context window becomes expensive or hits limits. The solution was to store full history in Postgres but summarize older segments before passing them back to Claude, keeping the active context window focused on recent decisions while preserving the ability to reference earlier ones on demand.

A trickier problem was **prompt design for re-planning**. Asking Claude to revise an existing itinerary while respecting already-committed plans (flights booked, accommodation reserved) required careful prompting. Early versions would confidently suggest changes that conflicted with fixed constraints. Building a structured representation of "locked" vs "flexible" items in the trip state, and injecting that into the system prompt explicitly, made Claude's suggestions reliable and constraint-aware.

## Impact

- Eliminated the doom-scrolling research phase — a single conversation can surface, evaluate, and organize destination research faster than manual browsing.
- Trip context persists across sessions, so returning to planning after a week away doesn't mean starting over.
- Mid-trip re-planning works: describe what changed, get an updated itinerary that respects what's already fixed.
- Built end-to-end solo across a stack I hadn't fully used before — TypeScript, Neon Postgres, and the Claude API all in one project.
