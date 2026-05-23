import { create } from 'zustand';
import { GarboResult, Match, Message, UserProfile } from '../types';
import { CURRENT_USER, MOCK_PROFILES } from '../data/mockProfiles';

interface AppState {
  currentUser: UserProfile;
  discoverQueue: UserProfile[];
  matches: Match[];
  messages: Record<string, Message[]>;
  phoneVerified: boolean;
  verifiedPhone: string | null;
  backgroundChecks: Record<string, GarboResult>;

  likeProfile: (profileId: string) => void;
  passProfile: (profileId: string) => void;
  sendMessage: (matchId: string, text: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setPhoneVerified: (phone: string) => void;
  addBackgroundCheck: (matchId: string, result: GarboResult) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: CURRENT_USER,
  discoverQueue: MOCK_PROFILES,
  matches: [],
  messages: {},
  phoneVerified: false,
  verifiedPhone: null,
  backgroundChecks: {},

  likeProfile: (profileId) => {
    const { discoverQueue, matches } = get();
    const profile = discoverQueue.find((p) => p.id === profileId);
    if (!profile) return;

    const isMatch = Math.random() > 0.4;
    set({
      discoverQueue: discoverQueue.filter((p) => p.id !== profileId),
      matches: isMatch
        ? [...matches, { id: `match-${profileId}`, profile, matchedAt: new Date(), lastMessage: undefined }]
        : matches,
    });
  },

  passProfile: (profileId) => {
    set((state) => ({
      discoverQueue: state.discoverQueue.filter((p) => p.id !== profileId),
    }));
  },

  sendMessage: (matchId, text) => {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      sentAt: new Date(),
      read: false,
    };
    set((state) => ({
      messages: {
        ...state.messages,
        [matchId]: [...(state.messages[matchId] ?? []), msg],
      },
      matches: state.matches.map((m) =>
        m.id === matchId ? { ...m, lastMessage: msg } : m
      ),
    }));
  },

  updateProfile: (updates) => {
    set((state) => ({ currentUser: { ...state.currentUser, ...updates } }));
  },

  setPhoneVerified: (phone) => {
    set({ phoneVerified: true, verifiedPhone: phone });
  },

  addBackgroundCheck: (matchId, result) => {
    set((state) => ({
      backgroundChecks: { ...state.backgroundChecks, [matchId]: result },
    }));
  },
}));
