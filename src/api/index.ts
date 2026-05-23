import { GarboResult } from '../types';

// Point to your running server. Change to your machine's LAN IP when testing on a device.
const API_URL = 'http://localhost:3001/api';

async function post<T>(path: string, body: object): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
}

export const verifyApi = {
  sendCode: (phone: string) =>
    post<{ status: string }>('/verify/send', { phone }),

  checkCode: (phone: string, code: string) =>
    post<{ valid: boolean; status: string }>('/verify/check', { phone, code }),
};

export const garboApi = {
  search: (params: {
    firstName: string;
    lastName: string;
    city?: string;
    state?: string;
    dob?: string;
  }) => post<GarboResult>('/garbo/search', params),
};
