import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const GA_TRACKING_ID = 'G-SVQ32HS26Y'
const UA_TRACKING_ID = 'UA-159318290-26'

export default () => {

  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', GA_TRACKING_ID, { page_path: url })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />

        <Script id="UA" strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${UA_TRACKING_ID}`}/>
        <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${UA_TRACKING_ID}');
        `,
        }}
        />
    </>
  )
}