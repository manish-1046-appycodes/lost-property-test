import { useEffect, useRef, useState } from 'react'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoidHljYWRtaW4iLCJhIjoiY2t5ZWk3Y3VwMDhwNDJ3czI3OTN0MXR3OCJ9.338NIRkFMLb-YMuSvptahg';



export default function ExploreMap({geojson, category, mapCategories, filterOpen, latLng}) {


    const mapContainer = useRef(null);
    const map = useRef(null);
    
    const [lng, setLng] = useState(-0.113926);
    const [lat, setLat] = useState(51.524751);
    const [zoom, setZoom] = useState(12); 

    useEffect(() => {

        if ( category == 'poi-All' ) {
            const layerTargetsRemove = document.querySelectorAll('[data-maplayer]');
            layerTargetsRemove.forEach(function(el) {
                el.classList.remove('invisible', 'opacity-0');
                el.classList.add('visible', 'opacity-100');
                
            });
        } else {
            const layerTargetsRemove = document.querySelectorAll('[data-maplayer]');
            layerTargetsRemove.forEach(function(el) {
                el.classList.remove('visible', 'opacity-100');
                el.classList.add('invisible', 'opacity-0');
            });

            const layerTargets = document.querySelectorAll('[data-maplayer="'+category+'"]');
            layerTargets.forEach(function(el) {
                el.classList.remove('invisible', 'opacity-0');
                el.classList.add('visible', 'opacity-100');
            });
        }


        // flyto
        if ( map.current ) {

            if ( latLng ) {
            map.current.flyTo({
                center: latLng.split(','),
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            }
        }

        if (map.current) return; // initialize map only once
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/tycadmin/ckyeia99g0asj15pcvjdfpaqi',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', function () {
            
            // disable map zoom
            map.current.scrollZoom.disable();

            // Add zoom and rotation controls to the map.
            map.current.addControl(new mapboxgl.NavigationControl());

            map.current.addSource('places', {
                'type': 'geojson',
                'data': geojson
            });

            geojson.features.forEach(function (feature, i) {
                var title = feature.properties['title'];
                var category = feature.properties['category'];
                var symbol_url = feature.properties['icon_url'];
                var description = feature.properties['description'];
                var img = feature.properties['img'];
                var layerID = 'poi-' + category;
         
                // Add a layer for this symbol type if it hasn't been added already.
        
                    // Create a DOM element for each marker.
                    var el = document.createElement('div');
                    el.className = 'marker bg-blue-1 rounded-full transition-[opacity,visibility] duration-500 opacity-100';
                    el.setAttribute('data-mapLayer', layerID);
                    el.setAttribute('data-latlng', feature.geometry.coordinates);
                    el.style.backgroundImage =
                    'url('+img+')';
                    el.style.width = '68px';
                    el.style.height = '68px';
                    el.style.backgroundSize = 'contain';
                    
        
        
                    if ( description ) {
                        // create the popup
        
                         const markerHeight = 46;
                         const linearOffset = 10;
                         const markerRadius = 23;
                        
                        const popupOffsets = {
                            'top': [0, linearOffset],
                            'top-left': [0, 0],
                            'top-right': [0, 0],
                            'bottom': [0, -(markerHeight + linearOffset)],
                            'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                            'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                            'left': [markerRadius, (markerHeight - markerRadius) * -1],
                            'right': [-markerRadius, (markerHeight - markerRadius) * -1]
                            };
                        
                        const popup_html = `<div class=" ${layerID}-popup c-map__popup">
                        <h3 class="text-xs leading-12 lg:text-16px mb-5 uppercase">${title}</h3>
                        <p class="text-xs leading-12 lg:text-16px">${description}</p>
                        </div>`;
                        const popup = new mapboxgl.Popup({ offset: popupOffsets, closeButton: true }).setHTML(
                        popup_html
                        );

                        popup.setMaxWidth('270px')                      
                        
        
                        el.classList.add('has-desc');
                         
                        // Add markers to the map.
                        new mapboxgl.Marker(el, {anchor: 'bottom'})
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(popup)
                        .addTo(map.current);
                    } else {
                        // Add markers to the map.
                        new mapboxgl.Marker(el, {anchor: 'bottom'})
                        .setLngLat(feature.geometry.coordinates)
                        .addTo(map.current);
                    }
                        
                    if (!map.current.getLayer(layerID)) {
                    
                        map.current.addLayer({
                            'id': layerID,
                            'type': 'symbol',
                            'source': 'places',
                            'layout': {
                                // To add a new image to the style at runtime see
                                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                                'icon-allow-overlap': true
                            },
                            'filter': ['==', 'icon', category]
                        });
        
                    }
        
                    
            });
            

        })
        

    }, [category, latLng]);

    

    
    
    
  
    return (
        <>
           
        <div className="spacer h-[0px] lg:h-[150px]"></div>

        <div className="min-h-mob_min_height lg:min-h-lg_min_height flex flex-col">
            
            <div className={`w-full flex-1 order-2 lg:order-1 flex transition-[filter]  ${ (filterOpen ? 'blur-sm' : 'blur-0')} `}>
                <div ref={mapContainer} id="my-map" className={`grow w-full`} />
            </div>

            
        </div>

        </>
    )
}