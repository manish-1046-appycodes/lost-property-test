import { useEffect, useState, useRef } from 'react'


import ButtonRound from '../Links/ButtonRound'
import ImageFade from '../ImageFade/ImageFade'
import ParallaxItem from '../UI/ParallaxItem'
import ExploreMap from './ExploreMap'
import Head from 'next/head'


// Locations

let geojson;

export default function ModuleExplore({settings}) {

  if ( settings.locations.length ) {
    
    let features = [];

    settings.locations.map( (location) => {
      
      let feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location?.mapCoordinates?.longitude,location?.mapCoordinates?.lattitude]
        },
        properties: {
          title: location?.title,
          description: location?.description,
          category: location?.category,
          img: location?.image?.sourceUrl
  
        }
      }

      features.push(feature);

      geojson = {
        type: 'FeatureCollection',
        features : features
      }

    })

  }

  const [showMap, setShowMap] = useState(false);
  const [latLng, setLatLng] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapCategories, setMapCategories] = useState([]);
  const [mapCategorySelected, setMapCategorySelected] = useState('poi-All');
  const [geojsonFiltered, setGeojsonFiltered] = useState(geojson);
  const filterWrap = useRef(null);

  const toggleFilter = () => {
      setFilterOpen( filterOpen => !filterOpen);

      const filterWrapHeight = filterWrap.current.firstChild.offsetHeight;

      if ( !filterOpen ) {
          
          filterWrap.current.style.height = filterWrapHeight +'px';
          setTimeout( function() {
              filterWrap.current.style.height = 'auto';
          }, 500)
      } else {
          filterWrap.current.style.height = filterWrapHeight +'px';
          setTimeout( function() {
              filterWrap.current.style.height = '0px'
          }, 10);
      }
  }

  useEffect(() => {
    gsapSettings.init();
    Cursors.init();

    if ( mapCategorySelected == 'poi-All' ) {
      setGeojsonFiltered(geojson);
    } else {
      let filter = mapCategorySelected.replace('poi-', '');

      setGeojsonFiltered({
        type: 'FeatureCollection',
        features: geojson.features.filter( property => property.properties.category === filter)
      });
    }



  }, [mapCategorySelected,showMap]);

  // map categories
  geojson.features.forEach( (feature) => {
    if ( !mapCategories.includes(feature.properties.category) ) {
        mapCategories.push( feature.properties.category)
    }
  })

  mapCategories.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
  });


  const setCategory = (e) => {
    const layerID = e.target.getAttribute('data-layer')

    setMapCategorySelected(layerID);
    
    toggleFilter();

    window.scrollTo(0, 0);

    if ( document.querySelector('.mapboxgl-popup') ) {
      document.querySelector('.mapboxgl-popup').style.display = 'none';
    }
    Cursors.init();
    e.preventDefault();
  }


  const toggleMap = (e) => {
    e.stopPropagation();
    setShowMap( showMap => !showMap);
    
  }

  const mapSelect = (e) => {

    let latlng = e.target.getAttribute('data-latlng');
    if ( latlng ) {
      
      setLatLng(latlng);

      setShowMap(true)
      document.querySelector('.marker[data-latlng="'+latlng+'"]').click();
    }

  }

  
  return (
    <>
      
      <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      { geojson && 
      <div className="relative">
        <div className="flex flex-col lg:block">

        <div className={` ${ showMap ? '!visible !opacity-100' : ''} order-2 opacity-0 invisible map-wrap top-0 z-[9] transition-[visibility,opacity] duration-500 fixed`}>
          <ExploreMap mapCategories={mapCategories} category={mapCategorySelected} geojson={geojson} filterOpen={filterOpen} latLng={latLng}/>
        </div>

        <section className={` ${ !showMap ? '!visible !opacity-100' : 'opacity-0 invisible'} order-3 container relative min-h-screen map-offset_mob lg:map-offset_lg transition-[visibility,opacity] duration-500 flex justify-center flex-col`}>

          <div className="h-[120px] lg:h-[0px]"></div>
          <div className="absolute w-full h-full top-0 left-0 container">
            <div className="sticky top-0 min-h-screen flex items-center justify-center flex-col">
              <h1 className="heading-brand-medium text-center">Get <em>lost</em> in <br/>the <em>City</em></h1>
            </div>
          </div>

          
          <div className="lg:grid grid-cols-2 items-start overflow-hidden pb-20">
            
            { geojsonFiltered &&
              geojsonFiltered?.features.map( (location, i) => {

                let count = i;

                if ( count >= 6 ) {
                  count = count - 6;
                }

                let caption;

                ( location?.properties?.title ? caption = location.properties.title : null )

                let classOuter = "";
                let classInner = "";
                

                if ( count == 0 ) {
                  classOuter = "lg:translate-x-1/4";
                } else if ( count == 1 ) {
                  classOuter = "mx-auto lg:mx-0 lg:ml-auto";
                } else if ( count == 2 ) {
                  classOuter = "lg:ml-auto";
                } else if ( count == 3 ) {
                  classOuter = "ml-auto lg:ml-0 lg:translate-x-2/3";
                } else if ( count == 4 ) {
                  classOuter = "";
                } else if ( count == 5 ) {
                  classOuter = "mx-auto lg:mx-0 lg:-translate-x-1/4";
                }
                

                if ( count == 0 ) {
                  classInner = "";
                } else if ( count == 1 ) {
                  classInner = "lg:mt-[50%]";
                } else if ( count == 2 ) {
                  classInner = "";
                } else if ( count == 3 ) {
                  classInner = "lg:mt-[50%]";
                } else if ( count == 4 ) {
                  classInner = "";
                } else if ( count == 5 ) {
                  classInner = "lg:mt-[50%]";
                }

                return (<div key={i} className={`explore-item mt-32 lg:mt-0 w-9/12 lg:w-6/12 transform ${classOuter}`}>

                    <ParallaxItem className="">
                      <div className={`relative  ${classInner}`}>

                          <div className="relative pt-[100%] cursor-wrap">
                            { location?.properties?.img &&
                            <ImageFade
                                src={location.properties.img}
                                layout="fill"
                                alt={caption}
                                className="select-none"/>
                            }
                            
                            <div className="absolute cursor">
                              <ButtonRound url="#" title="View <br>on map" bg="bg-white" color="text-black"/>
                            </div>

                            <div className="absolute inset-0" data-latlng={location.geometry.coordinates} onClick={mapSelect}/>  

                          </div>

                          { caption &&
                          <div className="absolute uppercase text-xs leading-13 lg:text-16px lg:leading-13 top-full left-0 mt-4">{caption}</div> }
                      </div>
                      </ParallaxItem>
                  </div>)
                }
              )
            }

          
          </div>
            

        </section>
          
        <div className={`z-50 top-0 lg:top-auto filter-bar bottom-0 h-[56px] lg:h-[73px] relative z-[9] order-1 lg:order-2 ${ (filterOpen ? 'filterOpen' : '')}`}>
                    
            <div  onClick={toggleFilter} className={`cursor-pointer w-full bottom-0 left-0  opacity-50 backdrop-blur-xl min-h-mob_min_height lg:min-h-lg_min_height bg-cream-1 absolute ${ (filterOpen ? 'visible' : 'invisible')}`}></div>

            <div className="absolute top-0 lg:top-auto lg:bottom-0 left-0 border-t border-b border-black bg-cream-1 w-full">

                <div className="h-[56px] lg:h-[73px] flex justify-center items-center  cursor-pointer" onClick={toggleFilter}>

                    
                    <div onClick={toggleMap} className="absolute h-full w-[62px] bg-black flex left-0 bottom-0 h-[56px] lg:h-[73px]">
                        
                        <div className={`m-auto ${ (showMap ? 'hidden' : 'block')}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25.83" height="38.237" viewBox="0 0 25.83 38.237">
                            <path id="Path_132" data-name="Path 132" d="M1268.925,104.02a12.415,12.415,0,0,0-12.415,12.415c0,6.857,12.415,24.455,12.415,24.455s12.415-17.6,12.415-24.455A12.415,12.415,0,0,0,1268.925,104.02Zm0,16.486a3.465,3.465,0,1,1,3.465-3.465A3.465,3.465,0,0,1,1268.925,120.506Z" transform="translate(-1256.01 -103.52)" fill="none" stroke="#faf7f3" strokeMiterlimit="10" strokeWidth="1"/>
                          </svg>
                        </div>
                        <div className={`m-auto ${ (!showMap ? 'hidden' : 'block') }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <g id="Group_540" data-name="Group 540" transform="translate(-17 -1026)">
                                <g id="Rectangle_236" data-name="Rectangle 236" transform="translate(17 1026)" fill="none" stroke="#faf7f3" strokeWidth="1">
                                <rect width="11" height="11" stroke="none"/>
                                <rect x="0.5" y="0.5" width="10" height="10" fill="none"/>
                                </g>
                                <g id="Rectangle_239" data-name="Rectangle 239" transform="translate(17 1042)" fill="none" stroke="#faf7f3" strokeWidth="1">
                                <rect width="11" height="11" stroke="none"/>
                                <rect x="0.5" y="0.5" width="10" height="10" fill="none"/>
                                </g>
                                <g id="Rectangle_237" data-name="Rectangle 237" transform="translate(33 1026)" fill="none" stroke="#faf7f3" strokeWidth="1">
                                <rect width="11" height="11" stroke="none"/>
                                <rect x="0.5" y="0.5" width="10" height="10" fill="none"/>
                                </g>
                                <g id="Rectangle_238" data-name="Rectangle 238" transform="translate(33 1042)" fill="none" stroke="#faf7f3" strokeWidth="1">
                                <rect width="11" height="11" stroke="none"/>
                                <rect x="0.5" y="0.5" width="10" height="10" fill="none"/>
                                </g>
                            </g>
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button data-accordiontoggle className="z-[9] transform duration-500 text-grey-1 relative w-[26px] h-[26px]" aria-hidden="true">
                            <span className="w-full h-[1px] bg-current absolute top-1/2 left-0"></span>
                            <span className="w-[1px] h-full bg-current absolute top-0 left-1/2"></span>
                        </button>
                        <span className="text-[16px] uppercase">Filter</span>
                    </div>

                </div>
            
                <div ref={filterWrap} className="filter-wrap h-0 overflow-hidden transition-all duration-500 ease-in-out">
                    <ul className="flex  flex-col  text-[30px] lg:text-[50px] uppercase text-center">
                        <li className="group border-t border-grey-1 flex justify-center py-2"><a onClick={setCategory} data-layer={`poi-All`} href="#" className="group-hover:font-display inline-block">all</a></li>

                        { mapCategories.map( (mapCategory, i) => 
                            <li key={i} className="group border-t border-grey-1 flex justify-center py-2"><a onClick={setCategory} data-layer={`poi-${mapCategory}`} href="#" className="group-hover:font-display inline-block">{mapCategory}</a></li>
                          )}

                        
                    </ul>
                </div>

            </div>

        </div>

        <style jsx>{`
          .filter-bar, .map-wrap {
            position: sticky;
          }
        `}</style>

        </div>
      
      </div>}
        
    </>
  )
}
