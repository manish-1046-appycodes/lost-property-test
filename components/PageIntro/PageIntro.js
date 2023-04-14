import ImageFade from "../ImageFade/ImageFade";

const PageIntro = () => {

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
        <header className="page-intro min-h-screen flex items-center py-20 lg:py-28">

            <div className="container">

                <div className="w-11/12 mx-auto max-w-[598px] mt-[25px] lg:mt-[70px]">
                    <div className="pt-[100%] relative z-10">
                        <ImageFade
                            src="/image/del/story/tate-modern-new.jpg"
                            alt="Kindly be lost"
                            width="598"
                            height="598"
                            layout="fill"
                            priority
                        />
                    </div>
                </div>
                <h1 ref={ref}
                className="heading-brand-medium text-center transform translate-y-[-25px] lg:translate-y-[-70px] mx-auto "><em>Loose yourself</em> <span className="inline-block">with us</span></h1>
            </div>

        </header>
    );
};

export default PageIntro;
