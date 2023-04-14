import NavHomeSvg from "../../public/image/icon/nav-home.svg"
import NavDineSvg from "../../public/image/icon/nav-dine.svg"
import NavStaySvg from "../../public/image/icon/nav-stay.svg"
import NavGallerySvg from "../../public/image/icon/nav-gallery.svg"
import NavMoreSvg from "../../public/image/icon/nav-more.svg"
import Link from "next/link"
import { useRouter } from 'next/router'

const NavBarMob = ({toggleNavFunc}) => {

    const router = useRouter();

    return (
    <div className="md:hidden nav-bar-mob bottom-0 bg-blue-1 text-white text-10px uppercase text-center grid grid-cols-5 pb-2 z-10">
        
        <div className={` ${ router.route !== '/' ? 'opacity-50' : ''} `}>
            <Link href="/">
            <a className="p-3 inline-block">
                <div className="h-[25px] mb-2 flex">
                    <NavHomeSvg className="inline-block m-auto"/>
                </div>
                <p>Home</p>
            </a>
            </Link>
        </div>

        <div className={` ${ router.route !== '/food-drink' ? 'opacity-50' : ''} `}>
            <Link href="/food-drink">
            <a className="p-3 inline-block">
                <div className="h-[25px] mb-2 flex">
                    <NavDineSvg className="inline-block m-auto"/>
                </div>
                <p>Dine</p>
            </a>
            </Link>
        </div>

        <div className={` ${ router.route !== '/rooms' ? 'opacity-50' : ''} `}>
            <Link href="/rooms">
            <a className="p-3 inline-block">
                <div className="h-[25px] mb-2 flex">
                    <NavStaySvg className="inline-block m-auto"/>
                </div>
                <p>Stay</p>
            </a>
            </Link>
        </div>

        <div className={` ${ router.route !== '/gallery' ? 'opacity-50' : ''} `}>
            <Link href="/gallery">
            <a className="p-3 inline-block">
                <div className="h-[25px] mb-2 flex">
                    <NavGallerySvg className="inline-block m-auto"/>
                </div>
                <p>Gallery</p>
            </a>
            </Link>
        </div>

        <div className={` opacity-50 `}>
            <button className="p-3 inline-block uppercase" onClick={toggleNavFunc}>
                <div className="h-[25px] mb-2 flex">
                    <NavMoreSvg className="inline-block m-auto"/>
                </div>
                <p>More</p>
            </button>
        </div>

        <style jsx>{`
            .nav-bar-mob {
                position: sticky;
            }
        `}</style>
    </div>
  )
}

export default NavBarMob