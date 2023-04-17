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
      const iframe = document.querySelector("#openTableWidget iframe");
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const form = iframeDoc.querySelector(".ot-dtp-picker-form");
      form.addEventListener("submit", (e) => {
        console.log("yaaa form submitted ..... @@@@@@");
        console.log("yaaa form submitted ..... @@@@@@");
        console.log("yaaa form submitted ..... @@@@@@");
        console.log("yaaa form submitted ..... @@@@@@");
        console.log(e.target);
      });
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const iframe = document.querySelector("#openTableWidget iframe");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const form = iframeDoc.querySelector(".ot-dtp-picker-form");
    form.submit();
  };

  return (
    <div id="openTableWidget" className="pb-28 lg:pb-52 flex justify-center">
      <button onClick={handleFormSubmit}>Book a table</button>
    </div>
  );
};

export default OpenTableWidget;
