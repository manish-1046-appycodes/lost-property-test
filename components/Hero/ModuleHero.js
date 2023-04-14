import { useRef, useEffect } from "react";

import ImageFade from "../ImageFade/ImageFade"

const Hero = ({heroTitle, heroImage}) => {
    
    const imageUrl = heroImage?.sourceUrl;

    const ref1 = useRef();
    const ref1_child = useRef();

    useEffect( () => {
        
        if ( ref1.current ) {
            let tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ref1.current,
                    scrub: true,
                    start: "top top",
                    end: "bottom top"
                }

            });

            

            gsap.set(ref1_child.current, {yPercent:0});

            tl2.to(ref1_child.current, {
                yPercent: 10
            });

        }

        window.dispatchEvent(new Event('resize'));

        return () => {

            if ( ref1.current ) {
                tl1.kill();
                tl1 = null;
            }

        }

    }, [])
    
    return (
    <div className='hero min-h-screen w-full relative flex'>

        <div ref={ref1} className="absolute h-full w-full overflow-hidden">

            <div ref={ref1_child} className="relative h-full w-full">

                <div className="relative h-full w-full block md:block">
                { imageUrl && 
                <ImageFade
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
                alt={heroImage?.altText || 'Lost Property - St Paul\'s, London'}/>}
                </div>

            </div>

        <div className="bg-black absolute inset-0 opacity-50"></div>

        </div>

        <div className="container text-white m-auto relative lg:text-center">
        <div className="heading-brand-small hidden lg:block" dangerouslySetInnerHTML={ {__html: heroTitle}}/>
        <h1 className="lg:hidden">
            <ImageFade
            src="/image/lost-property-logo-mob.svg"
            width="277"
            height="119"
            alt="Lost Property - St Paul's London"
            priority
            />
        </h1>
        </div>

    </div>
  )
}

export default Hero