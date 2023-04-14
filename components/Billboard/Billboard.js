import { useState, useRef, useEffect } from 'react';

import ButtonRound from '../Links/ButtonRound'
import ButtonSecondary from '../Links/ButtonSecondary'
import ImageFade from '../ImageFade/ImageFade';
import ChevDown from '../../public/image/icon/chev-down.svg'



const { motion } = require("framer-motion");

const variants = {
    open: { height: 'auto', opacity: 1, transition: { duration: 0.5} },
    closed: { height: 0, opacity: 0 },
}

const Billboard = ( {settings} ) => {

    const ref1 = useRef();
    const ref2 = useRef();
    const ref2_child = useRef();

    useEffect( () => {
        

        if ( ref1.current ) {
            let tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ref1.current,
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top"
                }
            });

            gsap.set(ref1.current, {yPercent:50});

            tl1.to(ref1.current, {
                yPercent: -25
            });
        }

        if ( ref2.current ) {
            let tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ref2.current,
                    scrub: true,
                    start: "top top",
                    end: "bottom top"
                }

            });

            

            gsap.set(ref2_child.current, {yPercent:0});

            tl2.to(ref2_child.current, {
                yPercent: 10
            });

        }

        window.dispatchEvent(new Event('resize'));

        return () => {

            if ( ref1.current ) {
                tl1.kill();
                tl1 = null;
            }

            if ( ref2.current ) {
                tl2.kill();
                tl2 = null;
            }
        }

    }, [])

    const [isOpen, setIsOpen] = useState(false);

    const captionImgClass = ( settings.bg_type === 'caption_img' && settings.img.img_pos === 'right' ) ? "md:left-1/2" : "md:left-0";
    
    const captionCaptionClass = ( settings.bg_type === 'caption_img' && settings.img.img_pos === 'right' ) ? "absolute w-1/2 left-0 top-1/2" : "absolute w-auto right-0 top-1/2";

    let contentAlignmentHorizMob;
    if ( settings.content_alignment_mob == 'left' ) {
        contentAlignmentHorizMob = 'justify-start ml-[-20px] md:ml-0';
    } else if ( settings.content_alignment_mob == 'right' ) {
        contentAlignmentHorizMob = 'justify-end mr-[-20px] md:mr-0';
    } else {
        contentAlignmentHorizMob = 'justify-around';
    }

    const contentAlignmentVerticalMob = ( settings.content_alignment_vertical_mob === 'bottom' ) ? "pt-[255px]" : "pb-[255px]";
    const contentAlignmentVertical = ( settings.content_alignment_vertical === 'bottom' ) ? "md:justify-end md:pb-0 md:pt-36" : "md:justify-start md:pt-0 md:pb-36";

    const imageMobPad = ( settings.content_alignment_vertical_mob == 'bottom' ) ? "top-0 bottom-[150px] md:bottom-0" : "bottom-0 top-[150px] md:top-0";

    let ButtonRoundAlignmentMD = ""; 

    

    if ( settings.bg_type === 'img_full') {
        // initial classes
        if ( settings.content_alignment_vertical_mob === 'bottom' ) {
            if ( settings.content_alignment_mob == 'right' ) {
                ButtonRoundAlignmentMD += " top-[30px] md:top-auto left-[25px]";
            } else {
                ButtonRoundAlignmentMD += " top-[30px] md:top-auto right-[25px]";
            }
        } else {
            if ( settings.content_alignment_mob == 'right' ) {
                ButtonRoundAlignmentMD += " bottom-[30px] left-[25px]";
            } else {
                ButtonRoundAlignmentMD += " bottom-[30px] right-[25px]";
            }
        }

        // MD classes
        if ( settings.content_alignment == 'right' ) {
            ButtonRoundAlignmentMD += " md:left-1/3 md:translate-x-[10%] md:bottom-0 md:mb-[120px]";
        } else if ( settings.content_alignment == 'left' ) {
            ButtonRoundAlignmentMD += " md:left-2/3 md:-translate-x-full md:bottom-0 md:mb-[120px]";
        } else {
            ButtonRoundAlignmentMD += " md:left-1/3 md:translate-x-[10%] md:bottom-0 md:mb-[120px]";
        }
    }

    if ( settings.bg_type === 'caption_img' || settings.bg_type === 'caption_full' ) {
        // initial classes
        if ( settings.content_alignment_vertical_mob === 'bottom' ) {
            if ( settings.content_alignment_mob == 'right' ) {
                ButtonRoundAlignmentMD += " top-[30px] left-[25px]";
            } else {
                ButtonRoundAlignmentMD += " top-[30px] right-[25px]";
            }
        } else {
            if ( settings.content_alignment_mob == 'right' ) {
                ButtonRoundAlignmentMD += " bottom-[30px] left-[25px]";
            } else {
                ButtonRoundAlignmentMD += " bottom-[30px] right-[25px]";
            }
        }

        // MD classes
        if (settings.content_alignment_vertical == "bottom" ) {
            ButtonRoundAlignmentMD += " md:top-1/2 md:mb-[0px]";
        } else {
            ButtonRoundAlignmentMD += " md:bottom-[120px]";
        }

        if ( settings.img.img_pos == 'right' ) {
            ButtonRoundAlignmentMD += " md:right-full md:mr-[-10px] lg:mr-[-23px]";
        } else {
            ButtonRoundAlignmentMD += " md:left-full md:ml-[-10px] lg:ml-[-90px]";
        }
    }

    const ButtonRoundUrl = settings?.round_button?.url;
    const ButtonRoundClass = settings?.round_button?.bg_class;
    const ButtonRoundTitle = settings?.round_button?.title;

    const ButtonRoundWrap = ( ButtonRoundUrl && ButtonRoundClass && ButtonRoundTitle ) && (
        <div className={`absolute transform${ButtonRoundAlignmentMD}`}>
            <ButtonRound url={ButtonRoundUrl} bg={ButtonRoundClass} title={ButtonRoundTitle}/>
        </div>
    )

    return (
        <section className={`relative ${settings.margin_bottom ? "mb-20 lg:mb-28" : "" } ${settings.margin_top ? "mt-20 lg:mt-28" : "" }`}>
            <div className="container">
                <div className={`lg:min-h-screen  md:relative  flex flex-col ${contentAlignmentVerticalMob} ${contentAlignmentVertical}`}>
                
                    <div className={`flex ${contentAlignmentHorizMob} md:justify-around md:relative z-10`}>
                        
                        <div 
                        className={`w-9/12 w-[280px] md:w-6/12 max-w-[598px] p-4 lg:px-14 lg:py-9 text-center  flex flex-col justify-between items-center space-y-4 md:relative ${settings.content_color} ${settings.content_bg} ${settings.content_alignment === 'left' ? 'md:-left-1/4' : ''} ${settings.content_alignment === 'right' ? 'md:left-1/4' : ''}`}>
                            
                            { settings?.logo?.url ?
                            (<h2 className="heading-sub uppercase text-center pt-2 w-6/12 max-w-full mx-auto">
                                <ImageFade
                                    src={settings.logo.url}
                                    width={270}
                                    height={117}
                                    objectFit="contain"
                                    objectPosition="center"
                                    layout="responsive"
                                    alt={settings.logo.alt}/>
                            </h2>) :
                            (<h2 className="heading-sub uppercase">{settings.title}</h2>) }
                            
                            { settings?.copy_img?.url && 
                            (<>
                                <div className="grow flex items-center justify-center py-0 !my-5 !mb-1 lg:!my-20 lg:!mb-16">
                                    <div className="relative w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]">
                                        <ImageFade
                                        src={settings.copy_img.url}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                        alt=""/>
                                    </div>
                                </div>
                            </>) }

                            
                            <div className={` ${ !settings?.copy_img?.url ? 'py-6 lg:py-20' : ''} space-y-4 pb-4`}>
                                <div className={`py-0 ${settings?.copy_expanded ? 'max-w-[470px]' : 'max-w-[470px]'}`} 
                                dangerouslySetInnerHTML={ {__html: settings.copy} }></div>

                                { settings?.copy_expanded &&
                                (<div className="copy-expand relative">
                                    
                                    <motion.div 
                                    initial="closed"
                                    animate={isOpen ? "open" : "closed"}
                                    variants={variants}
                                    className="py-0 max-w-[470px] overflow-hidden" 
                                    dangerouslySetInnerHTML={ {__html: settings.copy_expanded} }/>

                                    
                                </div>)
                                }
                            </div>
                            
                            { settings?.copy_expanded &&
                            <div className={`lg:hidden bottom-0 right-0 ml-auto uppercase flex items-center justify-end cursor-pointer space-x-3 ${isOpen ? 'invisible' : null}`} onClick={() => {setIsOpen(true)}}><span>Read More</span> <ChevDown/></div>}
                            
                            { settings.cta.cta_title && settings.cta.cta_url && 
                            (<div className="ml-auto">
                                <ButtonSecondary title={settings.cta.cta_title} url={settings?.cta?.cta_url}/>
                            </div>) }
                            
                            { ( ButtonRoundWrap && settings.bg_type == 'caption_img' || settings.bg_type == 'caption_full' ) && 
                            ButtonRoundWrap}

                        </div>
                        
                        { ( ButtonRoundWrap && settings.bg_type !== 'caption_img' && settings.bg_type !== 'caption_full' ) && 
                            ButtonRoundWrap}

                    </div>

                    {
                    settings.bg_type === 'caption_full' && (<p ref={ref1} className="heading-brand-large font-display absolute bottom-0 mb-[-40px] lg:mb-[-8vh]" dangerouslySetInnerHTML={ {__html: settings.bg_caption} }></p>)            
                    }

                </div>
            </div>

            { settings.bg_type === 'img_full' &&
            (<div ref={ref2} className={`overflow-hidden absolute w-full top-0  left-0 ${imageMobPad}`}>
                <div
                 ref={ref2_child}
                className="relative h-full w-full ">
                    <ImageFade
                    src={settings.img.url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt=""/>
                </div>
            </div>)}
            
            { settings.bg_type === 'caption_img' &&
            (<>
            
            { settings.bg_caption && 
            (<div className={captionCaptionClass}>
                <div className="container">
                    <p className="heading-brand-medium" dangerouslySetInnerHTML={ {__html: settings.bg_caption }}/>
                </div>
            </div>) }
            
            <div ref={ref2} className={`overflow-hidden absolute w-full md:w-1/2  left-0 absolute w-full md:w-1/2  bottom-0 left-0 ${imageMobPad} ${captionImgClass} `}>
                <div
                 ref={ref2_child}
                className="relative h-full w-full">
                    <ImageFade
                    src={settings.img.url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt=""
                    />
                </div>
            </div></>) }

        </section>
    )
}

export default Billboard
