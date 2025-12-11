// app/utils/storage.js
export const isBrowser = () => {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
};

// Safe getter with default value
export const getLocalStorage = (key, defaultValue) => {
  if (!isBrowser()) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return defaultValue;
  }
};

// Safe setter
export const setLocalStorage = (key, value) => {
  if (!isBrowser()) return;
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    // Dispatch a custom event when theme changes
    if (key === 'theme') {
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: value }));
    }
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};