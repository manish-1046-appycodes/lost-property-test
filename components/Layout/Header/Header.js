import Link from "next/link"
import ButtonSecondary from "../../Links/ButtonSecondary"
import ButtonRound from "../../Links/ButtonRound"

import Cross from "../../../public/image/icon/cross.svg"
import Logo from "../../../public/image/lost-property-logo-black.svg"

const API_URL = process.env.API_URL;

const Header = ({notice, toggleNavFunc, navOpenState, setNoticeFunc, isScrolledState,headerThemeBgInitial, headerThemeBgState, headerMenuItems}) => {
    
  return (
    <div className={`absolute top-0 left-0 w-full z-40 `}>

        <div className={`${ notice ? 'h-[0px]' : 'h-[40px]'} overflow-hidden transition-[height,opacity] bg-blue-1 fixed w-full`}>
            <div className="container text-white h-[40px] flex justify-between items-center">

                <ButtonSecondary url="/" title="Covid-19 Updates"/>

                <div className="p-2 cursor-pointer" onClick={() => {setNoticeFunc(true)}}>
                    <Cross/>
                </div>
            </div>
        </div>

        <header className={`h-[70px] lg:h-[150px] flex fixed w-full transition-[top,background-color] pointer-events-none duration-500 ${ headerThemeBgInitial == 'light' ? 'text-white' : 'text-black'}  ${ notice ? 'top-[0px]' : 'top-[40px]'} ${ (!isScrolledState && headerThemeBgState == 'light')  && 'bg-transparent !text-white'} ${ isScrolledState && 'bg-cream-1/80 !text-black'} `}>

            <nav style={{opacity: 0}} className={`main-nav z-10 scale-95 pointer-events-auto user-select-none ${ navOpenState ? 'nav-open visible !opacity-100 !scale-100' : 'nav-closed'} ${ notice ? 'top-[0px]' : 'top-[40px]'}`}>
                <ul onClick={toggleNavFunc}>

                    {   headerMenuItems ? ( 
                            headerMenuItems.map( ({node, i}) => 
                
                                <li key={node.connectedNode.node.uri}>
                                    <Link href={node.connectedNode.node.uri}>
                                        <a>{node.label}</a>
                                    </Link>
                                </li>
                            )
                    ) : (
                    <>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/story">
                        <a>Story</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/rooms">
                        <a>Rooms</a>
                        </Link>
                    </li>
                    
                    <li>
                        <Link href="/book">
                        <a>Book</a>
                        </Link>
                    </li>
                    
                    <li>
                        <Link href="/gallery">
                        <a>Gallery</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/contact">
                        <a>Contact</a>
                        </Link>
                    </li>
                    </>
                    )
                    }


                </ul>
            </nav>

            <div className={`container pointer-events-auto flex items-center lg:items-start ${ navOpenState ? 'text-white' : ''}`}>


                <button aria-hidden className="outline-0 p-5 -ml-5 z-10 cursor-pointer lg:absolute lg:left-[45px] top-0 lg:mt-7" onClick={toggleNavFunc}>
                    <div aria-hidden className={`relative h-[2px] bg-current w-[29px] lg:w-[48px] transition-all ease-in-out ${ navOpenState ? 'rotate-45 top-[6px] lg:top-[9px] !bg-white' : 'nav-closed'} `}></div>
                    <div aria-hidden className={`relative h-[2px] bg-current w-[29px] lg:w-[48px] transition-all ease-in-out mt-2 lg:mt-4 ${ navOpenState ? '-rotate-45 top-[-4px] lg:top-[-9px] !bg-white' : 'nav-closed'}`}></div>
                </button>

                <Link href="/">
                    <a className={`my-12 mx-auto hidden lg:block lg:absolute lg:top-0 lg:transform lg:-translate-x-1/2 lg:left-1/2`}>
                        <Logo />
                    </a>
                </Link>

                <ul className={`text-18px xl:text-32px flex space-x-6 m-auto mr-0 z-10 ${ navOpenState ? 'opacity-100' : 'opacity-0'}`}>
                  <li><a href="https://www.instagram.com/lostpropertystpauls/" target="_blank" rel="noreferrer">Instagram</a></li>
                  <li><a href="https://www.facebook.com/lostpropertystpauls/" target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>
                
                <div className="hidden lg:block lg:my-auto ml-6">
                    <ButtonRound 
                    url="/book" 
                    title="Book <br>Now"
                    bg={` ${ headerThemeBgInitial == 'light' ? '!bg-white' : 'bg-blue-1'} ${ (!isScrolledState && headerThemeBgState == 'light')  ? 'bg-white' : 'bg-blue-1'} ${ isScrolledState && !navOpenState ? '!bg-blue-1' : ''} ${ navOpenState && '!bg-white'} `}
                    color={` ${ headerThemeBgInitial == 'light' ? 'text-black' : 'text-white'} ${ (!isScrolledState && headerThemeBgState == 'light')  ? 'text-black' : 'text-white'} ${ isScrolledState && !navOpenState ? '!text-white' : ''} ${ navOpenState && '!text-black'}`}
                    />
                </div>

            </div>
        </header>

    </div>);
};

export default Header;
