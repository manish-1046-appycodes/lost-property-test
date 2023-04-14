import { createRef } from 'react';

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://dominvsgroup.us9.list-manage.com/subscribe/post?u=fbd0df3072af596790bcd00e7&amp;id=c5e73a01bb";

const SubscribeForm = () => {

  const emailRef = createRef(undefined)

  return (
    <section className="subscribe bg-blue-1 py-20 lg:py-24">
        <div className="container text-center text-white">
          <h3 className="mb-5 leading-115 text-[42px] lg:text-[60px] font-display">Stay in the <em>know</em></h3>
          
          <MailchimpSubscribe url={url} render={({ subscribe, status, message }) => (
            <form 
            className={`relative inline-block max-w-[615px] w-full `}
            onSubmit={() => {
                event.preventDefault()
                subscribe({
                    EMAIL: emailRef.current.value
                })
            }}
            >   
              <div className="inline-block max-w-[615px] w-full">
                <div className={`${ status == 'success' ? 'hidden' : ''} border-b border-white flex space-x-5 justify-between`}>
                          <input ref={emailRef}  className="bg-transparent py-4 flex-1 outline-none" type="email" placeholder="Enter your email"/>
                          <button className="uppercase text-[16px]" type="submit">Send</button>
                </div>
              </div>

                  { status == 'error' &&
                  <div className="mb-2 lg:my-2 text-12px uppercase absolute top-full">
                  { message.replace('0 -', '') }
                  </div>
                  }

                  { status == 'sending' &&
                  <div className="mb-2 lg:my-2 text-12px uppercase absolute top-full">
                  Sending...
                  </div>
                  }

                  { status == 'success' &&
                  <div className="mb-2 lg:my-2 text-12px uppercase ">
                  { message }
                  </div>
                }
                
            </form>
          )}/>
          
          
          
        </div>

      </section>
    );
};

export default SubscribeForm;
