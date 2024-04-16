import { JsonParser, LocalStorage } from "./storage";

window.addEventListener("DOMContentLoaded", () => {
  JsonParser.get("./json/recipes.json").then((data) =>
    LocalStorage.set("recipes", data)
  );
});
