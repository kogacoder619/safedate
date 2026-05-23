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
  phoneVerified?: boolean;
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

export interface GarboResult {
  sexOffenderHit: boolean;
  violentCrimes: string[];
  otherRecords: string[];
  checkedAt: string;
}

export type RootStackParamList = {
  PhoneVerify: undefined;
  Main: undefined;
  Chat: { matchId: string };
  EditProfile: undefined;
  BackgroundCheck: { matchId: string; profileName: string };
};

export type MainTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Profile: undefined;
};
