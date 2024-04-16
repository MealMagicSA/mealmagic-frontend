export class LocalStorage {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export class JsonParser {
  static get(url) {
    return new Promise((resolve, reject) => {
      try {
        const response = fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        resolve(response.json());
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    });
  }
}
