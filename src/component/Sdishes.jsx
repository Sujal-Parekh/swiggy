import React from 'react'
import { nonveg, veg } from '../utils/links'
import Addtocartbtn from './Addtocartbtn'
import { useDispatch, useSelector } from 'react-redux'
import { isdiffertoggle,  resetsimilarresdish,  setsimilarresdish } from '../utils/toogleslice'
import { addtocart, clearcart } from '../utils/cartslice'
import { Link } from 'react-router-dom'

function Sdishes({
    data: {
        info,
        restaurant: { info: resinfo },
        hideRestaurantDetails = false
    }
}) {



    let { name, imageId = "", price, isVeg = 0 ,id : itemid } = info
    let { id , name: resname, avgRating, sla: { slaString },slugs:{city,restaurant:reslocation } } = resinfo
    function handleisdifres() {
        dispatch(isdiffertoggle())
    }
    function handleclearcart() {
        dispatch(clearcart())
        // dispatch(addtocart({ info, resinfo }))
        handleisdifres()
    }
    const { id: resid } = useSelector((state) => state.cartslice.resinfo)
    const dispatch = useDispatch()
    const isdiffer = useSelector((state) => state.toogle.isdiffer)

    function handleresitem() {
        if (resid == id || !resid) {
            dispatch(resetsimilarresdish())
            dispatch(setsimilarresdish({
                issimilarresdishes:true,
                city,
                reslocation,
                resid:id,
                itemid
              
                }))
        }
    }
    return (
        <>


            <div className='m-2  bg-white  rounded-xl p-3 mt-4   '>

                {
                    !hideRestaurantDetails && (
                        <>
                        <Link to={`/menu/${reslocation}-${id}`}>
                            <div className='flex justify-between opacity-60 text-sm '>

                                <div className=' '>
                                    <p className='font-bold  '>By {resname}</p>


                                    <div className='flex my-1 '>
                                        <i className="fi fi-ss-star text-[#7e808c] text-bold  "></i>
                                        <p> {avgRating} . {slaString}</p>

                                    </div>
                                </div>

                                <div className='mt-3 '>
                                    <i className="fi fi-rs-arrow-right text-xl  "></i>
                                </div>
                            </div>
                            </Link>
                            <hr className=' border-dotted ' />
                        </>
                    )}
                <div className=' my-3 md:max-w-fit flex justify-between gap-10 '>
                    <div className=' w-[50%] md:w-[50%] mt-6   '>
                        <div className='w-5 h-5 '>
                            {
                                isVeg ? <img src={veg} alt="" /> : <img src={nonveg} alt="" />
                            }
                        </div>
                        <p className='text-slate-800 text-lg font-semibold '>{name}</p>
                        <p className='text-slate-800 text-md  font-semibold  '>₹{price / 100}</p>
                        <div>
                            <p> <button className=' rounded-3xl text-[#696d70] py-1 px-4 text-sm mt-2  border '>More Details <i className="fi fi-rr-angle-right text-sm mt-3   "></i>   </button>
                            </p>
                        </div>
                    </div>
                    <div className='w-[40%] md:w-[40%] relative h-full mb-4 mt-3  '>
                        {imageId &&
                            <img className='rounded-xl object-cover aspect-square ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`} alt="" />
                        }
                        <div onClick={handleresitem}>
                            <Addtocartbtn info={info} resinfo={resinfo}
                                handleisdifres={handleisdifres}
                            />
                        </div>


                    </div>
                </div>
            </div>
            { 
                isdiffer &&
                <div className='h-[30%] w-[80%] md:w-[520px] md:h-[195px] border  bg-white z-50  fixed bottom-10  p-8 ml-6  md:ml-32      '>
                    <p className='font-semibold text-xl text-gray-700  '> Items already in cart</p>
                    <p className='text-sm text-slate-500 mt-2 '>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className='flex justify-between mt-3  '>
                        <button onClick={handleisdifres} className='w-[220px] h-[50px] border-2 border-green-400 text-sm font-semibold  text-green-500 '>NO</button>
                        <button onClick={handleclearcart} className='w-[220px] h-[50px] bg-green-600 text-white font-bold text-md  '>YES,START AFRESH</button>
                    </div>
                </div>
            }
        </>

    )
}

export default Sdishes