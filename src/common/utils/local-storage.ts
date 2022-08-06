export enum StorageKeyEnum {
  Symbols = 'X_CURRENCY_SYMBOLS'
}

export const clearStorage = () => localStorage.clear();

export const setLocalItem = (key: StorageKeyEnum, value: string) =>
  localStorage.setItem(key, value);

export const getLocalItem = (key: StorageKeyEnum) =>
  localStorage.getItem(key) ?? '';

export const removeLocalItem = (key: StorageKeyEnum) =>
  localStorage.removeItem(key);
