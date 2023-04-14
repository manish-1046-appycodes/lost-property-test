import { useEffect } from 'react'

import Head from 'next/head'

import Layout from '../../components/Layout/Layout'

import AccordionEvents from '../../components/Accordion/AccordionEvents'

import Marquee from '../../components/Marquee/Marquee'
import PageFade from '../../components/PageFade'
import Meta from '../../components/Meta/Meta'
import { getPageSeo, getPosts, getHeaderMenuItems,getPageSettings } from '../../lib/gql-query'


export default function Page({posts, pageSettings}) {

  useEffect(() => {gsapSettings.init()}, []);

  const Billboard_2 = {
    title:  'Our Story',
    copy: '<p>Etiam sed lorem eleifend, consequat felis nec, bibendum ante. Pellentesque dui urna, imperdiet lacinia lacus at? Etiam sed lorem eleifend, consequat felis nec, bibendum ante. Pellentesque dui urna, imperdiet lacinia lacus at?</p>',
    cta:    {
      cta_title:  'Find out more',
      cta_url:    '#'
    },
    content_bg: 'bg-white',
    content_color: 'text-black',
    content_alignment: 'left',
    content_alignment_mob: 'center',
    content_alignment_vertical_mob: 'top',
    bg_type: 'img_full', // caption_full / img_full
    bg_caption: '',
    img: {
      url: '/image/del/our-rooms.jpg'
    },
    margin_bottom: true,
    round_button: {
      url: '',
      bg_class: '',
      title: ''
    }
  }

  const MarqueeWords = '<em>play.</em> &nbsp;watch. &nbsp;<em>listen.</em> &nbsp;participate. &nbsp;<em>dance.</em> &nbsp;celebrate. &nbsp;<em>attend.</em> &nbsp;';

  if ( !posts?.posts ) {
    return (
      <>
      <PageFade>
        <div className="spacer h-[120px] lg:h-[150px]"></div>

        <div className="spacer h-[50px] lg:h-[150px]"></div>

        <Marquee words={MarqueeWords}/>

        <div className="container text-center">
          <h1 className='text-[56px] lg:text-[76px] py-10'>No posts found</h1>
        </div>
      </PageFade>
      </>
    )
  }

  return (
    <>
    { pageSettings?.invisibleh1 &&
      <h1 className='hidden'>{pageSettings?.invisibleh1}</h1>
    }
    <PageFade>
        

        <div className="spacer h-[120px] lg:h-[150px]"></div>

        <div className="spacer h-[50px] lg:h-[150px]"></div>

        <Marquee words={MarqueeWords}/>

        <AccordionEvents posts={posts}/>

    </PageFade>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout
    SEO={page?.props?.SEO}
    headerMenuItems={page?.props?.headerMenuItems}
    >{page}</Layout>
  )
}

export async function getStaticProps({ params }) {

  const posts = await getPosts();
  
  // Get Header Menu Items
  const headerMenuItems = await getHeaderMenuItems();

  // Get SEO stuff
  const seo = await getPageSeo('/news/', 'URI');
  // Get Page Settings
  const pageSettings = await getPageSettings('/news/', 'URI');

  return {
    props: {
      posts: posts || '',
      headerMenuItems: headerMenuItems?.menuItems?.edges || '',
      pageSettings: pageSettings?.page?.pageSettings?.pageSettings || '',
      SEO: seo?.page?.seo || ''
    },
    revalidate: 1,
  };
}
