
import ButtonRound from "../Links/ButtonRound"
import ImageFade from "../ImageFade/ImageFade";

const ExploreCarousel = ({carouselItems}) => {
    
    return (
        <section className="min-h-screen w-full py-28 lg:py-52 flex items-center relative overflow-hidden">

            <div className="container absolute text-center w-full">
                <h2 className="heading-brand-medium"><em>Lose</em> yourself <br/>in the <em>City</em></h2>
            </div>

            <div className="container">
                <div className="max-w-1430px mx-auto ">
                    <div className=" w-full slides-container">
                        <div className="transform translate-x-[-60%] lg:translate-x-0 w-full slides-inner relative">
                        
                        {( carouselItems && 
                            carouselItems.map( (carouselItem,i) => (

                                <article key={i} className="w-[150%] lg:w-10/12 relative shrink-0 ml-3 slide ">
                            
                                    <div className="w-7/12 lg:w-6/12 relative group">
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
                                        <h3 className="opacity-0 transform transition-all ease-in-out scale-50 group-hover:scale-100 group-hover:opacity-100 absolute inset-0 text-16px p-12 hidden lg:block">
                                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-10 uppercase text-center">
                                                <div className="lg:w-1/2">{carouselItem.name}</div>
                                            </div>
                                        </h3>
                                    </div>

                                </article>

                            ))
                        )}
                        

                        
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="absolute bottom-0 left-0 justify-center py-20 hidden lg:flex w-full">
                <ButtonRound url="#" title="View <br/>More" bg="bg-red-1"/>
            </div>
        </section>
    )
}

export default ExploreCarousel
