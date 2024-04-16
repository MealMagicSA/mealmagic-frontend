import { Recipes } from "./components/recipes.js";
import { JsonParser, LocalStorage } from "./storage.js";
import { recipesList } from "./utils/recipesData.js";

window.addEventListener("DOMContentLoaded", () => {
  LocalStorage.set("recipes", recipesList);

  // JsonParser.get("/json/recipes.json").then((data) =>
  //   LocalStorage.set("recipes", data)
  // );

  new Recipes();
});
