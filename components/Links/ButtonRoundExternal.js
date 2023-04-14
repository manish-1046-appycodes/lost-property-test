import Link from "next/link";

const ButtonRoundExternal = ({url, bg, color, title, size, alt, target}) => {

  return (
    <a href={url} target="_blank">
        <div className={`button-round relative z-10 ${ size == 'small'  ? 'w-[62px] h-[62px]' : 'w-[86px] h-[86px]'} lg:w-[113px] lg:h-[113px] flex justify-center items-center group ${ alt == 'isAlt' ? 'text-current' : 'text-white'} cursor-pointer`}>
          <span className={`absolute w-full h-full rounded-full duration-500 transition-all transform group-hover:scale-110 ${ alt == 'isAlt' ? 'border border-current' : bg }`}></span>
          <span className={`p-2 relative ${ size == 'small' ? 'text-xs' : 'text-sm'} duration-500 transition-colors lg:text-base leading-12 lg:leading-12 text-center uppercase ${color}`} dangerouslySetInnerHTML={ {__html: title}}></span>
        </div>
    </a>  
  );
};

export default ButtonRoundExternal;
