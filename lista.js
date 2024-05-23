let currentIndex = 0;

function updateCarousel() {
    const carousel = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const visibleItems = 5; // Mostrar 5 itens por vez
    const itemWidth = items[0].clientWidth;
    const newTransform = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${newTransform}px)`;
}

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

function addReceita() {
    const recipeInput = document.getElementById('new-recipe-url');
    const newRecipeUrl = recipeInput.value.trim();
    if (newRecipeUrl) {
        const carouselTrack = document.querySelector('.carousel-track');
        const newItem = document.createElement('div');
        newItem.classList.add('carousel-item');
        const newImage = document.createElement('img');
        newImage.src = newRecipeUrl;
        newImage.alt = `Receita ${document.querySelectorAll('.carousel-item').length + 1}`;
        newItem.appendChild(newImage);
        carouselTrack.appendChild(newItem);
        recipeInput.value = '';
        updateCarousel();
    }
}
