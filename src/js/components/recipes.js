export class Recipes {
  constructor() {
    this.recipes = [];
    this.isLoading = true;
    this.recipesContainer = document.getElementById("RecipesContainer");
  }

  init = () => {
    this.fetchRecipes()
      .then(() => {
        this.renderComponent(this.buildComponent());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderComponent = (html) => {
    this.recipesContainer.innerHTML = html;
  };

  buildComponent = () => {
    if (this.isLoading) {
      return `
        <div class="loading">
          <div class="spinner">Loading...</div>
        </div>
      `;
    }

    return this.recipes
      .map(({ title, image }) => {
        const recipe = new Recipe(title, image);

        return recipe.renderComponent();
      })
      .join("");
  };

  fetchRecipes = () => {
    return new Promise((resolve, reject) => {
      const recipes = LocalStorage.get("recipes");

      if (recipes) {
        setTimeout(() => {
          this.setRecipes(recipes);

          this.isLoading = false;
          resolve(recipes);
        }, 2000);
      }

      reject("Recipes not found");
    });
  };

  setRecipes = (recipes) => {
    this.recipes = recipes;
  };
}

class Recipe {
  constructor(title, image) {
    this.title = title;
    this.image = image;
  }

  renderComponent = () => {
    return `
      <li class="flex-item">
        <i class="curte fa-solid fa-share-nodes"></i>
        <i class="curte fa-regular fa-heart"></i>
        <i class="text">${this.title}}</i>
        <img
          src="${this.image}"
          class="img w-100 h-100 object-fit-contain"
          alt="Seção1"
        />
      </li> 
    `;
  };
}
