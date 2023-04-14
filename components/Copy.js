import React from 'react'

const Copy = ({settings}) => {

  return (
    <section className='my-20 lg:my-28'>
        
        <div className='container'>
            <div className="max-w-1430px mx-auto space-y-6 lg:space-y-16">
                { settings?.title &&
                  <>
                  {settings?.titletag == 'h2' ?
                  <h2 className='text-[42px] lg:text-[72px] md:max-w-xl leading-12'>{settings?.title}</h2>
                  :
                  <h1 className='text-[42px] lg:text-[72px] md:max-w-xl leading-12'>{settings?.title}</h1>
                  }
                  </>
                  
                }

                <div className='wysiwyg' dangerouslySetInnerHTML={{ __html: settings?.copy }}/>
            </div>
        </div>
        
    </section>
  )
}

export default Copy