import { LocalStorage } from "../storage.js";
import { Carrinho } from "./carinho.js";
import { Sidebar } from "./sidebar.js";

export class Recipes {
  constructor() {
    this.recipes = LocalStorage.get("recipes");
    this.filteredRecipes = this.recipes;
    this.recipesContainer = document.getElementById("RecipesContainer");
    this.sidebar = new Sidebar();
    this.searchInput = document.getElementById("buscaReceita");
    this.searchButton = document.querySelector(".btn-secondary");
    this.init();
  }

  init = () => {
    if (this.hasRecipes()) {
      this.render(this.buildComponent());

      this.recipesContainer.addEventListener("click", this.handleRecipeClick);
      this.handleShowCart();
      this.handleSearch();
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
    return this.filteredRecipes
      .map(({ id, title, image }) => {
        const recipe = new Recipe(id, title, image);

        return recipe.render();
      })
      .join("");
  };

  setRecipes = (recipes) => {
    this.recipes = recipes;
    this.filteredRecipes = recipes; 
  };

  hasRecipes = () => {
    return this.recipes.length > 0;
  };
}
handleSearch = () => {
  this.searchButton.addEventListener("click", () => {
    const searchTerm = this.searchInput.value.toLowerCase();
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    this.render(this.buildComponent());
  });

  this.searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const searchTerm = this.searchInput.value.toLowerCase();
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      );
      this.render(this.buildComponent());
    }
  });
};


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
const recipesInstance = new Recipes();