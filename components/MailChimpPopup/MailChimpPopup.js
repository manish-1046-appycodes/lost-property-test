import React, { useState, useEffect, createRef } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe"

import ChevDown from '../../public/image/icon/chev-down.svg'



const url = "https://dominvsgroup.us9.list-manage.com/subscribe/post?u=fbd0df3072af596790bcd00e7&amp;id=c5e73a01bb";


const MailChimpPopup = () => {
    
    const [notScroll, setNotScroll] = useState(true);
    const [mcOpen, setMcOpen] = useState(false);
    const emailRef = createRef(undefined)
    const [interest, setInterest] = useState(false);
    const [showForm, setShowForm] = useState(false);


    const handleRadio = (e) => {
        setInterest(e.target.defaultValue);       
    }

    useEffect( () => {
        
        window.addEventListener('scroll', checkScroll);
        
        
        return () => {
            window.removeEventListener('scroll', checkScroll);
        }
    });

    const checkScroll = () => {

        
            if ( ( window.scrollY >= window.innerHeight) && notScroll ) {
                mcOpenPopup();
            }

        }

        

        const mcOpenPopup = () => {
            setMcOpen(true);
        }

        const mcClose = () => {
            setMcOpen(false);
            setNotScroll(false);
        }

        const mcCloseDelay = () => {
            setTimeout(function() {
                mcClose();
            }, 4000)
        }

    return (
        <>
        <div
        style={{opacity: 0}}
        className={`duration-500 transition-[opacity,visibility,transform] invisible fixed inset-0 z-50 overflow-auto scale-100 pointer-events-auto user-select-none ease-in-out duration-500 ${ mcOpen ? '!visible !opacity-100 scale-100' : 'nav-closed'}`}>
            
            <div className="relative z-10  py-5 w-full min-h-full flex">
            <div className="bg-black/50 absolute inset-0 backdrop-blur-sm cursor-pointer" onClick={mcClose}></div>
            
            <MailchimpSubscribe url={url} render={({ subscribe, status, message }) => (
                    
                    

                    <div 
                    className={`z-10 m-auto bg-blue-1 text-white w-9/12 w-[280px] md:w-6/12 max-w-[598px] p-4 lg:px-14 lg:py-9 text-center  flex flex-col justify-between items-center relative`}>
                        
                        { status == 'success' && mcCloseDelay()}   
                        
                        <div className={`transition-[opacity,visibility] opacity-0 invisible font-display text-[20px] p-10 max-w-full lg:text-[40px] w-[440px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${status == 'success' ? '!visible !opacity-100': ''} `}>
                            <p className="mb-10">Thank you for signing up to our mailing list.</p>

                            <p>We look forward to getting lost with you soon.</p>
                        </div>

                        <div className={` ${ status == 'success' ? 'invisible' : ''} flex justify-center items-center flex-col w-full`}>

                            <h2 className="heading-sub uppercase">GOOD THINGS ARE COMING</h2>
                            
                            
                            <div className={` pt-6 lg:py-20 lg:pb-0 `}>
                                <div className={`py-0 max-w-[373px] wysiwyg`}>
                                    <p>Opening in Spring 2022 and situated in the heart of London.</p>
                                    <p>Be the first to book one of our luxuriously contemporary rooms.</p>
                                    <p>Sign up to our emails and be notified when we are open and ready to discover the secrets Lost Property St. Pauls has to offer.</p>
                                </div>

                                
                                
                            </div>

                            
                            <form 
                            className={`invisible mt-5 lg:mt-10 mb-5 w-full ${ showForm && status !== 'success' ? '!visible' : ''}`}
                            onSubmit={() => {
                                event.preventDefault()
                                subscribe({
                                    EMAIL: emailRef.current.value,
                                    MMERGE1: interest
                                })
                            }}
                            >
                                

                                <div className="block">

                                    <div className="text-12px lg:text-16px uppercase mb-5 lg:mb-10">
                                        <p className="mb-4">I am interested in </p>
                                        <ul className="interested-list">
                                            <li><input selected type="radio" value="Guest Suites" name="MMERGE1" id="mce-MMERGE1-0" onChange={handleRadio}/><label htmlFor="mce-MMERGE1-0">Guest Suites</label></li>
                                            <li><input type="radio" value="Food &amp; Drink" name="MMERGE1" id="mce-MMERGE1-1" onChange={handleRadio}/><label htmlFor="mce-MMERGE1-1">Food &amp; Drink</label></li>
                                            <li><input type="radio" value="Events / Spaces" name="MMERGE1" id="mce-MMERGE1-2" onChange={handleRadio}/><label htmlFor="mce-MMERGE1-2">Events / Spaces</label></li>
                                        </ul>
                                    </div>

                                    <div className="border-b border-white flex space-x-5 justify-between w-[272px] max-w-full ml-auto">
                                        <input ref={emailRef} type="email" className="bg-transparent py-3 flex-1 lg:text-[14px] outline-none placeholder:text-white/40" placeholder="Enter your email"/>
                                        <button className="uppercase text-[12px] lg:text-[16px]" type="submit">Send</button>
                                    </div>
                                </div>

                            </form>

                            { status == 'error' &&
                            <div className="mb-5 lg:my-5 text-12px uppercase">
                            { message.replace('0 -', '') }
                            </div>
                            }

                            { status == 'sending' &&
                            <div className="mb-5 lg:my-5 text-12px uppercase">
                            Sending...
                            </div>
                            }

                            { status == 'success' &&
                            <div className="mb-5 lg:my-5 text-12px uppercase">
                            {message}
                            </div>
                            }

                            
                            <div className={`bottom-0 right-0 ml-auto uppercase flex items-center justify-end cursor-pointer space-x-3 text-[0.75rem] lg:text-base uppercase `} 
                            onClick={() => {setShowForm(true)}}><span>Sign Up Now</span> <ChevDown/></div>
                            
                        </div>

                    </div>

                    
                
            )}
            />
            </div>
        </div>
        </>
    )
};

export default MailChimpPopup;