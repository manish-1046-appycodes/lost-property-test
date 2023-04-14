import Marquee from "../Marquee/Marquee";
import ButtonRound from "../Links/ButtonRound";
import Head from "next/head";

const MarqueeWords = '<em>Nooo.</em> &nbsp;Oops. &nbsp;<em>Eek.</em> &nbsp;Uh oh. &nbsp;<em>sorry.</em> &nbsp;Whoopsy daisy. &nbsp;';

export const NotFound404 = () => {
  return (
    <>
    <Head>
        <meta name="robots" content="noindex"/>
    </Head>
    <div className="spacer h-[120px] lg:h-[150px]"></div>

    <div className="flex flex-col bg-blue-1 text-white pt-5 min-vh100-exHeadMob lg:min-vh100-exHeadDesk">

        <Marquee words={MarqueeWords}/>
        
        <div className="container py-28 text-center my-auto">

            <h1 className="text-[18px] lg:text-[32px] leading-12 mb-12 lg:mb-24">404 ERROR<br/>PAGE NOT FOUND</h1>
            <p className="mb-6 lg:mb-10">Looks like you’ve got lost…</p>

            <p className="mb-10 lg:mb-14">Let’s turn you back home.</p>

            <div className="inline-block">
                <ButtonRound url="/" title="Home" bg="bg-white" color="text-black"/>
            </div>

        </div>

    </div>
    </>
  )
}
