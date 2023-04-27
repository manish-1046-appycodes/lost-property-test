import { useState, useRef, useEffect } from "react";
import ImageFade from "../ImageFade/ImageFade";
import Head from "next/head";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JlZW53aWNoZGVzaWduIiwiYSI6ImNrYWRtam9kbDFuaWUyeHM5N2s2cm55NGgifQ.tk1-NvEu4k83F2KSs_2Fog";
const BOUNDS = [-8.952656, 49.870521, 1.632071, 58.771582];

const ModuleContact = ({ settings }) => {
  const [hp1, setHp1] = useState("");
  const [hp2, setHp2] = useState("hp");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [thankyou, setThankyou] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/greenwichdesign/cl4gu86sv000t14ogo25kq4dd",
      //bounds: BOUNDS,
      interactive: false,
      center: [-0.10205, 51.51379],
      zoom: 14,
    });

    // Create a DOM element for each marker.
    var markerHTML = document.createElement("div");
    markerHTML.className = `map-pin`;
    markerHTML.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25.83" height="38.237" viewBox="0 0 25.83 38.237">
        <path class="fill-white" id="Path_132" data-name="Path 132" d="M1268.925,104.02a12.415,12.415,0,0,0-12.415,12.415c0,6.857,12.415,24.455,12.415,24.455s12.415-17.6,12.415-24.455A12.415,12.415,0,0,0,1268.925,104.02Zm0,16.486a3.465,3.465,0,1,1,3.465-3.465A3.465,3.465,0,0,1,1268.925,120.506Z" transform="translate(-1256.01 -103.52)" fill="none" stroke="#faf7f3" stroke-miterlimit="10" stroke-width="1"/>
      </svg>`;

    new mapboxgl.Marker(markerHTML, { anchor: "center", offset: [-0, -0] })
      .setLngLat([-0.10205, 51.51379])
      //.setPopup(popup)
      .addTo(map.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      telephone,
      yourEmail: email,
      message,
    };

    if (hp1 !== "" || hp2 !== "hp") {
      return;
    }

    const result = await fetch("/api/contact", {
      method: "POST",

      body: JSON.stringify(data),
    }).then((data) => {
      if (data.status === 200) {
        return data.json();
      }
    });

    if (result.result.status == "mail_sent") {
      setSubmitted(true);
      setEmail("");
      setMessage("");
      setTelephone("");
    } else {
      const form_groups = document.querySelectorAll(".form-group");
      form_groups.forEach((group) => {
        group.classList.remove("text-red-1");

        if (group.querySelector(".error")) {
          group.querySelector(".error").remove();
        }
      });

      if (result.result.invalid_fields.length) {
        result.result.invalid_fields.forEach((invalid_field) => {
          const el = document.getElementById(invalid_field.error_id);
          el.classList.add("text-red-1");

          el.insertAdjacentHTML(
            "beforeend",
            '<span class="absolute text-12px error">' +
              invalid_field.message +
              "</span>"
          );
        });
      }
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="min-vh100 w-full top-0 left-0 z-10 flex items-center py-20 lg:py-40">
        <div className="container">
          <div className="max-w-1430px mx-auto">
            <div className="md:flex md:space-x-10 space-y-10 md:space-y-0">
              <div className="md:flex-1 space-y-10 flex flex-col justify-between">
                <h3 className="font-display leading-none text-[50px] lg:text-[100px] lg:leading-none">
                  Get in <em>touch</em>
                </h3>

                <div className="wysiwyg md:text-[30px] !mb-10">
                  <p>
                    3-5 Ludgate Hill,
                    <br />
                    London <br /> EC4M 7AA{" "}
                  </p>
                  <p>
                    <a
                      className="hover:underline"
                      href="mailto:info@lostpropertyhotel.com"
                    >
                      info@lostpropertyhotel.com
                    </a>
                    <br />
                    <a className="hover:underline" href="tel:02045530555">
                      0204 5530 555
                    </a>
                  </p>
                </div>

                <div
                  className="wysiwyg !mt-auto"
                  dangerouslySetInnerHTML={{ __html: settings?.copy }}
                ></div>
              </div>

              <div className="md:flex-1 space-y-10 flex flex-col justify-between">
                <div className="aspect-video relative basis-[50%]">
                  <div
                    className="absolute w-full h-full"
                    ref={mapContainer}
                    id="map"
                  ></div>
                </div>

                <div className="aspect-video relative basis-[50%]">
                  <ImageFade
                    src="/image/del/carousel/item-2-c.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Contact Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleContact;
