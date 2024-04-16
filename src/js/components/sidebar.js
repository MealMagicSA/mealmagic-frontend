export class RecipeSidebar {
  constructor() {
    this.recipe = null; // Type Recipe
    this.sideBarContent = document.querySelector(".content-wrapper");
    this.overlay = document.querySelector(".sidebar-overlay");
  }

  init = () => {
    this.renderComponent();
    this.handleCloseBtn();
  };

  renderComponent = () => {
    this.buildComponent();
    this.show();
  };

  buildComponent = () => {
    if (this.recipe) {
      this.sideBarContent.innerHTML = `
        ${this.header(this.recipe.image)}
        ${this.content(this.recipe)} 
      `;
    }
  };

  header = (image) => {
    return `
      <div class="recipe-sidebar_header">
        <img src='${image}' alt='Recipe Image' class='recipe-sidebar_head_img' /> 
      </div>
    `;
  };

  ingredients = (ingredientes) => {
    const ingredientsList = Object.entries(ingredientes).map(
      ([name, quantity]) => {
        return `<li>${name}: ${quantity}</li>`;
      }
    );

    return `
        <h3>Ingredientes</h3>
        <ul>
          ${ingredientsList} 
        </ul>
    `;
  };

  steps = (steps) => {
    const stepsList = steps
      .map(({ step, description }) => {
        return `<li data-step='${step}}'>${description}</li>`;
      })
      .join("");

    return `
      <h3>Modo de Preparo</h3>
        <ol>
          ${stepsList} 
        </ol>
    `;
  };

  content = ({ title, ingredientes, steps }) => {
    return `
      <div class="recipe-sidebar_content">
        <div class="recipe-sidebar_content_header">
          <h2>${title}</h2>
        </div>
        <div class="recipe-sidebar_content_body">
          <div class="recipe-sidebar_content_body_ingredients">
            ${this.ingredients(ingredientes)} 
          </div>
          <div class="recipe-sidebar_content_body_steps">
            ${this.steps(steps)}
          </div>
        </div>
      </div>
    `;
  };

  setRecipe = (recipe) => {
    this.recipe = recipe;
    return this;
  };

  removeRecipe = () => {
    this.recipe = null;
    return this;
  };

  handleCloseBtn = () => {
    const closeBtn = this.sideBarContent.previousElementSibling;

    closeBtn.addEventListener("click", () => {
      this.removeRecipe().hide();
    });

    this.overlay.addEventListener("click", () => {
      this.removeRecipe().hide();
    });
  };

  hide = () => {
    this.overlay.classList.remove("show");
    this.sideBarContent.parentElement.classList.remove("show");
  };

  show = () => {
    this.overlay.classList.add("show");
    this.sideBarContent.parentElement.classList.add("show");
  };
}
