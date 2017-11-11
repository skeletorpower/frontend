let sliderImages = document.querySelectorAll('.slide'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    current = 0;

// clear images
function reset(){
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
    }
}
//init slider
function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
}

//show previous, left arrow
function slideLeft(){
    reset();
    sliderImages[current -1].style.display = 'block';
    current--;
}

//left arrow click event
arrowLeft.addEventListener('click', function(){
    if(current === 0){
        current = sliderImages.length;
    }
    slideLeft();
});

//show next, right arrow
function slideRight(){
    reset();
    sliderImages[current +1].style.display = 'block';
    current ++;
}

//left arrow click event
arrowRight.addEventListener('click', function(){
    if(current === sliderImages.length-1){
        current = -1;
    }
    slideRight();
});



startSlide();
    




