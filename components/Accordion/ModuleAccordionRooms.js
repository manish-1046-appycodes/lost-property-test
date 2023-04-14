import { useEffect, useRef } from "react";

import Script from 'next/script'

import ButtonRound from '../Links/ButtonRound'
import ImageFade from "../ImageFade/ImageFade";
import Slider from "./Slider/Slider";


const ModuleAccordionRooms = ( {settings} ) => {

    const ref = useRef(null)

    useEffect(() => {
        Accordion.init(ref.current)}, []
    );
    

    const Ameneties = ({row}) => {
        const rows = row?.contentDropdown?.column1?.amenities.split('<br />');
        return (<ul>
        {row?.contentDropdown?.column1?.amenities.map( (amenetie, key) => (
            <li key={key}>{amenetie}</li>
        ))}
        </ul>)
    }


  return (
  <section>

    <div ref={ref} className="accordion-group ">
      
      { settings?.accordionRoomsTable && 
        settings?.accordionRoomsTable.map( (row, key) => (
          <div key={key} className="accordion-row relative min-h-[85px] lg:min-h-[150px] border-t border-black">

            <div className="container absolute">
              <div className="max-w-1430px mx-auto grid grid-5 gap-4 lg:gap-9  py-3 lg:py-4">
                <div className="lg:pt-4 col-span-3 md:col-span-1">{ row?.rowHeading?.roomType }</div>
                <div className="lg:pt-4 ">{ row?.rowHeading?.bedType }</div>
                <div className="lg:pt-4 hidden md:block">{ row?.rowHeading?.sleeps }</div>
                <div className="accordion-btn-initial justify-self-end duration-500 ease-in-out hidden md:block">
                { row.book_btn && <ButtonRound url="#" title="Book <br/>Room" bg="bg-blue-1" size="small"/>}
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

                <div className="max-w-1430px mx-auto lg:grid grid-5 gap-4 lg:gap-9 pt-[85px] lg:pt-0 pb-3 lg:pb-9 relative">
                  <div className="col-span-3 lg:py-[130px] mb-8 lg:mb-0 xl:grid gap-x-4 lg:gap-x-9 grid-cols-3">

                    <h2 className="uppercase text-[32px] lg:text-[60px] mb-6 lg:mb-16 col-span-3">{row?.contentDropdown?.column1?.title}</h2>

                    <div className="text-12px lg:text-16px md:max-w-[355px]  col-span-2 mb-6" dangerouslySetInnerHTML={ {__html: row?.contentDropdown?.column1?.copy} } />

                    <div className=" mb-8 lg:mb-0">
                      <div className="text-12px lg:text-16px">

                        { row?.contentDropdown?.column1?.amenities && 
                        (<>
                        <p className="uppercase mb-5">Amenities</p>
                        <div className="">
                        <ul>
                        {row?.contentDropdown?.column1?.amenities.split('<br />').map( (amenetie, key) => (
                            <li key={key}>{amenetie}</li>
                        ))}
                        </ul>
                        </div>
                        </>)}

                      </div>
                    </div>

                  </div>

                  <div className=" w-1/2 lg:w-full lg:pt-9 ml-auto lg:ml-0">

                    {  ( row?.contentDropdown?.imageType === 'carousel' && 
                    row?.contentDropdown?.carouselImages )  ?
                      
                      <Slider parent={ref} imgs={row?.contentDropdown?.carouselImages} count={key}/>

                    :
                      <div className="pt-[100%] relative">
                        { row?.contentDropdown?.image?.sourceUrl && 
                        <ImageFade
                          src={row.contentDropdown?.image?.sourceUrl}
                          objectFit="cover"
                          objectPosition="center"
                          alt="ALT"
                          layout="fill"
                        />
                        }
                      </div>
                    }
                    

                    

                  </div>

                  <div className="invisible hidden lg:block">
                    <button className="text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]" aria-hidden="true">
                      <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
                      <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
                    </button>
                  </div>

                  <div className="actions absolute bottom-0 left-0 flex space-x-3 lg:space-x-5 py-3 lg:py-9">
                    { row.book_btn && <ButtonRound url="#" title="Buy <br/>Tickets" bg="bg-blue-1" size="small"/>}

                  </div>

                </div>

              </div>
            </div>

          </div>

        ))
      }
      


    </div>

  </section>

  );
};

export default ModuleAccordionRooms;
