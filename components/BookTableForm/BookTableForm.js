import ChevDown from '../../public/image/icon/chev-down.svg'

const BookTableForm = () => {
  return (
    <div className="pb-[170px] xl:pb-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 max-w-[244px] lg:max-w-[976px] w-full mx-auto">
            <div className="
            border border-current min-h-[56px] lg:min-h-[75px] p-5 py-2 lg:px-14 items-center flex relative">
            2 People
            <ChevDown className="absolute right-5"/>
            </div>
            <div className="
            border border-current min-h-[56px] lg:min-h-[75px] p-5 py-2 lg:px-14 items-center flex relative">
            20 Dec 2021
            <ChevDown className="absolute right-5"/>
            </div>
            <div className="
            border border-current min-h-[56px] lg:min-h-[75px] p-5 py-2 lg:px-14 items-center flex relative">
            7:00pm
            <ChevDown className="absolute right-5"/>
            </div>
            <button className="min-h-[56px] lg:min-h-[75px] p-5 py-2 lg:px-14 items-center flex justify-center bg-white text-black uppercase whitespace-nowrap"
            aria-hidden="true">Find a Table</button>
        </div>
    </div>
  )
};

export default BookTableForm;
