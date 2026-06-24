const STORAGE_AVAILABLE =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const storage = {
  save: (key: string, data: unknown) => {
    if (!STORAGE_AVAILABLE) return;
    try {
      const serialized = JSON.stringify(data);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Failed to save state to Local Storage:', error);
    }
  },

  load: <T>(key: string, fallback: T): T => {
    if (!STORAGE_AVAILABLE) return fallback;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch (error) {
      console.error('Failed to load state, returning fallback:', error);
      return fallback;
    }
  },
};