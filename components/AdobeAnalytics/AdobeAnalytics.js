import Script from "next/script";
import { useRouter,  } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

let pageName = '';
let pageCategory = '';

const AdobeAnalytics = ({initial}) => {

    const router = useRouter();


    pageName = '';
    pageCategory = '';
    if ( router.route == '/') {
        pageName = ':homepage'
        pageCategory = 'homepage'
    } else {
        const paths = router.asPath.split('/');
        
        let count = 0;
        paths.map( (path) => {
            path.replace(' ', '');
            if ( path ) {
                pageName += ':'+path;
                if ( count == 0 ) {
                    pageCategory = path;
                }
                count++;
            }
        })
    }

    

    useEffect( () => {
        
    })


   

    return (
        <>
        
        <Script
            id="show-banner"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                var digitalData = {
                
                    page: {
                        attributes: {
                            siteExperience: 'R'
                        },
                        category: {
                            brand: "QQ",
                            primaryCategory: "${pageCategory}",
                            siteName: "lost-property",
                            siteType: "L",
                            subSection: "",
                            subSubSection: ""
                        },
                        pageInfo: {
                            destinationURL: "${BASE_URL+router.route}",
                            language: "en_US",
                            pageName: "lost-property${pageName}",
                            pageTitle: document.title
                        }
                    },
                    product: [{
                        productInfo: {
                        productID: "LONCCQQ"
                        }
                    }]

                };


                `,
            }}
            />
        <Script 
        strategy="afterInteractive"
        src="//assets.adobedtm.com/launch-EN02272261e0b845508227acf3ca0c37de.min.js"/>
        </>
    )
}

export default AdobeAnalytics