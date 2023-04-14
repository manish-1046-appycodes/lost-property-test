import { useEffect } from 'react'

import Head from 'next/head'

import Layout from '../../components/Layout/Layout'

import PageFade from '../../components/PageFade'
import { getPost, getPostSeo, getPostTypeModules, getPostSlugs, getPageSettings, getHeaderMenuItems } from '../../lib/gql-query'
import PageModules from '../../components/ACF/PageModules'
import { NotFound404 } from '../../components/NotFound404/NotFound404'

export default function Page({page, SEO, pageModules}) {
    
    useEffect(() => {gsapSettings.init()}, []);

    if ( !page.post ) {
        return (
            <NotFound404 statusCode={404}/>
        )
    }

    const formatDate = (dateGmt) => {

    const postDate = new Date(dateGmt);

    const year = postDate.getFullYear().toString().slice(-2);

    return `${postDate.getDate()}.${postDate.getMonth()}.${year}`;
    }

    return (
        <>
        <PageFade>
            
            <div className="spacer h-[120px] lg:h-[150px] border-b border-black"></div>

            <section className='mb-20 lg:mb-28'>
        
                <div className='container'>
                    <div className="max-w-1430px mx-auto ">
                        
                        <time className='mt-5 mb-10 block' dateTime={page?.post?.date}>{formatDate(page?.post?.date)}</time>
                        <div className='max-w-[50%] space-y-6 lg:space-y-16'>
                            <h1 className='text-[42px] lg:text-[72px] leading-12'>{page?.post?.title}</h1>

                            <div className='wysiwyg' dangerouslySetInnerHTML={{ __html: page?.post?.postSettings?.singularViewSettings?.postIntroCopy }}/>
                        </div>

                    </div>
                </div>
                
            </section>

            <PageModules pageModules={pageModules} postType="post"/>

        </PageFade>

        </>
    )
}


Page.getLayout = function getLayout(page) {

    // Layout specific params
    
    return (
        <Layout
        page={page?.props?.post}
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
    const res = await getPostSlugs();
    
    const slugs = await res;

    // remove "/" which is the home page
    const filteredSlugs = slugs.posts.nodes.filter(r => r.uri !== '/');
    
    // Get the paths we want to pre-render based on posts
    const paths = filteredSlugs.map((slug) => {
        
        // create an array of slugs
        const slug_split = slug.uri.split('/').filter(r => r !== '' && r !== 'events' );

        return {
            params: { slug: slug_split[0] }
        }
        
    });

  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    
    // add slashes back in to create slug
    //const slug = params.slug.join('/');
    const slug = `/news/${params.slug}`;
    // Get general Page fields
    const page = await getPost(slug, 'URI');

    // Get SEO stuff
    const seo = await getPostSeo(slug, 'URI');
    // Get Page Modules
    const pageModules = await getPostTypeModules(slug, 'URI', 'post');

    // Get Page Modules
    const pageSettings = await getPageSettings(slug, 'URI');
    // Get Header Menu Items
    const headerMenuItems = await getHeaderMenuItems();

    return {
        props: {
            page: page,
            SEO: seo?.post?.seo || '',
            pageSettings: pageSettings?.page?.pageSettings?.pageSettings || '',
            pageModules: pageModules?.post?.pageModules?.pageModules || '',
            headerMenuItems: headerMenuItems?.menuItems?.edges || ''
        },
        revalidate: 60,
    };
}
