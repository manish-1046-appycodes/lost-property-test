import { useEffect, useRef } from "react";


const ModuleMarquee = ({words}) => {

    const ref = useRef(null)

    useEffect( () => {

        const element = ref.current;

        let currentScroll = 0;
        let isScrollingDown = true;

        const part = element.querySelectorAll('.marquee__part');
        const inner = element.querySelectorAll('.marquee__inner');

        let tween = gsap.to(part, {xPercent: -100, repeat: -1, duration: 40, ease: "linear"}).totalProgress(0.5);

        gsap.set(inner, {xPercent: -50});

        window.addEventListener("scroll", function(){

            if ( window.pageYOffset > currentScroll ) {
                isScrollingDown = true;
            } else {
                isScrollingDown = false;
            }

            gsap.to(tween, {
                timeScale: isScrollingDown ? 1 : -1
            });

            currentScroll = window.pageYOffset
        });

    }, [ref]);

    return (
    <section  ref={ref} className="marquee overflow-hidden relative font-display text-[50px] lg:text-[140px] leading-[1.15] lg:leading-[1.15] select-none">
        <div className="marquee__inner w-fit flex flex-row" aria-hidden="true">
            
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
        <div className="marquee__part flex  shrink-0" dangerouslySetInnerHTML={ {__html: words+' &nbsp;'}}/>
            
            
            
        </div>


    </section>)
}

export default ModuleMarquee;
