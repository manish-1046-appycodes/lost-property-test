
import Script from 'next/script'

import ButtonRound from '../Links/ButtonRound'
import ButtonRoundExternal from '../Links/ButtonRoundExternal'
import ImageFade from "../ImageFade/ImageFade";
import Link from "next/link";

import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from "react";
const { motion, useAnimation } = require("framer-motion");

const AccordionRooms = ({posts}) => {


  const controls = useAnimation();
  const { ref2, inView } = useInView();
  const ref = useRef(null);
  
  useEffect( () => {

      Accordion.init(ref.current);
    
      if (inView) {
        controls.start('visible');
      }

  }, [controls, inView])

  const boxVariants = {
      hidden: { 
          opacity: 0,
          y: 40
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5
        }
      }
  }
  
  
  const formatDate = (dateGmt) => {

    const postDate = new Date(dateGmt);

    const year = postDate.getFullYear().toString().slice(-2);

    return `${postDate.getDate()}.${postDate.getMonth()+ 1}.${year}`;
  }

  return (
  <section>
    
    <div ref={ref} className="accordion-group ">
      
      {
        posts?.posts?.edges.map( (post) =>
        <div
        key={post.node.postId}
        className="accordion-row relative min-h-[85px] lg:min-h-[150px] border-t border-black">

          <div className="container relative toggle-position">
            <div className="max-w-1430px mx-auto grid grid-4-sub gap-4 lg:gap-9 py-3 lg:py-4">
              <div className="lg:pt-4">{formatDate(post.node.date)}</div>
              <div className="lg:pt-4 col-span-1 lg:col-span-1 transition-opacity duration-500 hide-sub">{post?.node?.postSettings?.archiveViewSettings?.tableRowTitle}</div>
              <div className="accordion-btn-initial justify-self-end duration-500 ease-in-out">
                  { post?.node?.postSettings?.postGeneralSettings?.postLinkType == 'external' ?
                  <ButtonRoundExternal url={post?.node?.postSettings?.postGeneralSettings?.enterExternalPostLink} title="Read <br/>More" bg="bg-red-1" size="small"/>
                  : 
                  <ButtonRound url={post?.node?.uri} title="Read <br/>More" bg="bg-red-1" size="small"/>
                  }
              </div>
              <div className="lg:pt-2">
                <button data-accordiontoggle className="z-10 transform duration-500 text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]" aria-hidden="true">
                  <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
                  <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
                </button>
              </div>
            </div>
          </div>
      
          <div className="accordion-child h-0 overflow-hidden opacity-0 duration-500 transition-[all] ease-in-out ">
            <div className="container">
              
              <div className="max-w-1430px mx-auto lg:grid grid-4-mob lg:grid-4-lg gap-4 lg:gap-9 pt-[85px] lg:pt-0 pb-3 lg:pb-9 relative">
                <div className="col-span-2 lg:py-[130px] lg:pb-[200px] mb-8 lg:mb-0 xl:grid gap-x-4 lg:gap-x-9">
      
                  <h2 className="text-[42px] lg:text-[72px] md:max-w-[500px] mb-6 lg:mb-16 col-span-2 leading-12">{post?.node?.postSettings?.archiveViewSettings?.title}</h2>
      
                  <div className=" md:max-w-[420px]  col-span-2 mb-6">
                      <div className="wysiwyg" dangerouslySetInnerHTML={ {__html: post?.node?.postSettings?.archiveViewSettings?.excerpt}}/>
      
                  </div>
      
                  
      
                </div>
                
                <div className=" w-1/2 lg:w-full lg:pt-9 ml-auto lg:ml-0">

                  { post?.node?.featuredImage?.node?.sourceUrl &&
                    <>

                    { post?.node?.postSettings?.postGeneralSettings?.postLinkType == 'external' ? 
                    <a href={post?.node?.postSettings?.postGeneralSettings?.enterExternalPostLink} target="_blank" className="pt-[100%] lg:pt-[82%] relative block z-10">
                      <ImageFade
                        src={post?.node?.featuredImage?.node?.sourceUrl}
                        objectFit="cover"
                        objectPosition="center"
                        alt={post?.node?.featuredImage?.node?.altText}
                        layout="fill"
                      />
                    </a>
                    :
                    <Link href={post?.node?.uri}>
                    <a className="pt-[100%] lg:pt-[82%] relative block z-10">
                      <ImageFade
                        src={post?.node?.featuredImage?.node?.sourceUrl}
                        objectFit="cover"
                        objectPosition="center"
                        alt={post?.node?.featuredImage?.node?.altText}
                        layout="fill"
                      />
                    </a>
                    </Link>
                    }
                    <div
                        ref={ref2}
                        initial="hidden"
                        animate={controls}
                        variants={boxVariants}
                        className="
                        justify-end text-right grid-title-pull lg:grid-title-pull-lg
                        flex">
                          <h2 className="italic heading-brand-medium-xl  -mt-[25px] xl:-mt-[70px]">{post?.node?.postSettings?.archiveViewSettings?.displayTitle}</h2>
                    </div>
                    </>
                  }
                </div>
                <div className="invisible hidden lg:block">
                  <button className="text-grey-1 relative w-[26px] h-[26px] lg:w-[68px] lg:h-[68px]" aria-hidden="true">
                    <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
                    <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
                  </button>
                </div>
      
                <div className="actions absolute bottom-0 left-0 flex space-x-3 lg:space-x-5 py-3 lg:py-9">
                  { post?.node?.postSettings?.postGeneralSettings?.postLinkType == 'external' ?
                  <ButtonRoundExternal url={post?.node?.postSettings?.postGeneralSettings?.enterExternalPostLink} title="Read <br/>More" bg="bg-red-1" size="small"/>
                  : 
                  <ButtonRound url={post?.node?.uri} title="Read <br/>More" bg="bg-red-1" size="small"/>
                  }
                </div>
      
              </div>
      
            </div>
          </div>
    
        </div>
        )
      }

    </div>
    
  </section>

  
  );
};

export default AccordionRooms;
