export class RecipeSidebar {
  constructor() {
    this.recipe = null;
    this.sidebarElement = document.querySelector(".recipe-sidebar");
    this.init();
  }

  init = () => {};

  renderComponent = () => {};

  buildComponent = () => {};

  header = () => {};

  content = () => {};

  setRecipe = (recipe) => {
    this.recipe = recipe;
    this.renderComponent();
  };

  hide = () => {
    this.sidebarElement.classList.remove("show");
  };

  show = () => {
    this.sidebarElement.classList.add("show");
  };
}
