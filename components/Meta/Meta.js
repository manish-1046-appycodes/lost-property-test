import Head from "next/head"
import { useRouter } from "next/router"

const Meta = ({SEO}) => {

    const Router = useRouter();
    
    return (
        <Head>
            <title>{SEO?.title}</title>
            <meta name="description" content={SEO?.metaDesc} />
            <meta name="keywords" content={SEO?.metaKeywords+SEO?.focuskw} />
            <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL+Router.asPath} />

            <meta property="og:title" content={SEO?.title} />
            <meta property="og:description" content={SEO?.metaDesc} />

            <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL+Router.asPath} />
            <meta property="og:site_name" content={SEO?.opengraphSiteName} />
            { SEO?.opengraphImage?.sourceUrl && 
            <meta property="og:image" content={SEO?.opengraphImage?.sourceUrl} />}
            <meta property="article:modified_time" content={SEO?.opengraphModifiedTime} />
        </Head>
    )
}

export default Meta