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
        <button class="recipe-sidebar_close">
          <i class="fas fa-times"></i>
        </button>
        <img src='${image}' alt='Recipe Image' class='recipe-sidebar_head_img' /> 
      </div>
    `;
  };

  ingredients = (ingredientes) => {
    const ingredientsList = Object.entries(ingredientes)
      .map(([name, quantity]) => {
        return `<li>${name}: ${quantity}</li>`;
      })
      .join("");

    return `
        <h5>Ingredientes</h5>
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
      <h5>Modo de Preparo</h5>
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
    const closeBtn = this.sideBarContent.querySelector(".recipe-sidebar_close");

    closeBtn.addEventListener("click", () => {
      this.removeRecipe().hide();
    });

    this.overlay.addEventListener("click", () => {
      this.removeRecipe().hide();
    });
  };

  lockScroll = () => {
    document.body.style.overflow = "hidden";
  };

  unlockScroll = () => {
    document.body.style.overflow = "auto";
  };

  hide = () => {
    this.overlay.classList.remove("show");
    this.sideBarContent.parentElement.classList.remove("show");
    this.unlockScroll();
  };

  show = () => {
    this.overlay.classList.add("show");
    this.sideBarContent.parentElement.classList.add("show");
    this.lockScroll();
  };
}
