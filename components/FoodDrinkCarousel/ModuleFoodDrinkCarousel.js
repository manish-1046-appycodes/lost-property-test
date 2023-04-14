
import ButtonRound from "../Links/ButtonRound"
import ImageFade from "../ImageFade/ImageFade";
import { useEffect } from "react";

const FoodDrinkCarousel = ({carouselItems}) => {

    useEffect(() => {
        gsap.registerPlugin(Draggable, InertiaPlugin);

        var slideDelay = 1.5;
        var slideDuration = 0.3;

        var slide_containers = document.querySelectorAll('.slides-container2');

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
    }, []);

    return (
        <section className="min-h-screen w-full py-28 lg:py-52 flex items-center relative overflow-hidden">

            <div className="container absolute text-center w-full">
                <div className="max-w-[246px] mx-auto lg:max-w-none">
                <ImageFade
                    src="/image/del/found-bar-restaurant.svg"
                    width="476"
                    height="157"
                />
                </div>
            </div>

            <div className="container">
                <div className="max-w-1430px mx-auto ">
                    <div className=" w-full slides-container2">
                        <div className="transform translate-x-[-60%] lg:translate-x-0 w-full slides-inner relative">
                        
                        {( carouselItems?.carouselImages && 
                            carouselItems?.carouselImages.map( (carouselItem, i) => (

                                <article key={i} className="w-[150%] lg:w-10/12 relative shrink-0 ml-3 slide ">
                            
                                    <div className="w-7/12 lg:w-6/12 relative">
                                        <div className="pt-[100%] relative">

                                            {carouselItem?.sourceUrl && 
                                            <ImageFade
                                                src={carouselItem.sourceUrl}
                                                alt={carouselItem?.altText}
                                                layout="fill"
                                                objectFit="cover"
                                                objectPosition="center"
                                            />
                                            }
                                        </div>
                                        
                                    </div>

                                </article>

                            ))
                        )}
                        

                        
                        </div>
                    </div>
                </div>
                
            </div>

            
        </section>
    )
}

export default FoodDrinkCarousel
