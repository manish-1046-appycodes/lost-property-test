import { useState, createRef } from "react";

import Link from "next/link";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import RailWay1 from "../../../public/image/icon/railway-1.svg";
import RailWay2 from "../../../public/image/icon/railway-2.svg";
import ImageFade from "../../ImageFade/ImageFade";

const url =
  "https://dominvsgroup.us9.list-manage.com/subscribe/post?u=fbd0df3072af596790bcd00e7&amp;id=c5e73a01bb";

const Footer = ({ border }) => {
  const emailRef = createRef(undefined);

  const year = new Date().getFullYear();

  const showPopup = () => {
    console.log("Show popup function running");
    !(function (c, h, i, m, p) {
      (m = c.createElement(h)),
        (p = c.getElementsByTagName(h)[0]),
        (m.async = 1),
        (m.src = i),
        p.parentNode.insertBefore(m, p);
    })(
      document,
      "script",
      `https://chimpstatic.com/mcjs-connected/js/users/5a1c502d9787103942bfc76a5/${process.env.NEXT_PUBLIC_MAILCHIMP_ID}.js`
    );
    document.cookie =
      "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "MCPopupSubscribed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <footer
      className={`footer overflow-hidden bg-cream-1 text-black ${
        border && "border-t border-black"
      }`}
    >
      <div className="container mb-10 lg:mb-20">
        <div className="mx-auto lg:flex mt-10 mb-20 lg:my-20 lg:space-x-10">
          <aside className="lg:flex lg:flex-wrap lg:w-1/2 mb-5 lg:-mb-14">
            <h3 className="font-display text-[50px] leading-none mb-14 lg:mr-28">
              Find <em>us</em>
            </h3>
            <address className="pl-20 lg:pl-0 not-italic mr-auto">
              3-5 Ludgate Hill, London,
              <br />
              EC4M 7AA
              <br />
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
            </address>
          </aside>

          <aside className="pl-20 mb-10 lg:hidden">
            <h3>Nearest station:</h3>
            <p>
              <RailWay1 className="inline align-baseline mr-2" />
              St Paul’s
            </p>
            <p>
              <RailWay1 className="inline align-baseline mr-2" />
              Blackfriars
            </p>
            <p>
              <RailWay2 className="inline align-baseline mr-2" />
              City Thameslink
            </p>
          </aside>
          <aside className="pl-20 lg:pl-0 lg:flex lg:w-1/2 lg:space-x-12 justify-end items-start">
            <button
              id="show-mailchimp-popup"
              onClick={() => {
                console.log("Button Clicked for mailchimp popup");
                showPopup();
              }}
            >
              Subscribe to newsletter
            </button>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/lostpropertystpauls/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/lostpropertystpauls/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:mt-28">
          <nav className="text-10px lg:text-16px self-end order-2 sm:order-1">
            <ul className="space-y-3 lg:space-y-2 opacity-[0.6]">
              <li>
                <a
                  href="https://hiltonhonors3.hilton.com/en/policy/global-privacy-statement/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Global Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://hiltonhonors3.hilton.com/en/terms/usage-agreement/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Site Usage Agreement
                </a>
              </li>
              <li>
                <a
                  href="https://hiltonhonors3.hilton.com/en/policy/cookies-statement/english.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cookies Statement
                </a>
              </li>
            </ul>
          </nav>

          <div className="inline-block text-left text-center order-1 sm:order-2  col-span-2 sm:col-span-1 mb-7 sm:mb-0">
            <Link href="/">
              <a className="block w-[143px] lg:w-[185px] mb-5 lg:mb-5 inline-block text-[0px]">
                <ImageFade
                  src="/image/curio.png"
                  alt="Curio"
                  width="185"
                  height="63"
                />
              </a>
            </Link>

            <div className="opacity-[0.6] text-[10px] leading-[1.8] lg:text-16px block">
              <p className="lg:order-2">Hilton Copyright ©{year} Hilton</p>
            </div>
          </div>

          <nav className="text-10px lg:text-16px text-right self-end order-3">
            <ul className="space-y-3 lg:space-y-2 opacity-[0.6]">
              <li>
                <a
                  href="https://www.hilton.com/en/hilton-honors/personal-data-requests/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Personal Data Requests
                </a>
              </li>
              <li>
                <a
                  href="https://www.hilton.com/en/hilton-honors/personal-data-requests/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Do Not Sell My Information
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutads.info/choices"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ad Choices
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
