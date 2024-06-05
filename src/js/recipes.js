import { Sidebar } from "./sidebar.js";
import { recipeStore } from "./store/recipes.store.js";
import { recipeCard } from "./components.js";

export class Recipes {
  constructor() {
    this.recipesContainer = document.getElementById("RecipesContainer");
    this.sidebar = new Sidebar();
    this.init();
  }

  init = async () => {
    if (await this.hasRecipes()) {
      await this.render();

      this.recipesContainer.addEventListener("click", this.handleRecipeClick);
      this.handleShowCart();
    }
  };

  render = async () => {
    const recipes = await recipeStore.getItems();

    this.recipesContainer.innerHTML = recipes
      .map((recipe) => recipeCard(recipe))
      .join("");
  };

  handleShowCart = () => {
    document.querySelector(".cart").addEventListener("click", async () => {
      await this.sidebar.render();
    });
  };

  handleRecipeClick = async ({ target }) => {
    const recipes = await recipeStore.getItems();

    recipes.forEach(async (recipe) => {
      if (recipe.id === target.id) {
        await this.sidebar.setRecipe(recipe).render();
      }
    });
  };

  hasRecipes = async () => {
    return (await recipeStore.size()) > 0;
  };
}
