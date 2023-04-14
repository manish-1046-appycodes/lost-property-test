import Cta from "./Cta";

const Ctas = ({ctas}) => {
  return (
    <section>
        <div className="lg:flex flex-wrap">

        { ctas &&
          ctas.map( ( {bgClass, textColor, copy, title, img, btnTitle, btnUrl, alt }, key ) => 
            <Cta
            key={key}
            bgClass={bgClass}
            textColor={textColor}
            copy={copy}
            title={title}
            img={img}
            btnTitle={btnTitle} 
            btnUrl={btnUrl}
            alt={alt} />
          )
          
        }
        
        </div>
    </section>
  );
};

export default Ctas;
