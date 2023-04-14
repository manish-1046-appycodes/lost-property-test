import { useEffect, useRef } from "react";

import Script from 'next/script'

import ButtonRound from '../Links/ButtonRound'
import ImageFade from "../ImageFade/ImageFade";


const AccordionMenu = () => {

  const ref = useRef(null)

  useEffect(() => {Accordion.init(ref.current)}, []);

  const row = (
  <div className="accordion-row relative min-h-[85px] lg:min-h-[150px] border-t border-current">

    <div className="container relative">
      <div className="max-w-1430px mx-auto grid grid-4-mob lg:grid-4-lg gap-4 lg:gap-9  py-3 lg:py-4">
        <h2 className="lg:pt-4 uppercase">Breakfast</h2>
        <div className="lg:pt-4 col-span-1 lg:col-span-1">9-11.30am</div>
        <div className="accordion-btn-initia justify-self-end duration-500 ease-in-out lg:flex lg:space-x-4">
            <div className="btn-toggle hidden lg:block"><ButtonRound url="#" title="Down<br/>Load" bg="bg-white" color="text-current" size="small" alt="isAlt"/></div>
            <div className="btn-toggle hidden lg:block"><ButtonRound url="#" title="Share" bg="bg-white" color="text-current" size="small" alt="isAlt"/></div>
            <ButtonRound url="#" title="Reserve" bg="bg-white" color="text-black" size="small"/>
        </div>
        <div className="lg:pt-2">
          <button data-accordiontoggle className="z-10 transform duration-500 text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]" aria-hidden="true">
            <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
            <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
          </button>
        </div>
      </div>
    </div>

    <div className="accordion-child h-0 overflow-hidden opacity-0 duration-500 transition-[all] ease-in-out ">
      <div className="container">
        
        <div className="max-w-1430px mx-auto lg:grid grid-4-mob lg:grid-2-lg gap-4 lg:gap-9 pb-3 lg:pb-9 relative">
          <div className="col-span-1  mb-8 lg:mb-0 ">


            <div className=" md:max-w-[720px]  col-span-2 mb-6">
                <div className="wysiwyg">

                    <p>Beef Carpaccio<br/>
                    Rocket & parmesan — 7 .5</p>

                    <p>Grilled Prawns<br/>
                    Lemon, Mediterranean garnish — 9</p>

                    <p>Crispy Squid<br/>
                    Fresh chili, spring onions, spic y Nduja ma yo (contains pork) — 8 .5</p>

                    <p>Charcuterie of italian cured meat<br/>
                    Parma ham, Calabrian capocollo , Finocchiona salami — 9</p>

                    <p>Selection of cheese<br/>
                    Taleggio, Pecorino di pienza, Toma truffle (v) — 9.5</p>

                    <p>Combo charcuterie & cheese plate<br/>
                    Parma ham, Calabrian capocollo , Finocchiona salami and Taleggio, Pecorino dipienza, Toma truffle — 15.5</p>

                    <p>Pea Soup<br/>
                    Whipped goats’ cheese, sun dried cherry tomato, focaccia (v) — 6</p>

                </div>

            </div>

            

          </div>
          
          <div className=" w-1/2 lg:w-full lg:pt-9 ml-auto lg:ml-0 lg:max-w-[476px] justify-self-end self-end">
            <div className="pt-[100%] relative">
              <ImageFade
                src="/image/del/food-drink/menu.jpg"
                objectFit="cover"
                objectPosition="center"
                alt="ALT"
                layout="fill"
              />
            </div>
          </div>
          <div className="invisible hidden">
            <button className="text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]" aria-hidden="true">
              <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
              <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
            </button>
          </div>

          <div className="actions absolute bottom-0 left-0 flex space-x-3  py-3 lg:hidden">
            <ButtonRound url="#" title="Share" bg="bg-white-1" size="small"  alt="isAlt"/>
            <ButtonRound url="#" title="Down<br/>Load" bg="bg-white-1" size="small" alt="isAlt"/>
          </div>

        </div>

      </div>
    </div>

    

  </div>)

  return (
  <section>
    
    <div ref={ref} className="accordion-group ">
      {row}
      {row}
      {row}
      {row}

    </div>
    
  </section>

  
  );
};

export default AccordionMenu;
