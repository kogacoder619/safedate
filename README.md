# safedate

A React Native dating app built with Expo. Browse profiles, match, and chat — all in a clean mobile UI.

## Screenshots

| Discover | Matches | Profile |
|---|---|---|
| Browse profiles with like/pass | View your matches | Edit your profile |

## Features

- **Discover** — Swipe through profile cards with like and pass actions
- **Matches** — See everyone you've matched with at a glance
- **Chat** — Message your matches in a real-time-style thread
- **Profile** — Edit your name, age, and bio

## Tech stack

- [Expo](https://expo.dev) ~56
- [React Native](https://reactnative.dev) 0.85
- [React Navigation](https://reactnavigation.org) — bottom tabs + native stack
- [Zustand](https://zustand-demo.pmnd.rs) — global state
- TypeScript

## Getting started

```bash
npm install
npm start        # opens Expo Go QR code
npm run android
npm run ios
npm run web
```

Scan the QR code with the [Expo Go](https://expo.dev/go) app on your phone, or press `w` to open in the browser.

## Project structure

```
src/
├── screens/     # One file per screen
├── store/       # Zustand store (profiles, matches, messages)
├── types/       # Shared TypeScript types + nav param lists
└── data/        # Mock seed profiles
App.tsx          # Navigation root (Stack + Tab)
```
