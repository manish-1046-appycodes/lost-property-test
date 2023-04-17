import { useEffect } from "react";

const opentableURL =
  "//www.opentable.co.uk/widget/reservation/loader?rid=269142&type=standard&theme=standard&color=1&iframe=true&domain=couk&lang=en-GB&newtab=false&ot_source=Restaurant%20website";

const OpenTableWidget = ({ carouselItems }) => {
  useEffect(() => {
    // load open table script
    const script = document.createElement("script");
    script.src = opentableURL;
    script.async = true;
    const openTableWidget = document.querySelector("#openTableWidget");
    openTableWidget.appendChild(script);

    // add event listener to the form inside the iframe
    script.onload = () => {
      const iframe = openTableWidget.querySelector("iframe");
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.addEventListener("submit", (e) => {
        console.log(e.target);
      });
    };
  }, []);

  return (
    <div id="openTableWidget" className="pb-28 lg:pb-52 flex justify-center" />
  );
};

export default OpenTableWidget;
