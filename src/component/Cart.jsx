import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearcart, deleteitem } from '../utils/cartslice';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

import { logintoggle } from '../utils/toogleslice';
let veg = " https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png "
let nonveg = "https://cdn.vectorstock.com/i/500p/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"

function Cart() {
  // const{cartdata,setCartdata}=useContext(Cartcontext)
  const cartdata = useSelector((state) => state.cartslice.cartitems)
  const resinfo = useSelector((state) => state.cartslice.resinfo)
  const userdata= useSelector((state)=>state.authslice.userdata)
  const navigate= useNavigate()
  // console.log(userdata)
  // console.log("this is real info ", resinfo);
  const dispatch = useDispatch()
  let totalprice = 50;
  for (let i = 0; i < cartdata.length; i++) {
    totalprice = totalprice + cartdata[i].price / 100 || cartdata[i].defaultPrice / 100

  }
//   const navitems = [
//     {
//          name: "Help",
//         Image: <i className="fi fi-rs-life-ring"></i>,
//     },
//     {
//         name: "Sign in",
//         Image: <i className="fi fi-rs-user"></i>,
//     },
   
// ]
  // console.log(cartdata)
 
  function removefromcart(i) {
   
    if (cartdata.length > 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
       
        if (result.isConfirmed) {
          let newArr = [...cartdata]
          newArr.splice(i, 1)
          dispatch(deleteitem(newArr))
          Swal.fire({
            title: "Deleted!",
            text: "Your food item has been deleted.",
            icon: "success"
          });
        }
      });
     
    }
    else {
      handleclearcart()
    }
  }
  function handleclearcart() {
    dispatch(clearcart())
    toast.success("clear the cart")
    
  }
  function handleplaceorder(){
    if(!userdata){
    toast.error("please login first ")
    dispatch(logintoggle())  
    return
    }
    toast.success("food will be placed ")
  }
  if (cartdata.length == 0) {
    return (
      <>
        <div className='w-full '>
          <div className='w-[50%]  mx-auto  flex items-center justify-center flex-col '>
            <img className='w-80 mt-32 ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
            <p className='font-bold  text-gray-500  text-xl '>Your cart is empty</p>
            <p className='text-sm mt-2  text-gray-400 '>You can go to home page to view more restaurants</p>
            <Link to={"/"}>
              <button className='bg-orange-500 mt-2  p-2 pl-3 pr-3 text-white font-semibold  '>     SEE RESTAURANTS NEAR YOU    </button>
            </Link>
          </div>
        </div>

        <div className='w-full   bg-gray-200  min-h-screen mt-24 flex    '>
          <div className='w-[60%]  '>
            <div className='' >
              <div className='  w-[780px] h-[203px] flex   bg-white  ml-32   ransform translate-y-8  p-10 justify-between relative ' >
                <div className='flex flex-col  '>
                  <p>Account</p>
                  <p> To place your order now, log in to your existing account or sign up.</p>
                  <div className='flex gap-4  '>
                    <button className='w-[174px] h-[50px] border  border-green-700 flex flex-col items-center p-1 mt-8   hover:shadow-lg  '>
                      <p className='text-green-400 font-normal text-sm  '>Have an Account? </p>
                      <p className='text-green-500 text-sm font-bold -mt-1 '>LOG IN </p>
                    </button>
                    <button className='w-[174px] h-[50px] bg-green-600 flex flex-col items-center p-1 mt-8   hover:shadow-lg  '>
                      <p className='text-white font-normal text-sm  '>New to Swiggy? </p>
                      <p className=' text-white text-sm font-bold -mt-1 '>SIGN UP </p>
                    </button>
                  </div>

                </div>
                <div>
                  <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="" />
                </div>
                <div className='h-[40px] w-[40px] bg-blue-950 shadow-2xl absolute -left-7 flex items-center justify-center '>
                  <i className="fi fi-rs-user text-white text-xl   "></i>
                </div>


              </div>

              <div className='w-[780px] h-[100px] bg-white mt-12 ml-32 p-9 relative '>
                <p className=' text-xl font-semibold text-gray-500 ' >Delivery address</p>
                <div className='h-[40px] w-[40px] absolute -left-7 top-8 border bg-white  shadow-2xl  flex items-center justify-center '>
                  <i className="fi fi-ts-map-marker-smile text-black text-xl  "></i>
                </div>

              </div>


              <div className='w-[780px] h-[93px] bg-white mt-5 ml-32 p-9 relative '>
                <p className=' text-xl font-semibold text-gray-500 ' >Payment</p>
                <div className='h-[40px] w-[40px] absolute -left-7 top-8 border bg-white  shadow-2xl  flex items-center justify-center '>
                  <i className="fi fi-tr-wallet-arrow  text-black text-xl "></i>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[40%] mt-8  pl-16    ' >
            <h1 className='ml-8 font-semibold text-4xl text-slate-600   '>cart empty</h1>
            <img className='w-[307px] h-[212px] ml-8 mt-11  ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2" alt="" />
           <p className='mt-2 ml-8 text-slate-600'>Good food is always cooking!<br></br> Go ahead, order some yummy<br></br> items from the menu.</p>
          </div>
        </div>
      </>

    )
  }

  
  return (
    <>  
      <div className=' w-full bg-gray-200 min-h-screen  relative   '>
        <div className=' gap-32 lg:gap-20 flex  flex-col  md:flex-row lg:flex-row  ' >
          <div className='w-[80%] lg:w-[70%]   '>
            <div className='' >
              <div className='  w-[80%] md:w-[90%] flex   bg-white  ml-32   ransform translate-y-8  p-10 justify-between relative ' >
                <div className='flex flex-col  '>
                  <p>Account</p>
                  <p> To place your order now, log in to your existing account or sign up.</p>
                  <div className='flex gap-4  '>
                    <button className='w-[80%] md:w-[90%] border  border-green-700 flex flex-col items-center p-1 mt-8   hover:shadow-lg  '>
                      <p className='text-green-400 font-normal text-sm  '>Have an Account? </p>
                      <p className='text-green-500 text-sm font-bold -mt-1 '>LOG IN </p>
                    </button>
                    <button className='w-[80%] md:w-[90%] bg-green-600 flex flex-col items-center p-1 mt-8   hover:shadow-lg  '>
                      <p className='text-white font-normal text-sm  '>New to Swiggy? </p>
                      <p className=' text-white text-sm font-bold -mt-1 '>SIGN UP </p>
                    </button>
                  </div>

                </div>
                <div>
                  <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="" />
                </div>
                <div className='w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-blue-950 shadow-2xl absolute -left-7 flex items-center justify-center '>
                  <i className="fi fi-rs-user text-white text-xl   "></i>
                </div>


              </div>

              <div className='w-[80%] md:w-[90%] bg-white mt-12 ml-32 p-9 relative '>
                <p className=' text-xl font-semibold text-gray-500 ' >Delivery address</p>
                <div className='h-[40px] w-[40px] absolute -left-7 top-8 border bg-white  shadow-2xl  flex items-center justify-center '>
                  <i className="fi fi-ts-map-marker-smile text-black text-xl  "></i>
                </div>

              </div>


              <div className='w-[80%] md:w-[90%] bg-white mt-5 ml-32 p-9 relative '>
                <p className=' text-xl font-semibold text-gray-500 ' >Payment</p>
                <div className='h-[40px] w-[40px] absolute -left-7 top-8 border bg-white  shadow-2xl  flex items-center justify-center '>
                  <i className="fi fi-tr-wallet-arrow  text-black text-xl "></i>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[80%] mx-auto  ml-[68px] lg:w-[25%] lg:mr-24 pr-5 lg:ml-0    '>
            <div className='bg-white mt-8 p-5  '>
              <div className='flex ' >
                {/* <Cart {...info} link={info.link} /> */}
                <Link to={`/menu/${resinfo.id}`}>
                <img className=' w-[50px] h-[50px] mt-1 ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${resinfo?.cloudinaryImageId}`} alt="" />
                </Link>

                <div className=' pl-3 '>
                  <h2>{resinfo.name}</h2>
                  <p className=' font-normal text-sm text-slate-400  ' >{resinfo.areaName}</p>
                  <div className='h-[3px] w-[40px] bg-slate-900 mt-1 '></div>
                </div>
              </div>
              <br></br>
              {
                cartdata.map((data, i) => (
                  <div key={i} className='flex gap-4 justify-between mb-2   items-center   '>

                    <img className='w-4   rounded-sm   ' src={(data?.itemAttribute?.vegClassifier === "VEG" ? veg : nonveg)} alt="" />

                    <h2 className=' text-sm text-slate-600 '>{data.name}</h2>
                    <h2 className=' text-sm font-medium text-slate-700 '>₹{data.price / 100 || data.defaultPrice / 100}</h2>
                    <button onClick={() => removefromcart(i)} className=' text-right text-lg '>
                      <i className="fi fi-rs-trash text-green-400 "></i>

                    </button>


                  </div>
                ))
              }
              <div className='flex justify-between '>
              <button onClick={handleclearcart} className=' '>
                <i className="fi fi-rr-cart-minus text-green-800 text-xl "></i>
              </button>
              <button onClick={handleplaceorder} className=' rounded-xl bg-green-500 text-white font-semibold text-md w-[100px]  h-[35px] '> Place Order</button>
              </div>
              <div className=' p-3 mt-2  text-sm text-slate-500 text-center bg-gray-100  ' >
                any suggestions? we will pass it on...
              </div>
              <p className='mt-2 text-sm font-semibold  ' >Bill Details </p>
              {
                cartdata.map((data, i) => (
                  <div key={i} className='flex justify-between mt-2 '>
                    <p className=' text-slate-500'>items</p>
                    <p className='text-slate-600 '>₹{data.price / 100 || data.defaultPrice / 100}</p>

                  </div>

                  
                ))
              }
              <hr className='border mt-3 ' />
              <div className='flex justify-between mt-2 ' >
                <p className='text-slate-500 '>delivery fee</p>
                <p className='text-slate-600'>₹50</p>
              </div>
              <hr className='border mt-3  ' />
              <div className='flex justify-between mt-4  '>
                <h1 className='text-lg font-semibold '>TO PAY </h1>
                <p className='text-md font-semibold  '>₹{totalprice.toFixed(2)}</p>
              </div>
            </div>

          </div>
          </div>
      </div>
    </>
  )
}

export default Cart
