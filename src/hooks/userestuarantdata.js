import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function userestuarantdata() {
    const [toprestuarantdata, setTopreastaurantdata] = useState([]);
    const [onyourminddata, setOnyourminddata] = useState([]);
    const [toprestitle, setToprestitle] = useState([]);
    const [fooddeltitle, setFooddeltitle] = useState([]);
    const [data, setData] = useState({});
  
    const { lat, lng } = useSelector((state) => state.coordinates);
  
    async function fetchData() {
      // const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      const data = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`));
      const result = await data.json();
      // console.log(swiggyData)
      const swiggyData = JSON.parse(result.contents); 
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

    return[toprestuarantdata,onyourminddata,toprestitle,fooddeltitle,data]

}


export default userestuarantdata
