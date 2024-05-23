let currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadReceita();
    addQuantityButtonListeners();
    updateCarousel();
});

function proxItem() {
    const items = document.querySelectorAll('.carousel-item');
    const visibleItems = 5;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = Math.ceil(items.length / visibleItems) - 1;
    }
    updateCarousel();
}

function nextItem() {
    const items = document.querySelectorAll('.carousel-item');
    const visibleItems = 5;
    if (currentIndex < Math.ceil(items.length / visibleItems) - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const visibleItems = 5;
    const totalItems = items.length;
    const start = currentIndex * visibleItems;
    const end = Math.min(start + visibleItems, totalItems);

    items.forEach((item, index) => {
        if (index >= start && index < end) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

const receita = [
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
            { name: 'Ingrediente 1', quantity: 1 },
            { name: 'Ingrediente 2', quantity: 1 },
            { name: 'Ingrediente 3', quantity: 1 },
            { name: 'Ingrediente 4', quantity: 1 },
            { name: 'Ingrediente 5', quantity: 1 }
        ]
    },
   
];

function saveReceita() {
    localStorage.setItem('receita', JSON.stringify(receita));
}

function loadReceita() {
    const storedReceita = localStorage.getItem('receita');
    if (!storedReceita) {
        saveReceita();
    }
    const carouselTrack = document.querySelector('.carousel-track');
    carouselTrack.innerHTML = '';
    receita.forEach((receita, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = `<img src="${receita.image}" alt="${receita.name}" onclick="showIngredients(${index})"><p>${receita.name}</p>`;
        carouselTrack.appendChild(item);
    });
    updateCarousel(); 
}

function showIngredients(receitaIndex) {
    const receitas = receita[receitaIndex];
    const listaCompras = document.getElementById('lista-compras');
    const conteudo = document.querySelector('.conteudo');

    conteudo.innerHTML = '';

    receitas.ingredients.forEach(ingredient => {
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

    addQuantityButtonListeners();

    listaCompras.style.display = 'block';
}

function addQuantityButtonListeners() {
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
            const quantityElement = this.shareiousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                updateLocalStorage();
            }
        });
    });
}

function updateLocalStorage(receitaIndex, ingredientName, newQuantity) {
    const receitas = receita[receitaIndex];
    const ingredient = receitas.ingredients.find(ing => ing.name === ingredientName);
    if (ingredient) {
        ingredient.quantity = newQuantity;
        localStorage.setItem('receita', JSON.stringify(receita));
    }
}
function shareWhatsApp() {
    const conteudo = document.querySelector('.conteudo');
    const ingredientes = conteudo.querySelectorAll('.ingrediente');
    
    let listaTexto = 'Lista de Compras:\n';
    
    ingredientes.forEach(ingrediente => {
        const nome = ingrediente.querySelector('p').textContent;
        const quantidade = ingrediente.querySelector('.quantity').textContent;
        listaTexto += `${nome}: ${quantidade}\n`;
    });
    
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(listaTexto)}`;
    
    window.open(whatsappLink, '_blank');
}
