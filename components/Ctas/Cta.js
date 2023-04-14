import ImageFade from "../ImageFade/ImageFade";
import ButtonSecondary from "../Links/ButtonSecondary";

const Cta = ({ bgClass, textColor, copy, title, img, btnTitle, btnUrl, alt}) => {
  return (
    <>
    <div className={`w-full xl:flex-1 overflow-hidden flex flex-col ${bgClass} ${textColor} ${alt ? 'lg:grid-rows-[0fr_1fr] lg:grid lg:grid-cols-2' : ''}`}>
            
        <div className={`ml-auto w-8/12  my-6 lg:my-14 ${alt ? 'lg:order-3 lg:ml-0 lg:w-full lg:my-0' : '2xl:w-1/2'}`}>
            <div className={`container ${ alt ? '' : 'pl-0'} `}>
                <div className={`${ alt ? 'lg:mb-7' : 'max-w-[360px]'}`}>
                    <div className="wysiwyg mb-4 lg:mb-7" dangerouslySetInnerHTML={ {__html: copy} }/>
                    <ButtonSecondary title={btnTitle} url={btnUrl}/>
                </div>
            </div>
        </div>
        <div className={` my-8  mt-auto ${alt ? 'lg:mt-8 lg:order-1 lg:col-span-2' : 'lg:w-1/2 4xl:-mb-12'}`}>
            <div className="container">
                <h2 className="font-display leading-none text-[50px] lg:text-[100px] lg:leading-none" dangerouslySetInnerHTML={ {__html: title}}/>
            </div>
        </div>
        <div className={`ml-auto w-8/12  ${alt ? 'lg:hidden lg:w-full lg:order-2 lg:ml-0 relative' : '2xl:w-1/2'}`}>
        <ImageFade
            src={img}
            alt="ALT"
            layout='responsive'
            objectFit="cover"
            objectPosition="center"
            width="476"
            height="349"
        />
        </div>

        { alt && (
        <div className={`ml-auto w-8/12  ${alt ? 'hidden lg:block lg:w-full lg:order-2 lg:ml-0 relative lg:min-h-[500px]' : '2xl:w-1/2'}`}>
        <ImageFade
            src={img}
            alt="ALT"
            layout='fill'
            objectFit="cover"
            objectPosition="center"
            width="476"
            height="349"
        />
        </div>)}

    </div>
    </>
   );
};

export default Cta;
