
import React, { useContext, useEffect, useState } from 'react';
import Yourmind from './Yourmind';
import Toprestaurant from './Toprestaurant';
import Fooddelivery from './Fooddelivery'
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import userestuarantdata from '../hooks/userestuarantdata';

function Body() {
//  const [toprestuarantdata,onyourminddata,toprestitle,fooddeltitle,data] = userestuarantdata()
 const [toprestuarantdata, setTopreastaurantdata] = useState([]);
    const [onyourminddata, setOnyourminddata] = useState([]);
    const [toprestitle, setToprestitle] = useState([]);
    const [fooddeltitle, setFooddeltitle] = useState([]);
    const [data, setData] = useState({});
  
    const { lat, lng } = useSelector((state) => state.coordinates);
  
    async function fetchData() {
      // const data = await fetch(`https://onlinedeliveryapp.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);

      const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      // const data = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`));
      const swiggyData = await data.json();
      // console.log(swiggyData)
      // const swiggyData = JSON.parse(result.contents); 
      setToprestitle(swiggyData?.data?.cards[1]?.card?.card?.header?.title)
      setFooddeltitle(swiggyData?.data?.cards[2]?.card?.card?.title)
      setData(swiggyData.data)
      let maindata = swiggyData?.data?.cards.find(data => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants
      let maindata2 = swiggyData?.data?.cards.find(data => data?.card?.card?.id == "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants
      // console.log(maindata)
      // console.log(maindata2)
      setTopreastaurantdata(maindata || maindata2)
      let data2 = swiggyData?.data?.cards.find(data => data?.card?.card?.id == "whats_on_your_mind")?.card?.card?.imageGridCards?.info
  
      setOnyourminddata(data2)
      // setOnyourminddata(swiggyData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
  
    }
  
    useEffect(() => {
      fetchData();
    }, [lat, lng]);
    
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
