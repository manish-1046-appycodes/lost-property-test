import { useEffect } from 'react'

import Layout from '../components/Layout/Layout'


import PageFade from '../components/PageFade'
import { getPage, getPageSeo, getPagePageModules, getPageSettings, getHeaderMenuItems } from '../lib/gql-query'
import PageModules from '../components/ACF/PageModules'

export default function Page({page, SEO, pageModules}) {
  

  useEffect(() => {gsapSettings.init()}, []);


  return (
    <>
      <PageFade>

        

        <PageModules pageModules={pageModules}/>

      </PageFade>

    </>
  )
}


Page.getLayout = function getLayout(page) {

  // Layout specific params
  
  return (
      <Layout
      page={page?.props?.page}
      SEO={page?.props?.SEO}
      colourTheme={page?.props?.pageSettings?.bodyBackgroundColour}
      headerBgColor={page?.props?.pageSettings?.headerTheme} 
      border={page?.props?.pageSettings?.footerBorder}
      headerMenuItems={page?.props?.headerMenuItems}>
          {page}
      </Layout>
  )
}


export async function getStaticProps({ params }) {

  // Get general Page fields
  const page = await getPage("/", 'URI');

  // Get SEO stuff
  const seo = await getPageSeo("/", 'URI');
  // Get Page Modules
  const pageModules = await getPagePageModules("/", 'URI');
  // Get Page Modules
  const pageSettings = await getPageSettings("/", 'URI');
  // Get Header Menu Items
  const headerMenuItems = await getHeaderMenuItems();

  return {
      props: {
          page: page || '',
          SEO: seo?.page?.seo || '',
          pageSettings: pageSettings?.page?.pageSettings?.pageSettings || '',
          pageModules: pageModules?.page?.pageModules?.pageModules || '',
          headerMenuItems: headerMenuItems?.menuItems?.edges || ''
      },
      revalidate: 60,
  };
}
