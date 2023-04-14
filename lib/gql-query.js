// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const API_URL = process.env.API_URL+'/graphql';


async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }
   
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getPage(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        uri
        title
        pageId
        date
        modified
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
          }
        }
        seo {
          fullHead
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPost(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        uri
        title
        postId
        date
        modified
        postSettings {
          archiveViewSettings {
            displayTitle
            excerpt
            fieldGroupName
            tableRowTitle
            title
          }
          singularViewSettings {
            postIntroCopy
          }
        }
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
          }
        }
        seo {
          fullHead
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPosts(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts(where: {status: PUBLISH}) {
        edges {
          node {
            id
            postId
            title
            isPreview
            modifiedGmt
            date
            postSettings {
              postGeneralSettings {
                enterExternalPostLink
                postLinkType
              }
              archiveViewSettings {
                displayTitle
                excerpt
                fieldGroupName
                tableRowTitle
                title
              }
              singularViewSettings {
                postIntroCopy
              }
            }
            featuredImage {
              node {
                altText
                sourceUrl(size: THUMB_1920)
              }
            }
            status
            uri
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}



export async function getPageSeo(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        seo {
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          readingTime
          title
          twitterDescription
          twitterTitle
          opengraphImage {
              sourceUrl(size: LARGE)
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPostSeo(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        seo {
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          readingTime
          title
          twitterDescription
          twitterTitle
          opengraphImage {
              sourceUrl(size: LARGE)
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPageSettings(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        pageSettings {
          pageSettings {
            bodyBackgroundColour
            footerBorder
            headerTheme
            invisibleh1
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPagePageModules(id, idType = 'URI') {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        pageModules {
          pageModules {
            ... on Page_Pagemodules_PageModules_PageModulesHero {
              heroTitle
              fieldGroupName
              heroImage {
                id
                sourceUrl(size: THUMB_1920)
                altText
              }
            }
            ... on Page_Pagemodules_PageModules_PageModulesBillboard {
              fieldGroupName
              title
              billboardType
              ctaLink {
                target
                title
                url
              }
              copy
              image {
                sourceUrl(size: THUMB_1920)
                altText
              }
              imagePosition
              contentBackgroundColour
              contentTextColour
              backgroundCaption
              
              logo {
                altText
                sourceUrl(size: THUMB_1920)
              }
              contentImage {
                altText
                sourceUrl(size: LARGE)
              }
              contentPosition {
                contentAlignment
                contentAlignmentMob
                contentAlignmentVertical
                contentAlignmentVerticalMob
              }
              settings {
                marginBottom
                marginTop
              }
            }

            ... on Page_Pagemodules_PageModules_GalleryCarousel {
              fieldGroupName
              carouselItems {
                image {
                  altText
                  sourceUrl
                }
                imageDescription
              }
              settings {
                colourTheme
              }
              invisibleh1
            }

            ... on Page_Pagemodules_PageModules_BookingSection {
              fieldGroupName
            }

            ... on Page_Pagemodules_PageModules_Copy {
              copy
              fieldGroupName
              title
              titletag
            }
            
            ... on Page_Pagemodules_PageModules_CopyImageCta {
              fieldGroupName
              title
              content {
                copy
                ctaButtons {
                  button {
                    target
                    title
                    url
                  }
                }
              }
              image {
                image {
                  altText
                  sourceUrl(size: THUMB_1920)
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              settings {
                imagecontentAlignment
              }
            }

            ... on Page_Pagemodules_PageModules_Ctas {
              fieldGroupName
              ctas {
                copy
                ctaLink {
                  target
                  title
                  url
                }
                image {
                  altText
                  sourceUrl(size: THUMB_1920)
                }
                title
                settings {
                  backgroundColour
                  textColour
                }
              }
              settings {
                altLayout
              }
            }

            ... on Page_Pagemodules_PageModules_PageIntro {
              fieldGroupName
              heading
              image {
                altText
                sourceUrl(size: THUMB_1920)
              }
            }

            ... on Page_Pagemodules_PageModules_Blockquote {
              blockquoteCopy
              blockquoteNamerole
              fieldGroupName
              stars
            }

            ... on Page_Pagemodules_PageModules_Marquee {
              fieldGroupName
              marqueeWords
            }

            ... on Page_Pagemodules_PageModules_UtilSpacer {
              fieldGroupName
            }

            ... on Page_Pagemodules_PageModules_AccordionRooms {
              fieldGroupName
              accordionRoomsTable {
                fieldGroupName
                contentDropdown {
                  fieldGroupName
                  column1 {
                    amenities
                    copy
                    fieldGroupName
                    title
                  }
                  image {
                    altText
                    sourceUrl
                  }
                  imageType
                  carouselImages {
                    altText
                    caption
                    sourceUrl
                  }
                }
                rowHeading {
                  bedType
                  fieldGroupName
                  roomType
                  sleeps
                }
              }
            }

            ... on Page_Pagemodules_PageModules_ExploreGallerymap {
              fieldGroupName
              locations {
                category
                description
                fieldGroupName
                title
                image {
                  altText
                  sourceUrl(size: LARGE)
                }
                mapCoordinates {
                  lattitude
                  longitude
                }
              }
            }

            ... on Page_Pagemodules_PageModules_Contact {
              fieldGroupName
              copy
            }

            ... on Page_Pagemodules_PageModules_FooddrinkCarousel {
              fieldGroupName
              carouselImages {
                altText
                sourceUrl(size: LARGE)
              }
            }

            ... on Page_Pagemodules_PageModules_AccordionMenu {
              fieldGroupName
              accordionRows {
                rowName
                datetime
                menuDownload {
                  mediaItemUrl
                  
                }
                description
                descriptionColumns
                image {
                  altText
                  sourceUrl(size: LARGE)
                }
              }
            }

            ... on Page_Pagemodules_PageModules_OpenBookingWidget {
              fieldGroupName
            }

          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}

export async function getPostTypeModules(id, idType = 'URI', postType = 'page') {

  const upper = postType[0].toUpperCase() + postType.slice(1);

  const data = await fetchAPI(
    `
    query MyQuery($id: ID!, $idType: ${upper}IdType!) {
      ${postType}(id: $id, idType: $idType) {
        pageModules {
          pageModules {
            ... on ${upper}_Pagemodules_PageModules_PageModulesHero {
              heroTitle
              fieldGroupName
              heroImage {
                id
                sourceUrl(size: THUMB_1920)
                altText
              }
            }
            ... on ${upper}_Pagemodules_PageModules_PageModulesBillboard {
              fieldGroupName
              title
              billboardType
              ctaLink {
                target
                title
                url
              }
              copy
              image {
                sourceUrl(size: THUMB_1920)
                altText
              }
              imagePosition
              contentBackgroundColour
              contentTextColour
              backgroundCaption
              
              logo {
                altText
                sourceUrl(size: THUMB_1920)
              }
              contentImage {
                altText
                sourceUrl(size: LARGE)
              }
              contentPosition {
                contentAlignment
                contentAlignmentMob
                contentAlignmentVertical
                contentAlignmentVerticalMob
              }
              settings {
                marginBottom
                marginTop
              }
            }

            ... on ${upper}_Pagemodules_PageModules_GalleryCarousel {
              fieldGroupName
              carouselItems {
                image {
                  altText
                  sourceUrl
                }
                imageDescription
              }
              settings {
                colourTheme
              }
              invisibleh1
            }

            ... on ${upper}_Pagemodules_PageModules_BookingSection {
              fieldGroupName
            }

            ... on ${upper}_Pagemodules_PageModules_Copy {
              copy
              fieldGroupName
              title
              titletag
            }
            
            ... on ${upper}_Pagemodules_PageModules_CopyImageCta {
              fieldGroupName
              title
              content {
                copy
                ctaButtons {
                  button {
                    target
                    title
                    url
                  }
                }
              }
              image {
                image {
                  altText
                  sourceUrl(size: THUMB_1920)
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              settings {
                imagecontentAlignment
              }
            }

            ... on ${upper}_Pagemodules_PageModules_Ctas {
              fieldGroupName
              ctas {
                copy
                ctaLink {
                  target
                  title
                  url
                }
                image {
                  altText
                  sourceUrl(size: THUMB_1920)
                }
                title
                settings {
                  backgroundColour
                  textColour
                }
              }
              settings {
                altLayout
              }
            }

            ... on ${upper}_Pagemodules_PageModules_PageIntro {
              fieldGroupName
              heading
              image {
                altText
                sourceUrl(size: THUMB_1920)
              }
            }

            ... on ${upper}_Pagemodules_PageModules_Blockquote {
              blockquoteCopy
              blockquoteNamerole
              fieldGroupName
              stars
            }

            ... on ${upper}_Pagemodules_PageModules_Marquee {
              fieldGroupName
              marqueeWords
            }

            ... on ${upper}_Pagemodules_PageModules_UtilSpacer {
              fieldGroupName
            }

            ... on ${upper}_Pagemodules_PageModules_AccordionRooms {
              fieldGroupName
              accordionRoomsTable {
                fieldGroupName
                contentDropdown {
                  fieldGroupName
                  column1 {
                    amenities
                    copy
                    fieldGroupName
                    title
                  }
                  image {
                    altText
                    sourceUrl
                  }
                  imageType
                  carouselImages {
                    altText
                    caption
                    sourceUrl
                  }
                }
                rowHeading {
                  bedType
                  fieldGroupName
                  roomType
                  sleeps
                }
              }
            }

            ... on ${upper}_Pagemodules_PageModules_ExploreGallerymap {
              fieldGroupName
              locations {
                category
                description
                fieldGroupName
                title
                image {
                  altText
                  sourceUrl(size: LARGE)
                }
                mapCoordinates {
                  lattitude
                  longitude
                }
              }
            }

            ... on ${upper}_Pagemodules_PageModules_Contact {
              fieldGroupName
              copy
            }

            ... on ${upper}_Pagemodules_PageModules_InfoBlocks2Column {
              fieldGroupName
              infoBlocks {
                copy
                title
              }
            }

          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data;
}


export async function getPageSlugs() {
  const data = await fetchAPI(
    `
    query MyQuery {
      pages {
        nodes {
          uri
        }
      }
    }`,
    {
      variables: {  },
    }
  )
  return data;
}

export async function getPostSlugs() {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts {
        nodes {
          uri
        }
      }
    }`,
    {
      variables: {  },
    }
  )
  return data;
}

export async function getHeaderMenuItems() {
  const data = await fetchAPI(
    `
    query MyQuery {
      menuItems(where: {location: HEADER, parentId: "0"}) {
        edges {
          node {
            label
            connectedNode {
              node {
                uri
              }
            }
          }
        }
      }
    }`,
    {
      variables: {  },
    }
  )
  return data;
}


  