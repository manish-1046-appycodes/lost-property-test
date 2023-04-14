import Cta from "./Cta";

const Ctas = ({settings}) => {
  return (
    <section>
        <div className="lg:flex flex-wrap">

        { settings?.ctas &&
          settings?.ctas.map( ( cta, key ) => 
            <Cta
            key={key}
            bgClass={cta?.settings?.backgroundColour}
            textColor={cta?.settings?.textColour}
            copy={cta?.copy}
            title={cta?.title}
            img={cta?.image?.sourceUrl}
            btnTitle={cta?.ctaLink?.title} 
            btnUrl={cta?.ctaLink?.url}
            alt={settings?.settings?.altLayout} />
          )
          
        }
        
        </div>
    </section>
  );
};

export default Ctas;
