import { RecipeSidebar } from "./sidebar.js";
import { LocalStorage } from "../storage.js";

export class Recipes {
  constructor() {
    this.recipes = [];
    this.isLoading = true;
    this.recipesContainer = document.getElementById("RecipesContainer");
    this.RecipeSidebar = new RecipeSidebar();
    this.init();
  }

  init = () => {
    this.setRecipes(LocalStorage.get("recipes"));

    if (this.recipes.length > 0) {
      this.renderComponent(this.buildComponent());
      this.recipesContainer.addEventListener("click", this.handleRecipeClick);
    }
  };

  renderComponent = (html) => {
    this.recipesContainer.innerHTML = html;
  };

  handleRecipeClick = (event) => {
    if (recipes) {
      this.recipes.forEach((recipe) => {
        if (recipe.id === event.target.id) {
          this.RecipeSidebar.setRecipe(recipe);
        }
      });
    }
  };

  buildComponent = () => {
    // if (this.isLoading) {
    //   return `
    //     <div class="loading">
    //       <div class="spinner">Loading...</div>
    //     </div>
    //   `;
    // }

    return this.recipes
      .map(({ id, title, image }) => {
        const recipe = new Recipe(id, title, image);

        return recipe.renderComponent();
      })
      .join("");
  };

  fetchRecipes = () => {};

  setRecipes = (recipes) => {
    this.recipes = recipes;
  };
}

class Recipe {
  constructor(id, title, image) {
    this.id = id;
    this.title = title;
    this.image = image;
  }

  renderComponent = () => {
    return `
      <li class="flex-item" id='${this.id}}'>
        <i class="curte fa-solid fa-share-nodes"></i>
        <i class="curte fa-regular fa-heart"></i>
        <i class="text">${this.title}</i>
        <img
          src="${this.image}"
          class="img w-100 h-100 object-fit-contain"
          alt="Seção1"
        />
      </li> 
    `;
  };
}
