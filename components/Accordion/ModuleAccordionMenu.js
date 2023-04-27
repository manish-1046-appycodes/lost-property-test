import { useEffect, useRef } from "react";

import Script from "next/script";

import ButtonRound from "../Links/ButtonRound";
import ButtonRoundExternal from "../Links/ButtonRoundExternal";
import ImageFade from "../ImageFade/ImageFade";

const bookUrl =
  "https://www.opentable.co.uk/r/lost-property-st-pauls-london-curio-collection-by-hilton-reservations-london?restref=269142&lang=en-GB&ot_source=Restaurant%20website";

const Row = ({
  rowName,
  datetime,
  menuDownload,
  description,
  descriptionColumns,
  image,
}) => {
  const clickedOnReserve = () => {
    if (gtag) {
      gtag("event", "Clicked Find Table");
    }
  };

  return (
    <div className="accordion-row relative min-h-[85px] lg:min-h-[150px] border-t border-current">
      <div className="container relative">
        <div className="max-w-1430px mx-auto grid grid-4-mob lg:grid-4-lg gap-4 lg:gap-9  py-3 lg:py-4">
          <h2 className="lg:pt-4 uppercase">{rowName}</h2>
          <div className="lg:pt-4 col-span-1 lg:col-span-1">{datetime}</div>
          <div className="accordion-btn-initia justify-self-end duration-500 ease-in-out lg:flex lg:space-x-4">
            <div className="btn-toggle hidden lg:block">
              {menuDownload?.mediaItemUrl && (
                <ButtonRound
                  url={menuDownload?.mediaItemUrl}
                  download
                  target="_blank"
                  title="Down<br/>Load"
                  bg="bg-white"
                  color="text-current"
                  size="small"
                  alt="isAlt"
                />
              )}
            </div>
            <div className="btn-toggle hidden">
              <ButtonRound
                url="#"
                title="Share"
                bg="bg-white"
                color="text-current"
                size="small"
                alt="isAlt"
              />
            </div>
            <ButtonRoundExternal
              onClick={clickedOnReserve}
              url={bookUrl}
              target="_blank"
              title="Reserve"
              bg="bg-white"
              color="text-black"
              size="small"
            />
          </div>
          <div className="lg:pt-2">
            <button
              data-accordiontoggle
              className="z-10 transform duration-500 text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]"
              aria-hidden="true"
            >
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
                {description && (
                  <div
                    className={`wysiwyg ${
                      descriptionColumns == 2 && "sm:columns-2 sm:gap-10"
                    } `}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>
            </div>

            <div className=" w-1/2 lg:w-full lg:pt-9 ml-auto lg:ml-0 lg:max-w-[476px] justify-self-end self-end">
              <div className="pt-[100%] relative">
                {image?.sourceUrl && (
                  <ImageFade
                    src={image.sourceUrl}
                    alt={image?.altText}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                  />
                )}
              </div>
            </div>
            <div className="invisible hidden">
              <button
                className="text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]"
                aria-hidden="true"
              >
                <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
                <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
              </button>
            </div>

            <div className="actions absolute bottom-0 left-0 flex space-x-3  py-3 lg:hidden">
              <ButtonRound
                className="hidden"
                url="#"
                title="Share"
                bg="bg-white-1"
                size="small"
                alt="isAlt"
              />
              {menuDownload?.mediaItemUrl && (
                <ButtonRound
                  url={menuDownload.mediaItemUrl}
                  download
                  target="_blank"
                  title="Down<br/>Load"
                  bg="bg-white-1"
                  size="small"
                  alt="isAlt"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionMenu = ({ rows }) => {
  const ref = useRef(null);

  useEffect(() => {
    Accordion.init(ref.current);
  }, []);

  return (
    <section>
      <div ref={ref} className="accordion-group ">
        {rows.accordionRows &&
          rows.accordionRows.map((row, i) => (
            <Row
              key={i + `accRow`}
              rowName={row?.rowName}
              datetime={row?.datetime}
              menuDownload={row?.menuDownload}
              description={row?.description}
              descriptionColumns={row?.descriptionColumns}
              image={row?.image}
            />
          ))}
      </div>
    </section>
  );
};

export default AccordionMenu;
