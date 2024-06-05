export const recipeCard = (recipe) => {
  return `
      <li class="flex-item" id='${recipe.id}'>
        <i class="curte fa-solid fa-share-nodes"></i>
        <i class="curte fa-regular fa-heart"></i>
        <i class="text">${recipe.title}</i>
        <img
          src="${recipe.image}"
          class="img w-100 h-100 object-fit-contain"
          alt="Seção1"
        />
      </li> 
    `;
};

export const sidebarHeader = (image) => {
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

const ingredientsList = (ingredients) => {
  const ingredientsContent = ingredients
    .map(({ name, quantity }) => {
      return `<li>${name}: ${quantity}</li>`;
    })
    .join("");

  return `
        <h5>Ingredientes</h5>
        <ul>
          ${ingredientsContent} 
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

export const recipeContent = ({ title, ingredients, steps }) => {
  return `
      <div class="recipe-sidebar_content">
        <div class="recipe-sidebar_content_header">
          <h2>${title}</h2>
        </div>
        <div class="recipe-sidebar_content_body">
          <div class="recipe-sidebar_content_body_ingredients">
            ${ingredientsList(ingredients)} 
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

const cartItemCard = ({ id, title, image, quantity }) => {
  return `
        <div class='cart-link' data-id='${id}'>
              <li class='cart-list_item'>
                <a href='/lista/index.html'><img src='${image}' alt='${title}' />
                <span class='cart-item_title'>${title}</span></a> 

                <div class='details'>
                  <input type='number' value='${quantity}' class='details_quantity' min='1' />
                  <button class='excluir_item'>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li> 
            </div> 
      `;
};

export const cartContent = (cartData) => {
  return `
      <div class='cart-sidebar_content'>
        <div class='cart-sidebar_content_body'>
          <ul class='cart-list'>
            ${cartData
              .map((cartItem) => {
                return cartItemCard(cartItem);
              })
              .join("")} 
          </ul> 
        </div>        
      </div>
    `;
};
