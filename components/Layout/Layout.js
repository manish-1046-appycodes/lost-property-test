import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { useState, useEffect } from "react"
import AdobeAnalytics from '../AdobeAnalytics/AdobeAnalytics'
import AdobeAnalyticsUpdate from '../AdobeAnalytics/AdobeAnalyticsUpdate'
import GoogleAnalytics from '../GoogleAnalytics'
import Schema from '../Meta/Schema'
import Meta from '../Meta/Meta'
import NavBarMob from '../NavBarMob/NavBarMob'


import Footer from "./Footer/Footer"
import Header from "./Header/Header"




const Layout = ({page, SEO, children, border, colourTheme, headerBgColor, headerMenuItems}) => {
    
    const Router = useRouter();
    const [notice, setNotice] = useState(true);
    const [headerThemeBg, setHeaderThemeBg] = useState('dark');
    const [themeBg, setThemeBg] = useState('white');
    const [navOpen, setNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect( () => {
        Cursors.init();
        
        
        if ( colourTheme == 'blue' ) {
            setThemeBg('blue');
        }

        if ( headerBgColor == 'light' ) {
            setHeaderThemeBg('light');
        } else {
            setHeaderThemeBg('dark');
        }

        
        
        window.addEventListener('scroll', checkScroll);

        const handleRouteChange = () => {

            // hide nav overlay on route change
            setNavOpen(false);
        }

        Router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            setThemeBg('white');
            window.removeEventListener('scroll', checkScroll);
            
            Router.events.off('routeChangeComplete', handleRouteChange);
        }
        
    });

    const toggleNav = () => {
        setNavOpen( navOpen => !navOpen );
    }

    const checkScroll = () => {
        if ( window.scrollY > 0 ) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }
    

    

    return (
        <>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WGNGG35"
        height="0" width="0" style={{display:'none',visibility: 'hidden'}}></iframe></noscript>

        <div className={`leading-13 text-sm lg:leading-13 lg:text-21px  ${ themeBg == 'blue' ? "bg-blue-1 text-white" : "bg-cream-1"}`}>
            
            <Head>
                <link rel="alternate" hreflang="en" href={`https://lostpropertyhotel.com${Router.asPath}`} />
                <title>Escape to Lost Property Hotel Near St. Pauls Cathedral</title>
                <meta name="description" content="Indulge in the lost arts and activities of eccentric living. this new hotel offers 145 stylish rooms, a restaurant and coffee house. Escape with us now" />
                <meta name="robots" content="max-image-preview:large"></meta>
                { Router.asPath == '/contact/' &&
                <meta name="robots" content="noindex max-image-preview:large"/>}
            </Head>
            

            <Header 
            notice={notice} 
            toggleNavFunc={toggleNav}
            navOpenState={navOpen}
            setNoticeFunc={setNotice}
            isScrolledState={isScrolled}
            headerThemeBgInitial={headerBgColor}
            headerThemeBgState={headerThemeBg}
            headerMenuItems={headerMenuItems}/>
            

            <main className={`${ notice ? 'pt-[0px]' : 'pt-[40px]'}`}>
                {children}
                <NavBarMob 
                toggleNavFunc={toggleNav}/>
            </main>
            

            <Footer border={border}/>                        
            
        </div>

        <Script id="SITE" strategy="beforeInteractive" src="/js/site-settings.js"/>
        <Script id="GSAP" strategy="beforeInteractive" src="/js/gsap.min.js"/>
        <Script id="SCROLLTRIGGER" strategy="beforeInteractive" src="/js/ScrollTrigger.min.js"/>
        <Script id="DRAGGABLE" strategy="beforeInteractive" src="/js/Draggable.min.js"/>
        <Script id="INERTIA" strategy="beforeInteractive" src="/js/InertiaPlugin.min.js"/>
        <Script id="GSAPSETTINGS" strategy="beforeInteractive" src="/js/gsap-settings.js"/>
        <Script id="Accordion" strategy="beforeInteractive" src="/js/accordion.js"/>
        <Script id="Cursors" strategy="beforeInteractive" src="/js/cursors.js"/>


        { SEO && 
        <Meta SEO={SEO}/>
        }
        
        { (page && SEO) && 
        <Schema post={page.page} seo={SEO}/>
        }
        
        {
            //process.env.NODE_ENV === 'production' &&
            <>
            <GoogleAnalytics />
            <AdobeAnalytics/>
            <AdobeAnalyticsUpdate/>
            </>
        }
        
        </>
    )
}

export default Layout
