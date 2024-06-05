import { cart } from "./store/cart.store";
import { cartContent, recipeContent, sidebarHeader } from "./components";

export class Sidebar {
  constructor() {
    this.recipe = null;
    this.sideBarContent = document.querySelector(".content-wrapper");
    this.overlay = document.querySelector(".sidebar-overlay");
  }

  render = async () => {
    await this.buildComponent();
    this.handleAddToCart();
  };

  buildComponent = async () => {
    if (this.recipe) {
      this.sideBarContent.innerHTML = `
        ${sidebarHeader(this.recipe.image)}
        ${recipeContent(this.recipe)} 
      `;
    } else {
      this.sideBarContent.innerHTML = `
        ${sidebarHeader()}
        ${cartContent(await cart.getItems())}
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
      addToCartBtn.addEventListener("click", async (e) => {
        console.log(this.recipe);
        await cart.createItem(this.recipe);
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

  handleCartActions = async () => {
    if ((await cart.size()) > 0) {
      const deleteBtn = document.querySelectorAll(".excluir_item");
      const quantityInputs = document.querySelectorAll(".details_quantity");

      deleteBtn.forEach((button) => {
        button.addEventListener("click", async (e) => {
          const { id } =
            e.target.parentElement.parentElement.parentElement.dataset;

          await cart.removeItem(id);
          this.buildComponent();
        });
      });

      quantityInputs.forEach((input) => {
        input.addEventListener("change", async (e) => {
          const { id } =
            e.target.parentElement.parentElement.parentElement.dataset;

          // this.cart.updateQuantity(id, e.target.value);
          await cart.updateItem(id, {
            quantity: +e.target.value,
          });
        });
      });
    }
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
