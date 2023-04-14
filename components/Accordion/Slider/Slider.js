import React, { useEffect, useRef } from 'react'

import ImageFade from '../../ImageFade/ImageFade';

const Slider = ({parent, imgs, count}) => {

    const ref = useRef(null);
    const refDots = useRef(null);

    useEffect( () => {
        
        const slider = ref.current;
        const slides = slider.querySelectorAll(".slide");
        const container = slider.querySelector(".slider-inner");
        let dur = 0.5;
        let offsets = [];
        let oldSlide = 0;
        let activeSlide = 0;
        let dots = refDots.current;
        let navDots = [];
        let iw = slider.offsetWidth;

        

        // make the whole thing draggable
        let dragMe = Draggable.create(container, {
            type: "x",
            edgeResistance: 1,
            snap: offsets,
            inertia: true,
            bounds: slider,
            onDrag: tweenDot,
            onThrowUpdate: tweenDot,
            onDragEnd: slideAnim,
            allowNativeTouchScrolling: false,
            zIndexBoost: false
        });

        dragMe[0].id = "dragger";
        sizeIt();

        // set slides background colors and create the nav dots
        dots.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            //gsap.set(slides[i], { backgroundColor: colorArray[i] });
            
            let newDot = document.createElement("div");
            newDot.className = "dot w-[10px] h-[10px] border-blue-1 border-[1px] rounded-full hover:scale-110 transition-all cursor-pointer";
            newDot.index = i;
            navDots.push(newDot);
            newDot.addEventListener("click", slideAnim);
            dots.appendChild(newDot);
        }

        // lower screen animation with nav dots and rotating titles
        const dotAnim = gsap.timeline({ paused: true });
        dotAnim.to(
        ".dot",
        {
            stagger: { each: 1, yoyo: true, repeat: 1 },
            scale: 1.1,
            rotation: 0.1,
            ease: "none"
        },
        0.5
        );
        
        //dotAnim.time(1);

        // update the draggable element snap points
        function sizeIt() {
            offsets = [];
            iw = slider.offsetWidth;

            gsap.set(container, { width: slides.length * iw });
            gsap.set(slides, { width: iw });
            for (let i = 0; i < slides.length; i++) {
            offsets.push(-slides[i].offsetLeft);
            }
            gsap.set(container, { x: offsets[activeSlide] });
            dragMe[0].vars.snap = offsets;
        }


        //gsap.set(".hideMe", { opacity: 1 });
        //window.addEventListener("wheel", slideAnim);
        window.addEventListener("load", sizeIt);
        window.addEventListener("resize", sizeIt);


        // main action check which of the 4 types of interaction called the function
        function slideAnim(e) {
            
            oldSlide = activeSlide;
            // dragging the panels
            if (this.id === "dragger") {
            activeSlide = offsets.indexOf(this.endX);
            } else {
            if (gsap.isTweening(container)) {
                return;
            }
            // arrow clicks
            if (this.id === "leftArrow" || this.id === "rightArrow") {
                activeSlide =
                this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
                // click on a dot
            } else if (this.classList.contains('dot')) {

                activeSlide = this.index;
                // scrollwheel
            } else {
                activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
            }
            }
            // make sure we're not past the end or beginning slide
            activeSlide = activeSlide < 0 ? 0 : activeSlide;
            activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
            if (oldSlide === activeSlide) {
            return;
            }
            // if we're dragging we don't animate the container

            if (this.id != "dragger") {
                gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
            }
        }

        tweenDot();
        // update dot animation when dragger moves
        function tweenDot() {
            navDots.forEach(function(dot) {
                dot.classList.remove('scale-110');
                dot.classList.remove('bg-blue-1');
            });
            navDots[activeSlide].classList.add('scale-110','bg-blue-1')
            /*gsap.set(dotAnim, {
            time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
            });*/
        }

        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 100);

    }, [parent])

  return (
    <>
    
    <div ref={ref} className={`overflow-hidden w-full slider`}>
        <div className="slider-inner flex ">
            
            { imgs.map( ({sourceUrl, altText, caption}, i) =>
            <div key={`slider-${i}`} className="slide">
                <article className="w-full relative pt-[100%] shrink-0 group">
                    <ImageFade
                        src={sourceUrl}
                        objectFit="cover"
                        objectPosition="center"
                        alt={altText}
                        layout="fill"
                        loading="eager"
                    />
                               
                </article>

                { caption &&
                <div className='font-display p-2 lg:p-5 !pb-0' dangerouslySetInnerHTML={ {__html: caption}}/>
                }

            </div> )}
            
            


        </div>

        

    </div>
    <div ref={refDots} className="slider-dots flex space-x-2 mt-5"></div>
    </>
  )
}

export default Slider