import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Restuarantcard(info) {
  
  // console.log(info.link.split("/").at(-1));
  return (
    <Link to={`/menu/${info.link.split("/").at(-1)}`}>
    <div className=' min-w-[275px]  h-[182px] mt-2  relative     '>
              <img className=' w-full h-full  object-cover   cursor-pointer rounded-xl    ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`} alt="" />
              <div className='w-full h-full bg-gradient-to-t  from-black from-1% to-transparent to-40%   rounded-xl absolute top-0 '></div>
              <p className='absolute bottom-0 text-white font-bold ml-6 text-xl mb-2 '>
                {
                  info?.aggregatedDiscountInfoV3 ? info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader:""
                }
                
                </p>
            </div>
            <div className='ml-5 mt-2 ' >
              <h2 className='text-lg font-semibold '>{info.name}</h2>
              <p className='flex items-center gap-1  text-lg font-base '>
                <i className="fi  flex  items-center  fi-sr-circle-star text-xl text-green-700"></i>
                <span className=' font-semibold '>{info.avgRating}.</span>
                 <span className=' font-semibold '>{info.sla.slaString} </span>
                 </p>
              <p className='line-clamp-1 text-black/60 font-medium '>{info.cuisines.join(", ")}
              </p>
              <p className=' text-black/60 font-medium '>{info?.locality}</p>
            </div>
    </Link>
  )
}

export default Restuarantcard
