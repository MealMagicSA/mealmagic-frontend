import { LocalStorage } from "../storage.js";
import { RecipeSidebar } from "./sidebar.js";

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

    if (this.hasRecipes()) {
      this.renderComponent(this.buildComponent());

      this.recipesContainer.addEventListener("click", this.handleRecipeClick);
    }
  };

  renderComponent = (html) => {
    this.recipesContainer.innerHTML = html;
  };

  handleRecipeClick = ({ target }) => {
    if (this.hasRecipes()) {
      this.recipes.forEach((recipe) => {
        if (recipe.id === target.id) {
          this.RecipeSidebar.setRecipe(recipe).init();
        }
      });
    }
  };

  buildComponent = () => {
    return this.recipes
      .map(({ id, title, image }) => {
        const recipe = new Recipe(id, title, image);

        return recipe.renderComponent();
      })
      .join("");
  };

  setRecipes = (recipes) => {
    this.recipes = recipes;
  };

  hasRecipes = () => {
    return this.recipes.length > 0;
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
      <li class="flex-item" id='${this.id}'>
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
