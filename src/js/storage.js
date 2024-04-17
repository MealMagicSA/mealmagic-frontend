export class LocalStorage {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key)) ?? [];
  }

  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value ?? []));
  }
}

export class JsonParser {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error fetching or parsing JSON:", error);
          reject(error);
        });
    });
  }
}
