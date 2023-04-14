
import { useEffect } from "react";

const opentableURL = '//www.opentable.co.uk/widget/reservation/loader?rid=269142&type=standard&theme=standard&color=1&iframe=true&domain=couk&lang=en-GB&newtab=false&ot_source=Restaurant%20website';

const OpenTableWidget = ({carouselItems}) => {


    useEffect(() => {
      

    // load open table script
    const script = document.createElement('script');
    script.src=opentableURL;
    script.async = true;
    document.querySelector('#openTableWidget').appendChild(script);
    

    
    }, []);

    return (
    <div id="openTableWidget" className='pb-28 lg:pb-52 flex justify-center'/>
    );

}

export default OpenTableWidget