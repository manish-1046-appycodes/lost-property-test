import Head from "next/head";
const site = process.env.NEXT_PUBLIC_BASE_URL;
const siteTitle = "Lost Property";

function strip(html) {
  var one = html.replace(/<\/?[^>]+(>|$)/gm, "");
  var two = one.replace(/[\r\n]\s*[\r\n]/gm, "");
  return two;
}

const Schema = ({ post, seo }) => {


    const {
        title,
        blurb,
        featuredImage,
        date,
        modified,
        uri
    } = post;
    const published = new Date(date);
    const copyrightYear = published.getFullYear();

    let mediaDetails, sourceUrl;

    if (featuredImage) {
        sourceUrl = featuredImage?.node?.sourceUrl;
    }

  

  const org = `{ "@id": "${site}#organization", "type": "Organization", "name":"${siteTitle}", 
        "logo": {
        "@type": "ImageObject",
        "name": "${siteTitle} Logo",
        "width": "347",
        "height": "30",
        "url": "${site}/image/lost-property-logo.svg"
        }
      }`;

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `
    {
      "@context":"https://schema.org/",
      "@type":"Article",
      "name":"${seo.title}",
      "about": "${seo.metaDesc}",
      "copyrightHolder": { "@id": "${site}#organization" },
      "datePublished": "${date}",
      "dateModified": "${modified}",
      "description": "${seo.metaDesc}",
      "headline": "${title}",
      ${sourceUrl ? `"image": "${sourceUrl}",` : ""}
      "inLanguage": "English",
      "mainEntityOfPage": "${site}${uri}",
      "publisher": { "@id": "${site}#organization" },
      "sourceOrganization": ${org},
      "url": "${site}${uri}"

    }
    ` }}/>
    </Head> );
};
export default Schema;