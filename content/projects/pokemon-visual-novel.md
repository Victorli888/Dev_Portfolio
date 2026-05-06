---
title: "Pokémon Text Adventure"
slug: "pokemon-visual-novel"
summary: "A browser-based Pokémon text adventure built with React — my first web project, built entirely through self-teaching outside of work."
stack: ["JavaScript", "React", "HTML", "CSS"]
tags: ["personal", "react", "game", "self-taught", "beginner"]
---

## Problem

After spending my professional time in C# and Unity, I wanted to understand the web development world from the ground up. I had been working through The Odin Project curriculum and needed a real project to apply what I was learning — something small enough to finish but complex enough to actually test the skills.

A Pokémon text adventure was the right scope: it has branching narrative logic, stateful UI (player choices, battle state, a Pokémon party), and a clear enough domain that I wouldn't spend time figuring out what to build instead of how to build it.

## Design Decisions

**React for state-driven UI.** A text adventure is fundamentally a state machine — the current scene, the player's choices, the Pokémon on their team, battle outcomes. React's component model and state management mapped cleanly onto that structure. Each scene is a rendered state, and user decisions trigger state transitions. This made React a natural fit even as a beginner; the problem shape and the tool shape matched.

**Narrative-first structure.** The game opens at Professor Oak's Lab, where the player picks a starter Pokémon — Cyndaquil, Chikorita, or Totodile, each with distinct stats and traits. From there, the player moves through tall grass encounters, wild Pokémon battles, and branching decisions. The structure prioritizes the player's sense of agency: every fork in the story changes what happens next.

**No backend.** The entire game runs in the browser. Game state lives in React component state. There's no server, no database, no auth. For a first web project, eliminating the backend entirely was the right call — it let me focus entirely on learning JavaScript, React, and the DOM without splitting attention across a stack I hadn't touched yet.

## Trade-offs

Keeping the scope tight meant some Pokémon mechanics are simplified. Battle logic doesn't implement the full damage formula, type matchups are present but not exhaustive, and there's no persistent save state between sessions. A returning player starts fresh every time. These were intentional constraints — not design failures — to keep the project shippable as a learning exercise rather than a full game.

The choice of vanilla React (no routing library, no global state manager) also meant some prop-drilling as the component tree grew. At the scale of this project it was manageable, but it gave me direct experience with the exact pain that libraries like React Router and Zustand exist to solve.

## Challenges + Debugging

This was my first project in JavaScript and React, which meant every challenge was also a first encounter with a class of problem I'd never seen before.

The steepest learning curve was thinking in components. In Unity, a game object owns its own behavior — scripts attach to objects and run independently. In React, the component tree is declarative and data flows in one direction. Unlearning the Unity mental model and replacing it with React's took the first half of the project.

Event handling tripped me up early. Understanding how synthetic events work in React, why you don't call event handlers the same way you do in vanilla JS, and how to correctly wire up user interactions to state updates required working through a lot of small bugs before it clicked.

The Pokémon battle logic also surfaced a category of bug I hadn't anticipated: stale state. Because React state updates are asynchronous, reading state immediately after setting it gives you the old value. Early battle sequences were producing wrong results — a hit that should have reduced HP wasn't reflected in the next action's check — because I was reading from the state I thought I'd just updated. Learning to use the functional update form of `setState` to derive next state from the previous value fixed the class of bug entirely.

## Impact

- Shipped a complete, playable browser game as a first web project.
- Moved from zero JavaScript/React knowledge to a functional React application with stateful UI, game logic, and branching narrative.
- Established the foundation for everything that came after in web development — the hard lessons here (component thinking, async state, event handling) paid dividends on every subsequent project.
