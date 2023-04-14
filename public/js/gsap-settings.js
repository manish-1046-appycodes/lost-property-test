const gsapSettings = {


    carousels: () => {
        
        /*
        Draggable.create('.carousel', {
            type:"x",
            bounds: document.querySelector(".carousel-wrap"),
            //throwProps:true,
            inertia: true
        });*/
    },

    carouselLoop: () => {

        gsap.registerPlugin(Draggable, InertiaPlugin);

        var slideDelay = 1.5;
        var slideDuration = 0.3;

        var slide_containers = document.querySelectorAll('.slides-container');

        if ( slide_containers.length ) {
            slide_containers.forEach(function(slide_container) {
                
                var slides = slide_container.querySelectorAll(".slide");

                if ( slides.length ) {
                    var numSlides = slides.length;

                    for (var i = 0; i < numSlides; i++) {
                    gsap.set(slides[i], {
                        xPercent: i * 100
                    });
                    }

                    var timer = gsap.delayedCall(slideDelay, autoPlay);

                    var animation = gsap.to(slides, {
                    duration: 1, 
                    xPercent: "+=" + (numSlides * 100),
                    ease: "none",
                    paused: true,
                    repeat: -1,
                    modifiers: {
                        xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100)
                    }
                    });

                    var proxy = document.createElement("div");
                    gsap.set(proxy, { x: 0 });
                    var slideAnimation = gsap.to({}, {duration: 0.1});
                    var slideWidth = 0;
                    var wrapWidth = 0;
                    resize();

                    var draggable = new Draggable(proxy, {
                    type:"x",
                    trigger: slide_container,
                    throwProps: true,
                    onPress: updateDraggable,
                    onDrag: updateProgress,
                    onThrowUpdate: updateProgress,
                    snap: {     
                        //x: gsap.utils.snap(slideWidth)
                    }
                    });

                    window.addEventListener("resize", resize);

                    function updateDraggable() {
                    timer.restart(true);
                    slideAnimation.kill();
                    this.update();
                    }


                    function animateSlides(direction) {
                    timer.restart(true);
                    slideAnimation.kill();
                    
                    var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
                    
                    slideAnimation = gsap.to(proxy, {
                        duration: slideDuration,
                        //x: x,
                        onUpdate: updateProgress
                    });  
                    }

                    function autoPlay() {  
                    if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
                    timer.restart(true);
                    } else {
                        animateSlides(-1);
                    }
                    }

                    function updateProgress() {  
                    animation.progress(gsap.utils.wrap(0, 1, gsap.getProperty(proxy, "x") / wrapWidth));
                    }

                    function resize() {
                    var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
                    
                    slideWidth = slides[0].offsetWidth;
                    wrapWidth = slideWidth * numSlides;
                    
                    gsap.set(proxy, {
                        x: norm * wrapWidth
                    });
                    
                    animateSlides(0);
                    slideAnimation.progress(1);
                    }

                    function snapX(x) {
                    return Math.round(x / slideWidth) * slideWidth;
                    }

                }

            });
        }

    },

    init: () => {
        gsapSettings.carousels();
        gsapSettings.carouselLoop();
    }


}


const vhhack = () => {
    /**
     * 100VH hack
     */
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    var vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', vh+'px');
}
vhhack();

window.addEventListener('resize', vhhack);