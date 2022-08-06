export enum StorageKeyEnum {
  Symbols = 'X_CURRENCY_SYMBOLS'
}

/**
 * @description clear local storage.
 */
export const clearStorage = () => localStorage.clear();

/**
 * @description set local storage.
 * @param key storage key
 * @param value storage value
 */
export const setLocalItem = (key: StorageKeyEnum, value: string) =>
  localStorage.setItem(key, value);

/**
 * @description get local storage by key.
 * @param key storage key
 * @returns {string} storage value
 */
export const getLocalItem = (key: StorageKeyEnum) =>
  localStorage.getItem(key) ?? '';

/**
 * @description remove local storage by key.
 * @param key storage key
 */
export const removeLocalItem = (key: StorageKeyEnum) =>
  localStorage.removeItem(key);
