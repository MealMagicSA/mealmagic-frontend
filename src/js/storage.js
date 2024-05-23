export class LocalStorage {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key)) ?? [];
  }

  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value ?? []));
  }
}
