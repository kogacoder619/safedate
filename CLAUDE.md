# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (scan QR with Expo Go)
npm start

# Platform-specific
npm run android
npm run ios
npm run web
```

No test runner or linter is configured. TypeScript checking uses the Expo base config with the `tsconfig.json` in the root.

## Architecture

**safedate** is a React Native (Expo 56) dating/social app. Navigation uses React Navigation with a two-level structure: a root `NativeStackNavigator` wrapping a `BottomTabNavigator` for the three main tabs.

### Navigation structure

```
Stack (RootStackParamList)
├── Main → BottomTabNavigator (MainTabParamList)
│   ├── Discover
│   ├── Matches
│   └── Profile
├── Chat          ← pushed from MatchesScreen
└── EditProfile   ← pushed from ProfileScreen
```

Navigation types (`RootStackParamList`, `MainTabParamList`) live in `src/types/index.ts`.

### State management

All app state lives in a single Zustand store at `src/store/appStore.ts`:

- `discoverQueue` — profiles the current user hasn't acted on yet
- `matches` — profiles that mutually liked (simulated with 60% probability on like)
- `messages` — `Record<matchId, Message[]>`, keyed by match ID
- `currentUser` — the logged-in user's profile

State is in-memory only; there is no persistence layer.

### Data layer

`src/data/mockProfiles.ts` contains static seed data: `MOCK_PROFILES` (discover queue) and `CURRENT_USER` (the local user). Replace these with API calls when a backend is added.

`src/types/index.ts` defines all shared types: `UserProfile`, `Match`, `Message`, `Gender`, and the navigation param lists.

### Screens

| Screen | File | Purpose |
|---|---|---|
| DiscoverScreen | `src/screens/DiscoverScreen.tsx` | Shows top of discover queue; like/pass buttons update store |
| MatchesScreen | `src/screens/MatchesScreen.tsx` | Lists matches; taps navigate to Chat |
| ChatScreen | `src/screens/ChatScreen.tsx` | Per-match message thread |
| ProfileScreen | `src/screens/ProfileScreen.tsx` | Displays current user; links to EditProfile |
| EditProfileScreen | `src/screens/EditProfileScreen.tsx` | Edits name/age/bio via `updateProfile` |
