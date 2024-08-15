
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, clearcart } from '../utils/cartslice';
import toast from 'react-hot-toast';
import Addtocartbtn from './Addtocartbtn';
import { isdiffertoggle } from '../utils/toogleslice';
import { Menushimmer } from './Shimmer';
import userestuarantmenu from '../hooks/userestuarantmenu';
let veg = " https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png "
let nonveg = "https://cdn.vectorstock.com/i/500p/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"


function Resmenu() {
    // const [menudata,resinfo,discountinfo,toppicksdata,value]=userestuarantmenu()
    const [menudata, setMenudata] = useState([])
    const [resinfo, setResinfo] = useState([])
    const [discountinfo, setDiscountinfo] = useState([])
    const [toppicksdata, setToppicksdata] = useState(null)
    const [value, setValue] = useState(0)
    // const{cordi:{lat,lng}}=useContext(Coordinates)
    const { lat, lng } = useSelector((state) => state.coordinates);

    const { id } = useParams();
    let mainid = id.split("-").at(-1);

    async function fetchmenu() {


        // const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER`));
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER`)
        const res = await response.json();
        // const res = JSON.parse(result.contents);
        setResinfo(res?.data?.cards[2]?.card?.card?.info)
        setDiscountinfo(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        let actualmenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
        setMenudata(actualmenu)
        setToppicksdata((res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data.card.card.title == "Top Picks")[0])
    }

    useEffect(() => {
        fetchmenu();
    }, [lat, lng]);
    function handlenext() {

    }
    function handleprev() {

    }

    return (
        <div className='w-full '>
            {
                 menudata?.length  ?
                    <div className=' w-[95%] md:w-[800px] mx-auto pt-8 '>
                        <p className='font-[10px] text-slate-500 '><Link to={"/"}><span className=' hover: text-slate-800 cursor-pointer'>home</span></Link> / <span className=' hover: text-slate-800  cursor-pointer'>{resinfo.city}</span>/ <span className='text-slate-700 '>{resinfo.name}</span>  </p>
                        <h1 className='mt-9 ml-4 font-bold text-2xl'>{resinfo.name}</h1>
                        <div className='w-full h-[206px] bg-gradient-to-t from-slate-300/70 pb-4 pl-4 pr-4    ml-4  mt-3 rounded-[32px] '>
                            <div className='w-full h-full border  border-slate-300 rounded-[32px] bg-white  '>
                                <div className='p-4 w-full  '>
                                    <div className='flex items-center gap-1 font-semibold '>
                                        <i className="fi  text-green-600 text-xl  fi-sr-circle-star"></i>
                                        <span>{resinfo.avgRatingString}</span>
                                        <span>({resinfo.totalRatingsString})</span>
                                        <span>.</span>
                                        <span>{resinfo.costForTwoMessage}</span>
                                    </div>
                                    <p className='cursor-pointer underline text-orange-600 font-semibold  '> {resinfo?.cuisines?.join(",")}</p>
                                    <div className='flex gap-3  '>
                                        <div className='mt-4 w-[7px] flex flex-col justify-center items-center '>
                                            <div className='w-[7px] h-[7px] rounded-full bg-gray-300 '></div>
                                            <div className='w-[1px] h-[20px] bg-gray-300 '></div>
                                            <div className='w-[7px] h-[7px] rounded-full bg-gray-300 '></div>
                                        </div>
                                        <div className='flex  flex-col gap-1 text-sm mt-3 ' >
                                            <p className='font-semibold  '>Outlet  <span className='text-[15px] text-slate-500'>{resinfo.areaName}</span></p>
                                            <p className='font-semibold'>{resinfo?.sla?.slaString}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-2  border ' />
                                <div className=' w-full '>
                                    <div className='flex items-center pt-2 pl-5  '>
                                        <img className='w-5  ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/${resinfo?.feeDetails?.icon}`} alt="" />
                                        {/* <span>{resinfo?.expectationNotifiers[0]?.enrichedText} </span> */}
                                        {/* <span>{console.log(resinfo?.expectationNotifiers?.[0]?.enrichedText.split("<b>"))}</span> */}
   
                                        <span className='text-sm ml-4 text-slate-600 '>{resinfo?.expectationNotifiers?.[0]?.enrichedText.replace(/<[^>]*>/g, "")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full overflow-hidden '>
                            <div className='flex justify-between mt-8 '>
                                <h1 className='font-bold text-xl  ml-2 '>Deals for you  </h1>

                                <div className='flex  gap-3'>
                                    <div onClick={handleprev} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                                    </div>
                                    <div onClick={handlenext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")} >
                                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 196 ? "text-gray-400" : "text-gray-800")}></i>
                                    </div>
                                </div>
                            </div  >
                            <div className='flex gap-4 mt-3 ml-4  '>
                                {
                                    discountinfo.map((data,i) => (
                                        <Discount key={i} data={data} />
                                    ))

                                }
                            </div>

                        </div>

                        <h2 className='text-center mt-5 text-gray-500 font-semibold'>  MENU </h2>
                        <Link to={"/search"}>
                            <div className='w-full relative  mt-5  '>
                                <div className='w-full text-lg p-3 bg-slate-200 font-semibold text-center cursor-pointer  text-gray-600 rounded-2xl '>search for dishes </div>
                                <i className="fi fi-br-search absolute top-3 text-lg  text-gray-600 right-4"></i>
                            </div>
                        </Link>

                        {toppicksdata &&
                            <div className='w-full overflow-hidden '>
                                <div className='flex justify-between mt-8 '>
                                    <h1 className='font-bold text-xl '>{toppicksdata.card.card.title}  </h1>

                                    <div className='flex  gap-3'>
                                        <div onClick={handleprev} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                                            <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-800")}></i>
                                        </div>
                                        <div onClick={handlenext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")} >
                                            <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 196 ? "text-gray-400" : "text-gray-800")}></i>
                                        </div>
                                    </div>
                                </div  >
                                <div className='flex gap-4 mt-3  '>
                                    {
                                        toppicksdata.card.card.carousel.map(({ creativeId, dish: { info: { price, defaultPrice,id } } }) => (
                                            <div key={id} className='min-w-[290px] h-[298px] relative '>
                                                <img className='w-full h-full ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" />
                                                <div className='absolute bottom-2 w-full flex justify-between px-4 ' >
                                                    <p className='text-white font-semibold pt-2 '>₹ {defaultPrice / 100 || price / 100}</p>
                                                    <button className='bg-white  text-lg font-bold border text-green-600 rounded-xl px-10 py-2 drop-shadow-sm '>ADD</button>

                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                        }

                        <div>
                            {
                                menudata.map(({ card: { card } },i) => (


                                    <MenuCard key={i} card={card} resinfo={resinfo} />
                                ))
                            }
                        </div>
                    </div>
                     : <Menushimmer />
            }



        </div>
    );
}
function MenuCard({ card, resinfo }) {
    let drop = true
    if (!card["@type"]) {
        drop = false
    }
    const [isopen, setIsopen] = useState(drop)
    function togglefun(i) {
        setIsopen((prev) => !prev)
    }
    if (card.itemCards) {

        const { title, itemCards } = card
        return (
            <>
                <div className='mt-4 '>
                    <div className='flex justify-between '>
                        <h1 className={'font-bold text-' + (card["@type"] ? "xl" : "base")}>{title}({itemCards.length})</h1>

                        <i
                            className={"fi text-2xl fi-br-angle-small-" + (isopen ? "up" : "down")} onClick={() => togglefun()}></i>
                    </div>
                    {
                        isopen &&
                        <DetailMenu itemCards={itemCards} resinfo={resinfo} />

                    }
                </div>
                <hr className={' my-5  bg-slate-300  border-' + (card["@type"] ? "8" : "none")} />


            </>
        )
    } else {
        const { title, categories } = card

        return (
            <div >
                <h1 className='font-bold text-lg '> {card.title}</h1>
                {
                    categories.map((data,i) => (
                        <MenuCard key={i} card={data} resinfo={resinfo} />
                    ))
                }
            </div>
        )
    }

}

function DetailMenu({ itemCards, resinfo }) {
    return (
        <div className='my-5 mt-4 '>{
            itemCards.map(({ card: { info } }) => (
                <Detailmenucard key={info.id} info={info} resinfo={resinfo} />
            ))
        } </div>
    )
}


function Detailmenucard({ info, resinfo }) {

    const [ismore, setIsmore] = useState(false)
    const dispatch = useDispatch()
    let trimdes = info?.description ? info.description.substring(0, 135) + "..." : "";
    // const{cartdata,setCartdata}=useContext(Cartcontext)
    const isdiffer = useSelector((state) => state.toogle.isdiffer)



    function handleisdifres() {
        dispatch(isdiffertoggle())

    }
    function handleclearcart() {
        dispatch(clearcart())
        dispatch(addtocart({ info, resinfo }))
        handleisdifres()
    }
    return (
        <  div className='relative ' >
            <div className='  flex   w-full justify-between min-h-[182px]'>

                <div className='w-[55%]  md:w-[70%]'>
                    {/* <p>{console.log(info)}</p> */}

                    <img className='w-4 rounded-sm ' src={(info?.itemAttribute?.vegClassifier === "VEG" ? veg : nonveg)} alt="" />
                    <h2 className='font-bold text-lg text-gray-700 '>{info.name}</h2>
                    <p className='font-semibold'>₹{info.price / 100 || info?.defaultPrice / 100}</p>

                    <div className='flex items-center gap-2 '>
                        <i className="fi fi-ss-star text-green-500 "></i>

                        <span>
                            <span>
                                {info?.ratings?.aggregatedRating?.rating && info?.ratings?.aggregatedRating?.ratingCountV2
                                    ? `${info.ratings.aggregatedRating.rating} (${info.ratings.aggregatedRating.ratingCountV2})`
                                    : null}
                            </span>

                        </span>

                    </div>
                    {info?.description && info?.description.length > 140 ?
                        <div>
                            <span className='font-semibold text-slate-500 line-clamp-2 md:line-clamp-none '>{ismore ? info?.description : trimdes}</span>

                            <button className='hidden md:block   ' onClick={() => setIsmore(!ismore)}>{ismore ? "less " : "more"}</button>
                        </div> : <span className='font-semibold  text-slate-500 '>{info?.description}</span>
                    }

                </div>
                <div className='w-[40%] md:w-[20%] relative h-full  '>
                    <img className='rounded-xl aspect-square object-cover  ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + info?.imageId} alt="" />
                    {/* <button onClick={handleaddtocart} className='bg-white absolute bottom-5  left-1/2 -translate-x-1/2 text-lg font-bold border text-green-600 rounded-xl px-10 py-2 drop-shadow-sm '>ADD</button> */}
                    <Addtocartbtn info={info} resinfo={resinfo} handleisdifres={handleisdifres} />
                </div>
            </div>
            <hr className=' mb-4 mt-5 ' />
            {
                isdiffer && (
                    // <div className='flex items-center pl-32  '>
                    <div className='h-[30%] w-[80%] md:w-[520px] md:h-[195px] border  bg-white z-50  fixed bottom-10  p-8 ml-6  md:ml-32      '>

                        {/* <div className='w-[520px] h-[195px] border bg-white z-50  fixed bottom-10  p-8    '> */}
                        <p className='font-semibold text-xl text-gray-700  '> Items already in cart</p>
                        <p className='text-sm text-slate-500 mt-2 '>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                        <div className='flex justify-between mt-3  '>
                            <button onClick={handleisdifres} className='w-[220px] h-[50px] border-2 border-green-400 text-sm font-semibold  text-green-500 '>NO</button>
                            <button onClick={handleclearcart} className='w-[220px] h-[50px] bg-green-600 text-white font-bold text-md  '>YES,START AFRESH</button>
                        </div>
                    </div>
                    // </div>
                )
            }
        </div>
    )
}

function Discount({ data: { info: { header, offerLogo, couponCode } } }) {
    // console.log(couponCode);
    return (
        <div className='flex gap-2  min-w-[328px] h-[76px] border p-3 rounded-2xl '>
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo} `} alt="" />
            <div>
                <h2 className='font-bold text-xl '>{header}</h2>
                <p className='text-gray-500 '>{couponCode}</p>
            </div>
        </div>
    )
}
export default Resmenu;
