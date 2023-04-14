
import ButtonRound from "../Links/ButtonRound"
import ImageFade from "../ImageFade/ImageFade";

const FoodDrinkCarousel = ({carouselItems}) => {
    
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
                    <div className=" w-full slides-container">
                        <div className="transform translate-x-[-60%] lg:translate-x-0 w-full slides-inner relative">
                        
                        {( carouselItems && 
                            carouselItems.map( (carouselItem, i) => (

                                <article key={i} className="w-[150%] lg:w-10/12 relative shrink-0 ml-3 slide ">
                            
                                    <div className="w-7/12 lg:w-6/12 relative">
                                        <div className="pt-[100%] relative">

                                            {carouselItem?.img?.url && 
                                            <ImageFade
                                                src={carouselItem.img.url}
                                                alt={carouselItem.img.alt}
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
