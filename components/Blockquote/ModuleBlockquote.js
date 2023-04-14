
const ModuleBlockquote = ({settings}) => {


    const Stars = () => {
        var els = [];
        //if ( settings?.stars.length ) {
            for (let index = 0; index < settings?.stars; index++) {
                els.push(
                    <div key={index} className="max-w-[20px] lg:max-w-[30px]">
                        <svg className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg" width="31.255" height="31.255" viewBox="0 0 31.255 31.255">
                        <g id="Group_393" data-name="Group 393" transform="translate(-732 -10584.5)">
                            <line id="Line_71" data-name="Line 71" y2="31.255" transform="translate(747.627 10584.5)" fill="none" stroke="#000" strokeWidth="1"/>
                            <line id="Line_72" data-name="Line 72" y2="31.255" transform="translate(763.255 10600.127) rotate(90)" fill="none" stroke="#000" strokeWidth="1"/>
                            <line id="Line_73" data-name="Line 73" y2="31.255" transform="translate(758.678 10589.077) rotate(45)" fill="none" stroke="#000" strokeWidth="1"/>
                            <line id="Line_74" data-name="Line 74" y2="31.255" transform="translate(758.678 10611.178) rotate(135)" fill="none" stroke="#000" strokeWidth="1"/>
                        </g>
                        </svg>
                    </div>
                );
            }
            return els;
        //}
    }

  return (
    <blockquote className="review my-40">
        <div className="container text-center">
            <div className="max-w-[1140px] w-11/12 mx-auto">

                { settings?.blockquoteCopy && 
                <p 
                dangerouslySetInnerHTML={ {__html: settings?.blockquoteCopy}}
                className="mb-7 lg:mb-12 text-[36px] lg:text-[60px] leading-none lg:leading-none font-display"/>}

                { settings?.blockquoteNamerole && 
                <p dangerouslySetInnerHTML={ {__html: settings?.blockquoteNamerole}}/>}

                <div className="flex mt-7 mx-auto inline-flex space-x-2 lg:space-x-3">
                
                    <Stars/>
                    
                </div>

            </div>
        </div>
    </blockquote>
    );
};

export default ModuleBlockquote;
