import { Carrinho } from "./cart";

export class Sidebar {
  constructor() {
    this.recipe = null;
    this.sideBarContent = document.querySelector(".content-wrapper");
    this.overlay = document.querySelector(".sidebar-overlay");

    this.cart = new Carrinho();
  }

  render = () => {
    this.buildComponent();
    this.handleAddToCart();
  };

  buildComponent = () => {
    if (this.recipe) {
      this.sideBarContent.innerHTML = `
        ${this.header(this.recipe.image)}
        ${recipeContent(this.recipe)} 
      `;
    } else {
      this.sideBarContent.innerHTML = `
        ${this.header()}
        ${cartContent(this.cart.getAll())}
      `;
    }

    this.show();
    this.handleCloseBtn();
    this.handleCartActions();
    return this;
  };

  handleAddToCart = () => {
    const addToCartBtn = document.getElementById("add-carrinho");

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (e) => {
        this.cart.add(this.recipe);
        this.removeRecipe().buildComponent();
      });
    }
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

  handleCartActions = () => {
    if (this.cart.hasItems()) {
      const deleteBtn = document.querySelectorAll(".excluir_item");
      const quantityInputs = document.querySelectorAll(".details_quantity");

      deleteBtn.forEach((button) => {
        button.addEventListener("click", (e) => {
          const { id } =
            e.target.parentElement.parentElement.parentElement.dataset;

          this.cart.delete(id);
          this.buildComponent();
        });
      });

      quantityInputs.forEach((input) => {
        input.addEventListener("change", (e) => {
          const { id } =
            e.target.parentElement.parentElement.parentElement.dataset;

          this.cart.updateQuantity(id, e.target.value);
        });
      });
    }
  };

  header = (image) => {
    return `
      <div class="recipe-sidebar_header" style='height: ${
        image ? "250px" : "60px"
      }'>
        <button class="recipe-sidebar_close">
          <i class="fas fa-times"></i>
        </button>
        ${
          image
            ? `<img src='${image}' alt='Recipe Image' class='recipe-sidebar_head_img' />`
            : ""
        }
         
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

  hide = () => {
    this.overlay.classList.remove("show");
    this.sideBarContent.parentElement.classList.remove("show");
    document.body.style.overflow = "auto";

    return this;
  };

  show = () => {
    this.overlay.classList.add("show");
    this.sideBarContent.parentElement.classList.add("show");
    document.body.style.overflow = "hidden";

    return this;
  };
}

const recipeContent = ({ title, ingredientes, steps }) => {
  const ingredientsList = (ingredientes) => {
    const ingredients = Object.entries(ingredientes)
      .map(([name, quantity]) => {
        return `<li>${name}: ${quantity}</li>`;
      })
      .join("");

    return `
        <h5>Ingredientes</h5>
        <ul>
          ${ingredients} 
        </ul>
    `;
  };

  const recipeStepsList = (steps) => {
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

  return `
      <div class="recipe-sidebar_content">
        <div class="recipe-sidebar_content_header">
          <h2>${title}</h2>
        </div>
        <div class="recipe-sidebar_content_body">
          <div class="recipe-sidebar_content_body_ingredients">
            ${ingredientsList(ingredientes)} 
          </div>
          <div class="recipe-sidebar_content_body_steps">
            ${recipeStepsList(steps)}
          </div>
        </div>
        <div class='recipe-sidebar_footer'>
          <button id='add-carrinho' class='btn btn-primary'>Adicionar no Carrinho +</button>
        </div>
      </div>
    `;
};

const cartContent = (cartData) => {
  const item = ({ id, title, image, quantidade }) => {
    return `
        <div class='cart-link' data-id='${id}'>
              <li class='cart-list_item'>
                <a href='/lista/index.html'><img src='${image}' alt='${title}' />
                <span class='cart-item_title'>${title}</span></a> 

                <div class='details'>
                  <input type='number' value='${quantidade}' class='details_quantity' min='1' />
                  <button class='excluir_item'>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li> 
            </div> 
      `;
  };

  return `
      <div class='cart-sidebar_content'>
        <div class='cart-sidebar_content_body'>
          <ul class='cart-list'>
            ${cartData
              .map((cartItem) => {
                return item(cartItem);
              })
              .join("")} 
          </ul> 
        </div>        
      </div>
    `;
};
