document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();

    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateLocalStorage();
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                updateLocalStorage();
            }
        });
    });
});

const recipes = [
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    {
        image: 'Img/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
        name: 'Macarronada da bere',
        ingredients: [
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 24', quantity: 1 },
            { name: 'Ingrediente 34', quantity: 1 },
            { name: 'Ingrediente 44', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
    // Adicione mais receitas conforme necessário
];

// Salva as receitas no localStorage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Carrega as receitas do localStorage e adiciona ao carrossel
function loadRecipes() {
    const storedRecipes = localStorage.getItem('recipes');
    if (!storedRecipes) {
        saveRecipes();
    }
    const carouselTrack = document.querySelector('.carousel-track');
    carouselTrack.innerHTML = '';
    const displayedRecipes = recipes.slice(0, 5); // Seleciona apenas as primeiras 5 receitas
    displayedRecipes.forEach((recipe, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}" onclick="showIngredients(${index})">`;
        carouselTrack.appendChild(item);
    });
}

function showIngredients(recipeIndex) {
    const recipe = recipes[recipeIndex];
    const listaCompras = document.getElementById('lista-compras');
    const conteudo = document.querySelector('.conteudo');

    // Limpa conteúdo existente
    conteudo.innerHTML = '';

    // Adiciona novos ingredientes
    recipe.ingredients.forEach(ingredient => {
        const ingredienteDiv = document.createElement('div');
        ingredienteDiv.classList.add('ingrediente');
        
        const img = document.createElement('img');
        img.src = 'public/images/alfinete.webp';
        img.alt = 'alfinete';
        
        const pName = document.createElement('p');
        pName.textContent = ingredient.name;
        
        const btnPlus = document.createElement('button');
        btnPlus.classList.add('plus');
        btnPlus.textContent = '+';
        
        const pQuantity = document.createElement('p');
        pQuantity.classList.add('quantity');
        pQuantity.textContent = ingredient.quantity;
        
        const btnMinus = document.createElement('button');
        btnMinus.classList.add('minus');
        btnMinus.textContent = '-';
        
        ingredienteDiv.appendChild(img);
        ingredienteDiv.appendChild(pName);
        ingredienteDiv.appendChild(btnPlus);
        ingredienteDiv.appendChild(pQuantity);
        ingredienteDiv.appendChild(btnMinus);
        
        conteudo.appendChild(ingredienteDiv);
    });

    // Adiciona event listeners aos novos botões
    const plusButtons = conteudo.querySelectorAll('.plus');
    const minusButtons = conteudo.querySelectorAll('.minus');

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateLocalStorage(recipeIndex, ingredient.name, quantity);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                updateLocalStorage(recipeIndex, ingredient.name, quantity);
            }
        });
    });

    // Mostra a seção de lista de compras
    listaCompras.style.display = 'block';
}

function updateLocalStorage(recipeIndex, ingredientName, newQuantity) {
    const recipe = recipes[recipeIndex];
    const ingredient = recipe.ingredients.find(ing => ing.name === ingredientName);
    if (ingredient) {
        ingredient.quantity = newQuantity;
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}
