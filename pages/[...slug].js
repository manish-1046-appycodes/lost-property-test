import { useEffect } from 'react'

import Head from 'next/head'

import Layout from '../components/Layout/Layout'

import PageFade from '../components/PageFade'
import { getPage, getPageSeo, getPagePageModules, getPageSlugs, getPageSettings, getHeaderMenuItems } from '../lib/gql-query'
import PageModules from '../components/ACF/PageModules'
import { NotFound404 } from '../components/NotFound404/NotFound404'

import { isCustomPageUri } from '../lib/slugs'

export default function Page({page, SEO, pageModules, pageSettings}) {
    
    
    useEffect(() => {gsapSettings.init()}, []);

    if ( !page.page ) {
        return (
            <NotFound404 statusCode={404}/>
        )
    }

    return (
        <>

        { pageSettings?.invisibleh1 &&
            <h1 className='hidden'>{pageSettings?.invisibleh1}</h1>
        }
        
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

// This function gets called at build time
export async function getStaticPaths() {
    
    // Get all Page Slugs
    const res = await getPageSlugs();
    const slugs = await res;

    // remove "/" which is the home page
    const filteredSlugs = slugs.pages.nodes.filter(r => r.uri !== '/');

    const paths = [];
    // Get the paths we want to pre-render based on posts
    filteredSlugs.map((slug) => {
        
        if ( slug?.uri && !isCustomPageUri(slug?.uri) ) {
            // create an array of slugs
            const slug_split = slug.uri.split('/').filter(r => r !== '');
            
            paths.push({
                params: { slug: slug_split }
            });
        }
        
    });

  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {

    // add slashes back in to create slug
    const slug = params.slug.join('/');

    // Get general Page fields
    const page = await getPage(slug, 'URI');

    // Get SEO stuff
    const seo = await getPageSeo(slug, 'URI');
    // Get Page Modules
    const pageModules = await getPagePageModules(slug, 'URI');
    // Get Page Modules
    const pageSettings = await getPageSettings(slug, 'URI');
    // Get Header Menu Items
    const headerMenuItems = await getHeaderMenuItems();

    return {
        props: {
            page: page,
            SEO: seo?.page?.seo || '',
            pageSettings: pageSettings?.page?.pageSettings?.pageSettings || '',
            pageModules: pageModules?.page?.pageModules?.pageModules || '',
            headerMenuItems: headerMenuItems?.menuItems?.edges || ''
        },
        notFound: !page.page ? true : false,
        revalidate: 60,
    };
}
