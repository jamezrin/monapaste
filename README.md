# MonaPaste

Web application for sharing code/log related files

## Introduction

This project aims to not use any library or module that provides "plug and play" UI components.

The reason for that is that I want to learn to make my own UI components without basing myself off of "proven" modules
like Material UI, antd, Chakra UI, etc...

Things you would normally use from these libraries like buttons, option dropdowns, modals, tooltips, toast
notifications, etc. are built from the ground up, even if they are not to the standard of other components
regarding accessibility, API design, or performance.

It's also a playground for me to practice test-driven development with unit and integration tests in React as well
as Storybook for showcasing the components in isolation.

## Tech Stack

- Next.js with Typescript
- Monaco Editor Library (@monaco-editor/react)
- NextAuth.js
- Emotion
- Prisma + PostgreSQL
