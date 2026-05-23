export type Gender = 'man' | 'woman' | 'nonbinary' | 'other';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  gender: Gender;
  interestedIn: Gender[];
  photos: string[];
  location?: string;
}

export interface Match {
  id: string;
  profile: UserProfile;
  matchedAt: Date;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  sentAt: Date;
  read: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  Chat: { matchId: string };
  EditProfile: undefined;
};

export type MainTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Profile: undefined;
};
