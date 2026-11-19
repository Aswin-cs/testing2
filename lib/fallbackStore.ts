// In-memory fallback user store used if local MongoDB daemon is offline
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackUsers: StoredUser[] | undefined;
}

export const fallbackUsers: StoredUser[] = global.fallbackUsers || [];

if (!global.fallbackUsers) {
  global.fallbackUsers = fallbackUsers;
}
