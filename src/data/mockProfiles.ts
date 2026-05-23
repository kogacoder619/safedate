import { UserProfile } from '../types';

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: '1',
    name: 'Alex',
    age: 27,
    bio: 'Coffee lover, hiker, and aspiring chef.',
    gender: 'woman',
    interestedIn: ['man', 'woman'],
    photos: [],
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Jordan',
    age: 30,
    bio: 'Software engineer by day, musician by night.',
    gender: 'man',
    interestedIn: ['woman'],
    photos: [],
    location: 'Oakland, CA',
  },
  {
    id: '3',
    name: 'Riley',
    age: 25,
    bio: 'Bookworm and travel enthusiast. Ask me about my last trip.',
    gender: 'nonbinary',
    interestedIn: ['man', 'woman', 'nonbinary'],
    photos: [],
    location: 'Berkeley, CA',
  },
];

export const CURRENT_USER: UserProfile = {
  id: 'me',
  name: 'You',
  age: 28,
  bio: 'Tell people about yourself!',
  gender: 'woman',
  interestedIn: ['man', 'woman', 'nonbinary', 'other'],
  photos: [],
};
