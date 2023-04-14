import Link from "next/link"

import ArrowRightSvg from "../../public/image/icon/arrow-right-stretch.svg"

const ButtonSecondary = ({title, url}) => {
    return (
        <>  
            { url ?
            <Link href={url}>
                <a className="button-secondary flex items-center">
                    <div className="text-[0.75rem] lg:text-base uppercase">{title}</div>
                    <ArrowRightSvg className="w-[75px] lg:w-[160px] ml-4 lg:ml-7"/>
                </a>
            </Link>
            : '' }
        </>
    )
}

export default ButtonSecondary
