import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

import DatePickerSvg from "../../public/image/icon/datepicker.svg";
import GuestsSvg from "../../public/image/icon/guests.svg";
import CrossSvg from "../../public/image/icon/cross.svg";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZW53aWNoZGVzaWduIiwiYSI6ImNrYWRtam9kbDFuaWUyeHM5N2s2cm55NGgifQ.tk1-NvEu4k83F2KSs_2Fog';

const dateNow = () => {
        
    const date = new Date();
    const dateFormatted = date.getDate()+'/'+(date.getMonth() + 1)+'/'+date.getFullYear();

    return dateFormatted;
}

const dateNowForm = () => {
        
    const date = new Date();
    const startYear = date.getFullYear();
    const startMonth = ("0" + (date.getMonth() + 1)).slice(-2)
    const startDay = ("0" + date.getDate()).slice(-2)

    return startYear+'-'+startMonth+'-'+startDay;
}

const dateTomorrow = () => {
        
    const date = new Date( Date.now()+ (3600 * 1000 * 24) );
    const dateFormatted = date.getDate()+'/'+(date.getMonth() + 1)+'/'+date.getFullYear();

    return dateFormatted;
}

const dateTomorrowForm = () => {
        
    const date = new Date(Date.now()+ (3600 * 1000 * 24));
    const startYear = date.getFullYear();
    const startMonth = ("0" + (date.getMonth() + 1)).slice(-2)
    const startDay = ("0" + date.getDate()).slice(-2)

    return startYear+'-'+startMonth+'-'+startDay;
}



const BookingSection = () => {

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: 'selection'
        }
    ]);

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [room, setRoom] = useState(1);

    const [datePickerPopup, setDatePickerPopup] = useState(false);
    const [checkin, setCheckin] = useState(dateNow);
    const [checkout, setCheckout] = useState(dateTomorrow);

    const [formStartDate, setFormStartDate] = useState(dateNowForm);
    const [formEndDate, setFormEndDate] = useState(dateTomorrowForm);

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect( () => {
        const startDate = new Date(state[0].startDate);
        const endDate = new Date(state[0].endDate);

        
        setCheckin(startDate.getDate()+'/'+(startDate.getMonth() + 1)+'/'+startDate.getFullYear());
        setCheckout(endDate.getDate()+'/'+(endDate.getMonth() + 1)+'/'+endDate.getFullYear());

        const startYear = startDate.getFullYear();
        const startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2)
        const startDay = ("0" + startDate.getDate()).slice(-2)
        
        setFormStartDate(startYear+'-'+startMonth+'-'+startDay);

        const endYear = endDate.getFullYear();
        const endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2)
        const endDay = ("0" + endDate.getDate()).slice(-2)
        
        setFormEndDate(endYear+'-'+endMonth+'-'+endDay);

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/greenwichdesign/cl4gu86sv000t14ogo25kq4dd',
            //bounds: BOUNDS,
            interactive: false,
            center: [-0.102050, 51.513790],
            zoom: 14
        });

        // Create a DOM element for each marker.
        var markerHTML = document.createElement('div');
        markerHTML.className = `map-pin`;
        markerHTML.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25.83" height="38.237" viewBox="0 0 25.83 38.237">
        <path class="fill-white" id="Path_132" data-name="Path 132" d="M1268.925,104.02a12.415,12.415,0,0,0-12.415,12.415c0,6.857,12.415,24.455,12.415,24.455s12.415-17.6,12.415-24.455A12.415,12.415,0,0,0,1268.925,104.02Zm0,16.486a3.465,3.465,0,1,1,3.465-3.465A3.465,3.465,0,0,1,1268.925,120.506Z" transform="translate(-1256.01 -103.52)" fill="none" stroke="#faf7f3" stroke-miterlimit="10" stroke-width="1"/>
      </svg>`;
        

        new mapboxgl.Marker(markerHTML, {anchor: 'center', offset: [-0,-0]})
        .setLngLat([-0.102050, 51.513790])
        //.setPopup(popup)
        .addTo(map.current);

    }, [state]);


    const onChangeDatePicker = (item) => {
        setState([item.selection]);

        if (item.selection.endDate !== item.selection.startDate) {

            setTimeout(function() {
                setDatePickerPopup(false);
            }, 750);
        }
    }

    const toggleDatePickerPopup = (e) => {
        e.preventDefault();

        setDatePickerPopup( datePickerPopup => !datePickerPopup);
    }
    

    const minusNumAdults = (el) => {
        if ( adults > 1 ) {
            setAdults(adults - 1)
        }
    }
    const plusNumAdults = (el) => {
        setAdults(adults + 1)
    }

    const minusNumchildren = (el) => {
        if ( children > 0 ) {
            setChildren(children - 1)
        }
    }
    const plusNumChildren = (el) => {
        setChildren(children + 1)
    }

    const minusNumRoom = (el) => {
        if ( room > 1 ) {
            setRoom(room - 1)
        }
    }
    const plusNumroom = (el) => {
        setRoom(room + 1)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let openURL = 'https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=LONCCQQ';
        openURL += '&arrivalDate='+formStartDate;
        openURL += '&departureDate='+formEndDate;
        openURL += '&room1NumAdults='+adults;

        if ( room ) {
            for (let index = 1; index < room; index++) {
                openURL += '&room'+(index + 1)+'NumAdults=1';
            }
        }

        if ( children ) {
            for (let index = 0; index < children; index++) {
                openURL += '&room'+(index + 1)+'NumChildren=1';
            }
        }

        window.open(openURL, "_blank");

        
    }

    
    
    return (
    <>
    <Head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
    </Head>
    <div className="bg-cream-1  min-vh100 w-full top-0 left-0 z-10 flex items-center py-20 lg:py-40">
            <div className="container">
                <div className="max-w-1430px mx-auto">
                    <div className="md:flex md:items-center md:space-x-10 lg:space-x-20 space-y-10 md:space-y-0">
                        <div className="md:w-1/2 space-y-10">
                            <h3 className="font-display leading-none text-[50px] lg:text-[100px] lg:leading-none"><div className="inline-block text-left">Stay <br className="hidden md:block"/><em>a while</em></div></h3>

                            <div className="aspect-video relative">
                                    <div className="absolute w-full h-full"  ref={mapContainer} id="map"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">

                            <form className={`form`}>
                                <div className="form-group form-group--border relative">
                                    <label className="uppercase block" htmlFor='enquiry'>CHECK-IN - CHECK-OUT</label>
                                    <div className="flex space-x-4 lg:space-x-5">
                                        <div className="w-[25px]">
                                            <DatePickerSvg/>
                                        </div>
                                        <div className="field cursor-pointer select-none" onClick={toggleDatePickerPopup}>
                                            <span id="checkin">{checkin}</span> - <span id="checkout">{checkout}</span>
                                        </div>
                                    </div>

                                    <div 
                                    style={{visibility: "hidden"}}
                                    className={` ${ datePickerPopup ? '!visible !opacity-100 ' : 'opacity-0 invisible delay-250'} ease-in-out transition-[visibility,opacity] duration-250 fixed top-0 left-0 pt-[70px] lg:pt-[150px] h-full w-full flex items-end z-50`}>

                                        <div onClick={toggleDatePickerPopup} className="absolute bg-blue-1/50 inset-0"></div>
                                        
                                        <div className={`max-h-full overflow-auto relative w-full flex flex-col lg:flex-row-reverse  ease-in-out transition-transform ${ datePickerPopup ? 'translate-y-0 delay-250' : 'translate-y-full delay-0'} `}>
                                            
                                            <button onClick={toggleDatePickerPopup} aria-hidden className="flex space-x-5 bg-blue-1 text-white p-5 text-center justify-center items-center uppercase"><span>close</span><CrossSvg/> </button>

                                            <DateRange
                                            updateRange={() => alert()}
                                            onChange={onChangeDatePicker}
                                            moveRangeOnFirstSelection={false}
                                            months={2}
                                            ranges={state}
                                            direction="horizontal"
                                            rangeColors={['#000000', '#3ecf8e', '#fed14c']}
                                            minDate={addDays(new Date(), -0)}

                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group form-group--border">
                                    
                                    <label className="uppercase block" htmlFor='enquiry'>Guests</label>
                                    
                                    <div className="flex space-x-4 lg:space-x-5 ">
                                        <div className="shrink-0 w-[25px]">
                                            <GuestsSvg className=""/>
                                        </div>
                                        <div className="flex-1 flex justify-between max-w-lg space-x-3  lg:space-x-10">
                                            <div>
                                                <label htmlFor="adults_qty" className="!mb-3 block">Adults</label>
                                                <div className="flex num-wrap">
                                                    <div onClick={minusNumAdults} className="num-control num-minus">-</div>
                                                    <input id="adults_qty" name="adults_qty" className="num" readOnly value={adults}/>
                                                    <div onClick={plusNumAdults} className="num-control num-plus">+</div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="children_qty" className="!mb-3 block">Children</label>
                                                <div className="flex num-wrap">
                                                    <div onClick={minusNumchildren} className="num-control num-minus">-</div>
                                                    <input id="children_qty" name="children_qty" className="num" readOnly value={children}/>
                                                    <div onClick={plusNumChildren} className="num-control num-plus">+</div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rooms_qty" className="!mb-3 block">Room</label>
                                                <div className="flex num-wrap">
                                                    <div onClick={minusNumRoom} className="num-control num-minus">-</div>
                                                    <input id="rooms_qty" name="rooms_qty" className="num" readOnly value={room}/>
                                                    <div onClick={plusNumroom} className="num-control num-plus">+</div>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </div>

                                </div>

                                <div className="flex form-group">
                                    <label className="flex fake-radio !m-0" htmlFor="similar">
                                        <input className="absolute" name="similar" type="checkbox" id="similar"/>
                                        <span className="mr-4 lg:mr-5 border border-black w-[19px] h-[19px] rounded-full lg:w-[25px] lg:h-[25px]">
                                            <span></span>
                                        </span>
                                        <p>Show similar rooms</p>
                                    </label>
                                </div>
                                
                                <button className="button-tertiary" type='submit' onClick={(e)=>{handleSubmit(e)}}>Check Availability</button>

                                <p className="text-[9px] lg:text-[12px] text-center mt-5">Bookings for Lost Property are managed by Hilton.</p>
                            </form >

                            

                        </div>
                    </div>
                </div>
            </div>
    </div>
    </>
    );
};

export default BookingSection;