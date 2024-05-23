import { Carrinho } from "./components/carinho.js";
import { Recipes } from "./components/recipes.js";
import { LocalStorage } from "./storage.js";
import { recipesList } from "./utils/recipesData.js";

window.addEventListener("DOMContentLoaded", () => {
  LocalStorage.set("recipes", recipesList);

  new Recipes();
  new Carrinho();
});
