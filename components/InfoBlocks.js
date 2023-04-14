import React from 'react'

const InfoBlocks = ({settings}) => {

    return (
    <section className='my-20 lg:my-28'>
        
        <div className='container'>
            <div className="max-w-1430px mx-auto md:columns-2 md:gap-[80px] space-y-[60px] lg:space-y-[120px]">
            { settings?.infoBlocks &&
                settings.infoBlocks.map( (block, i) =>
                <div
                key={`block-${i}`}
                className="">
                    <h3 className='mb-7 lg:mb-14 heading-brand-xs'>{block.title}</h3>
                    <div className='wysiwyg' dangerouslySetInnerHTML={ {__html: block?.copy}}/>
                </div>
                )
            }
            </div>
        </div>
        
    </section>
  )
}

export default InfoBlocks