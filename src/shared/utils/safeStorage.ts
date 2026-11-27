import { createJSONStorage } from 'zustand/middleware';

// localStorage can be blocked or full. Then the store still works, it is just not saved.
function tryStorage<T>(action: () => T, fallback: T): T {
  try {
    return action();
  } catch {
    return fallback;
  }
}

export const safeStorage = createJSONStorage(() => ({
  getItem: (name) => tryStorage(() => localStorage.getItem(name), null),
  setItem: (name, value) => tryStorage(() => localStorage.setItem(name, value), undefined),
  removeItem: (name) => tryStorage(() => localStorage.removeItem(name), undefined),
}));
