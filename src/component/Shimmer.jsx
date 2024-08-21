import React from 'react'
import { useSelector } from 'react-redux'

function Shimmer() {

    return (
        <>
        <div className='w-full text-white flex   '>
            <div className='w-full h-[300px] flex justify-center items-center flex-col gap-5  bg-[#171a29]'>
                <div className='relative '>
                    <img className='w-[55px] absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                    <p className='loader  w-20  h-20  '></p>
                </div>
                <h1 className=' text-2xl  '> Looking for great food near you ...</h1>
            </div>
           
        </div>
        <div className='w-[70%]  mx-auto mt-4  '>
        <div className='w-36 rounded-sm   h-2  shimmer-back  mb-2  '></div>

         <div className=' gap-10 md:gap-32    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3    '>
            {Array(3).fill("").map((data,i)=>
             <div key={i} className='mt-4   ' >
             <div className='w-[275px]  h-[182px] rounded-2xl shimmer-back  '> </div>
             <div className='w-32 h-2  shimmer-back mt-3  '></div>
             <div className='w-16 h-2  shimmer-back mt-3  '></div>
             <div className='w-8 h-2  shimmer-back mt-3    '></div>
             </div>
            )}
          <div className='mt-4'></div>
         </div>
         </div>
         </>
    )
}

export default Shimmer

export function Menushimmer(){
//   const resinfo = useSelector((state) => state.cartslice.resinfo)

    return (
        <>
      {/* <div className='w-[60%] md:w-[60%] mx-auto  '>
      <div className='w-full h-3 bg-slate-200   '>  </div>

         <div className='    grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  '>
           
         {Array(4).fill("").map((data,i)=> 
         <div key={i} className='mt-4 gap-56 lg:gap-44 ' >
          <div className='  w-[300px]  h-[250px]  shimmer-back  '> </div>
          <div className='w-32 h-2  shimmer-back mt-3  '></div>
          <div className='w-16 h-2  shimmer-back mt-3  '></div>
          <div className='w-8 h-2  shimmer-back mt-3    '></div>
          </div>)}
          </div>
      </div> */}
      <div className='w-full text-white flex   '>
            <div className='w-full h-[300px] flex justify-center items-center flex-col gap-5  bg-[#171a29]'>
                <div className='relative '>
                    <img className='w-[55px] absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                    <p className='loader  w-20  h-20  '></p>
                </div>
                <p className=' text-2xl  '> finding the great  places for your restaurant ... </p>
            </div>
           
        </div>
        <div className='w-[70%]  mx-auto mt-4  '>
        <div className='w-36 rounded-sm   h-2  shimmer-back  mb-2  '></div>

         <div className=' gap-10 md:gap-32    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3    '>
            {Array(3).fill("").map((data,i)=>
             <div key={i} className='mt-4   ' >
             <div className='w-[275px]  h-[182px] rounded-2xl shimmer-back  '> </div>
             <div className='w-32 h-2  shimmer-back mt-3  '></div>
             <div className='w-16 h-2  shimmer-back mt-3  '></div>
             <div className='w-8 h-2  shimmer-back mt-3    '></div>
             </div>
            )}
          <div className='mt-4'></div>
         </div>
         </div>
        </>
    )
}