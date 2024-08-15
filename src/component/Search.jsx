import React, { useEffect, useState } from 'react'
import Sdishes from './Sdishes'
import Srestuarant, { withhoc } from './Srestuarant'
import { useDispatch, useSelector } from 'react-redux'
import {  resetsimilarresdish } from '../utils/toogleslice'

function Search() {

  const [searchquery, setsearchquery] = useState("")
  const [dishes, setDishes] = useState([])
  const [restaurantdata, setRestuarantdata] = useState([])
  const [selecteddishes, setSelecteddishes] = useState(null)
  const [similarresdishes, setSimilarresdishes] = useState([])
  const { lat, lng } = useSelector((state) => state.coordinates);
  const {issimilarresdishes,city,resid,itemid,reslocation} = useSelector((state) => state.toogle.similarresdish)
  // console.log({issimilarresdishes,city,resid,itemid,reslocation})
  const [filbtn, setFilbtn] = useState("dishes")
  const dispatch = useDispatch()
    
  let Promotedtres =withhoc(Srestuarant)


  const filterbtn = [
    "Restaurants",
    "dishes"
  ]


  function handlebtn(btn) {
    setFilbtn(filbtn === btn ? filbtn : btn)
  }

  function handlesearch(e) {
    setsearchquery(e.target.value)
  }

  function handlesearchquery(e) {
    let val = e.target.value
    if (e.keyCode == 13) {
      setsearchquery(val)
      setSelecteddishes(null)
      setDishes([])
    }
  }

  async function fetchdishes() {
    let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchquery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=be5d58e5-adda-49b6-0b8b-95bf796c1c05`)
    let res = await data.json()
    setDishes((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info))

  }


 
  async function fetchsimilarresdishes() {

    let pathname=`/city/${city}/${reslocation}`
   let encodedpath=encodeURIComponent(pathname)
  //  console.log(encodedpath)
    let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchquery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedpath}-rest${resid}%3Fquery%3D${searchquery}&restaurantIdOfAddedItem=${resid}&itemAdded=${itemid}`)
    let res = await data.json()
    // console.log(res)
    setSelecteddishes(res?.data?.cards[1])
    setSimilarresdishes(res?.data?.cards[2]?.card?.card?.cards)

    dispatch(resetsimilarresdish())
  }

  async function fetchrestaurant() {
    let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchquery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=be5d58e5-adda-49b6-0b8b-95bf796c1c05&selectedPLTab=RESTAURANT`)
    let res = await data.json()
    setRestuarantdata((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data => data?.card?.card?.info))
    // console.log("this is restuarant data ", restaurantdata)

  }
  useEffect(() => {
    if (issimilarresdishes) {
      fetchsimilarresdishes()
    }
  }, [issimilarresdishes])


  useEffect(() => {
    if (searchquery == "") {
      return
    }
    // setsearchquery("  ")
    fetchdishes()
    fetchrestaurant()
  }, [searchquery])
  function handledel() {
    setsearchquery("")
  }
 
  return (
    <>
      <div className='w-full md:w-[800px] mx-auto '>
        <div className='w-full relative '>
          <i className="fi fi-rr-angle-left absolute top-9 font-bold text-xl cursor-pointer  "></i>
          {searchquery == "" ?
            <i onClick={(e) => handlesearch(e)} className="fi fi-br-search absolute right-2  top-9 cursor-pointer "></i>
            : <i onClick={handledel} className="fi fi-bs-cross absolute right-2  top-9 cursor-pointer  "></i>
          }
          <input
            // onClick={(e) => setsearchquery(e.target.value)}
            onKeyDown={handlesearchquery}
            className='w-full p-3 pl-5  focus:outline-none mt-5 font-semibold text-slate-950  border-2  ' type="text" placeholder="Search for restuarant and food " />
        </div>
        {/* <p>{searchquery}</p> */}
        {
          !selecteddishes &&
          <div className='flex flex-wrap  my-5  gap-3  '>
            {
              filterbtn.map((data,i) => (
                <button key={i} onClick={() => handlebtn(data)} className={"filter flex gap-1  " + (filbtn === data ? " bg-[#3e4152] text-white  font-semibold  " : "  ")} >
                  <p>{data}</p>
                </button>

              ))
            }
          </div>}
        {searchquery &&
          <div className='w-full md:w-[800px] mt-7  bg-[#f5f6f8] grid grid-cols-1 md:grid-cols-2 gap-2 p-3      '>
            {selecteddishes ?
             <>
             <div>
             <p className='p-4 '>item added to cart </p>
             <Sdishes data={selecteddishes.card.card}/>
             <p className='p-4 ' >More dishes from this restaurant</p>
             </div>
             <br/>
             {
              similarresdishes.map((data,i)=> <Sdishes key={i} data={{...data.card, restaurant:selecteddishes.card.card.restaurant}}/> )
             }
             </> 
             :
              filbtn === "dishes" ?
                (dishes.map((data,i) => <Sdishes key={i} data={data.card.card } />))
                : (restaurantdata.map((data) => 
               data?.card?.card?.info?.promoted?
               <Promotedtres data={data}/>
               :
               <Srestuarant data={data} />
              ))
            }
          </div>}
      </div>
    </>
  )
}

export default Search
