class Testimonials{
    constructor(){
        this.slideNumber = 0;
        this.slidesCount = 0;
        this.slidesContainer = {};
        this.slides = [];
        this.moveLeftButton = {};
        this.moveRightButton = {};
        this.initialize();
        this.setupListeners();
    }

    initialize = () => {
        this.slidesContainer = document.getElementById('testimonialsSlides');
        this.moveLeftButton = document.getElementById('moveLeftButton');
        this.moveRightButton = document.getElementById('moveRightButton');
        this.slides = Array.from(document.querySelectorAll('[data-opinion]'));
        this.slidesCount = this.slides.length;

        new ResizeObserver(() => {
            this.resizeWindow();
          }).observe(document.body)
        
    }

    setupListeners = () => {
        this.moveLeftButton.addEventListener('click', this.translateXSlideLeft);
        this.moveRightButton.addEventListener('click', this.translateXSlideRight);
    }

    resizeWindow = () => {

        if(this.slides && this.slidesCount>=2){

            for(let slideIndex in this.slides){
                this.slides[slideIndex].style.width= '';
            }

            this.slideNumber = 0;
            this.slidesContainer.style.transform = `translateX(0px)`;

        } 
    }

    translateXSlideLeft = () => {
        if(this.slideNumber < this.slidesCount - 1){ 
            const focusedSlideWidth = this.slides[this.slideNumber].clientWidth;
            const normalSlideWidth = this.slides[this.slideNumber + 1].clientWidth;
            const delta = normalSlideWidth * -1;

            this.slideNumber += 1;

            this.slidesContainer.style.transform = `translateX(calc(${this.slideNumber} * ${delta}px))`;
            this.slides[this.slideNumber - 1].style.width = `${normalSlideWidth}px`;
            this.slides[this.slideNumber].style.width = `${focusedSlideWidth}px`;

            this.moveRightButton.classList.remove('btn--arrow--off');
            if(this.slideNumber == this.slidesCount-1){
                this.moveLeftButton.classList.add('btn--arrow--off');
            }
        }
    }

    translateXSlideRight = () => {
        if(this.slideNumber > 0){
            const focusedSlideWidth = this.slides[this.slideNumber].clientWidth;
            const normalSlideWidth = this.slides[this.slideNumber - 1].clientWidth;
            const delta = normalSlideWidth * -1;

            this.slideNumber -= 1;

            this.slidesContainer.style.transform = `translateX(calc(${this.slideNumber} * ${delta}px))`;
            this.slides[this.slideNumber + 1].style.width = `${normalSlideWidth}px`;
            this.slides[this.slideNumber].style.width = `${focusedSlideWidth}px`;

            this.moveLeftButton.classList.remove('btn--arrow--off');
            if(this.slideNumber == 0){
                this.moveRightButton.classList.add('btn--arrow--off');
            }

        }
        
    }
    
}

document.addEventListener('DOMContentLoaded', new Testimonials());



