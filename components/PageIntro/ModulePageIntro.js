import { useEffect, useRef } from "react";
import ImageFade from "../ImageFade/ImageFade";

const ModulePageIntro = ({settings}) => {

    const ref = useRef();

    useEffect( () => {

        const element = ref.current;
        
        gsap.timeline({
            scrollTrigger: {
                trigger: element,
                scrub: true,
                start: "top center",
                end: "bottom top"
            }

        })
        .to(element, {
            y: '30vh'
        });
    }, [ref]);

    return (
        <header className="page-intro min-h-screen flex items-center py-20 lg:py-28 overflow-hidden">

            <div className="container">

                { settings?.image?.sourceUrl && 
                <div className="w-11/12 mx-auto max-w-[598px] mt-[25px] lg:mt-[70px]">
                    <div className="pt-[100%] relative z-10">
                        <ImageFade
                            src={settings?.image?.sourceUrl}
                            alt={settings?.image?.altText}
                            width="598"
                            height="598"
                            layout="fill"
                            priority
                        />
                    </div>
                </div>
                }
                <div
                ref={ref}
                dangerouslySetInnerHTML={ {__html: settings?.heading} }
                className="heading-brand-medium text-center transform translate-y-[-25px] lg:translate-y-[-70px] mx-auto "/>
            </div>

        </header>
    );
};

export default ModulePageIntro;
