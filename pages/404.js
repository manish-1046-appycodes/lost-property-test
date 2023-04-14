import { useEffect } from 'react'

import Head from 'next/head'

import Layout from '../components/Layout/Layout'

import PageFade from '../components/PageFade'
import { NotFound404 } from '../components/NotFound404/NotFound404'



export default function Page({test}) {

  useEffect(() => {gsapSettings.init()}, []);


  return (
    <>
        <PageFade>
        <Head>
            <title>Lost Property</title>
            <meta name="description" content="Lost Property" />
        </Head>

        <NotFound404/>

        </PageFade>

    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout colourTheme="light">{page}</Layout>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      test: ""
    },
    revalidate: 1,
  };
}
