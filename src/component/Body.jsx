
import React, { useContext, useEffect, useState } from 'react';
import Yourmind from './Yourmind';
import Toprestaurant from './Toprestaurant';
import Fooddelivery from './Fooddelivery'
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import userestuarantdata from '../hooks/userestuarantdata';

function Body() {
 const [toprestuarantdata,onyourminddata,toprestitle,fooddeltitle,data] = userestuarantdata()
  const filterval = useSelector((state) => state.filterslice.filterval)
  // console.log("this is toprestaurantdata", toprestuarantdata);

  const filterdata = toprestuarantdata.filter(
    (item) => {
      if (!filterval) return true;

      switch (filterval) {
        case "Ratings 4.0+": return item?.info?.avgRating > 4
        case "Offers": return !item?.info?.aggregatedDiscountInfoV2
        case "Rs.300-Rs-600": return item?.info?.costForTwo?.slice(1, 4) >= 300 && item?.info?.costForTwo?.slice(1, 4) <= 600
        case "Less than Rs.300": return item?.info?.costForTwo?.slice(1, 4) < 300
        default: return true
      }
    }
  )


  if (data?.communication) {
    return (
      <div className='flex items-center justify-center flex-col '>
        <img className=' w-60 mt-32 ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1 className='text-lg font-bold '>Location Unservicable</h1>
        <p className='text-center font-semibold text-slate-500 '>We don’t have any services here till now.<br></br> Try changing location.</p>
      </div>

    )

  }


  return (
    <div>
      {
        toprestuarantdata?.length ? (<div className='w-[75%] sm:w-[75%]   lg:w-[85%]  md:w-[75%]   mx-auto  xl:w-[75%]  mt-2 overflow-hidden    '>
          <div className='  '>
            {
              onyourminddata?.length ? (
                <>
                  <Yourmind data={onyourminddata} />
                  <Toprestaurant data={toprestuarantdata} title={toprestitle} />
                </>
              ) : ""}

            <Fooddelivery data={filterval ? filterdata : toprestuarantdata} title={fooddeltitle} />
          </div>


        </div>) : <Shimmer />
      }

    </div>

  );
}

export default Body;
// shimmer colour #171a29
