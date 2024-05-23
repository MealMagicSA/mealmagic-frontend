import { LocalStorage } from "./storage.js";
import { Sidebar } from "./sidebar.js";

export class Recipes {
  constructor() {
    this.recipes = LocalStorage.get("recipes");
    this.recipesContainer = document.getElementById("RecipesContainer");
    this.sidebar = new Sidebar();
    this.init();
  }

  init = () => {
    if (this.hasRecipes()) {
      this.render(this.buildComponent());

      this.recipesContainer.addEventListener("click", this.handleRecipeClick);
      this.handleShowCart();
    }
  };

  render = (html) => {
    this.recipesContainer.innerHTML = html;
  };

  handleShowCart = () => {
    document.querySelector(".cart").addEventListener("click", () => {
      this.sidebar.render();
    });
  };

  handleRecipeClick = ({ target }) => {
    this.recipes.forEach((recipe) => {
      if (recipe.id === target.id) {
        this.sidebar.setRecipe(recipe).render();
      }
    });
  };

  buildComponent = () => {
    return this.recipes
      .map(({ id, title, image }) => {
        const recipe = new Recipe(id, title, image);

        return recipe.render();
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

  render = () => {
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
