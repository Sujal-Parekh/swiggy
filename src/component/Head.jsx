
import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logintoggle, stoogle } from '../utils/toogleslice'
import { setCoordinates } from '../utils/coordslice'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../config/FirebaseAuth'

import { adduser, removeuser } from '../utils/auth'

function Head() {

    const [address, setAddress] = useState("")
    const [searchresult, setSearchresult] = useState([])
    //access data from redux store
    const visible = useSelector((state) => state.toogle.searchtoggle)
    const loginvisible = useSelector((state) => state.toogle.logintoggle)

    const dispatch = useDispatch()
    const cartdata = useSelector((state) => state.cartslice.cartitems)
    const userdata = useSelector((state) => state.authslice.userdata)

    const Navigate = useNavigate()
    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        // console.log(data)
        const userdata = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(adduser(userdata))
        dispatch(logintoggle())

        Navigate("/")
    }
    function searchfunc() {
        dispatch(stoogle())

    }

    function handlevisible() {
        dispatch(stoogle())

    }
    function handlesignin() {

        dispatch(logintoggle())

    }
    function handlelogin(){

        dispatch(logintoggle())

    }
    async function handlelogout() {
        await signOut(auth)
        dispatch(removeuser())
        dispatch(logintoggle())

    }

    async function searchresultfun(val) {
        if (val == "") return
        //  console.log(val)
        // const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`));
        const response =await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`)
        const res = await response.json();
        // const res = JSON.parse(result.contents);
        setSearchresult(res.data)
        // console.log(res.data );
    }

    async function fetchlatandLang(id) {
        if (id == "") return
        handlevisible()
        // const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`));
       const response =await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
        const res = await response.json();
        // const res = JSON.parse(result.contents);
        // setCordi({
        //     lat: res.data[0].geometry.location.lat,
        //     lng: res.data[0].geometry.location.lng
        // })
        dispatch(setCoordinates({
            lat: res.data[0].geometry.location.lat,
            lng: res.data[0].geometry.location.lng

        }))
        setAddress(res.data[0].formatted_address)

    }

    const navitems = [
        // {
        //     name: "Swiggy corporation",
        //     Image: <i className="fi fi-rs-briefcase"></i>,
        //     path: " /corporation "
        // },
        {
            name: "Search",
            Image: <i className="fi fi-br-search"></i>,
            path: "/Search"

        },
        // {
        //     name: "Offer",
        //     Image: <i className="fi fi-rr-badge-percent"></i>,
        //     path: "/Offer"
        // },
        // {
        //     name: "Help",
        //     Image: <i className="fi fi-rs-life-ring"></i>,
        //     path: "/Help"
        // },
        {
            name: "Sign in",
            Image: <i className="fi fi-rs-user"></i>,
            path: "/Signin"
        },
        {
            name: "Cart",
            Image: <i className="fi fi-sr-dolly-flatbed-alt"></i>,
            path: "/Cart"
        }
    ]
    return (
        <>
        {/* this is for search result function  */}
            <div className='w-full '>
                <div onClick={handlevisible} className={'w-full bg-black/50 z-30 h-full absolute ' + (visible ? "visible" : "invisible")}></div>
                <div className={'bg-white flex justify-center w-full   md:w-[35%] h-full z-40 absolute duration-500  ' + (visible ? "left-0" : "-left-[100%]")}>
                    <div className='flex flex-col gap-7 mt-10   w-[60%] mr-6  '>
                        <i className="fi fi-sr-cross" onClick={handlevisible} ></i>

                        {/* <input type="text" placeholder='search for area, street name..' className='border-shadow border items-center font-semibold p-3 focus:outline-none focus:shadow-lg  shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1),4px_0_6px_rgba(0,0,0,0.1),-4px_0_6px_rgba(0,0,0,0.1)]' onChange={(e) => { searchresultfun(e.target.value) }} /> */}
                        <input type="text" placeholder='search for area, street name..' className='border-shadow border items-center p-3  focus:outline-none focus:shadow-lg font-semibold ' onChange={(e) => { searchresultfun(e.target.value) }} />
                        <div className=''>
                            <ul className='w-full  cursor-pointer '>
                                {
                                    searchresult.map((data, index) => {
                                        const islast = (index === searchresult.length - 1)
                                        return (
                                            <div className=' my-5 ' key={index} >
                                                <div className='flex gap-2 mt-1 '>
                                                    <i className="fi fi-tr-map-marker-check mt-1 "></i>
                                                    <li className='' onClick={() => { fetchlatandLang(data.place_id) }}>
                                                        <p className=' text-md font-semibold hover:text-orange-500  '>
                                                            {data.structured_formatting.main_text}</p>
                                                        <p className='text-sm text-slate-600 ' >
                                                            {data.structured_formatting.secondary_text}</p>
                                                        {!islast &&
                                                            <p className='opacity-35 '>-------------------------------------------</p>
                                                        }
                                                    </li>
                                                </div>

                                            </div>

                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

{/* this is for signin */}
            <div className='w-full  '>
                <div onClick={handlesignin} className={'w-full bg-[#686b78]/60 z-30 h-full absolute ' + (loginvisible ? "visible" : "invisible")}></div>
                <div className={'bg-white flex justify-center  w-full  md:w-[35%] h-full z-40 fixed duration-500  ' + (loginvisible ? "right-0" : "-right-[100%]")}>
                    <div className='flex flex-col gap-7 mt-6 p-3 ml-9  w-[95%]   '>
                        <i className="fi fi-sr-cross" onClick={handlesignin} ></i>

                        <div className='flex justify-between    w-[80%] '>
                            <div className='flex flex-col      '>
                                <h2 className='font-semibold text-3xl text-slate-800 mt-4 '>
                                    Login
                                </h2>
                                <p className='mt-2 text-orange-500 text-sm  font-semibold  '><span className='text-black '>or</span> create an account</p>
                                <div className='w-10 h-[2px] mt-5  bg-slate-950 '></div>
                            </div>
                            <div className=' flex '>
                                <img className='w-28 h-28   ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                            </div>

                        </div>
                        <div>

                            {userdata ?
                                <button onClick={handlelogout} className=' w-[80%] text-white bg-[#fc8019] p-2 font-semibold text-lg '>
                                    Log Out
                                </button> : <button onClick={handleAuth} className=' w-[80%] text-white bg-[#fc8019] p-2 font-semibold text-lg '>
                                    Login With Google
                                </button>
                            }
                            <p className='w-[80%] text-sm mt-1  text-[#7d8ca8] font-semibold  '>By clicking on Login, I accept the  <span className='text-black '> Terms & Conditions & Privacy Policy</span></p>
                        </div>
                    </div>

                </div>
            </div>


            <div className='relative w-full '>
                <div className='w-full  sticky top-0   bg-white shadow-md  h-24 z-20 flex justify-center items-center '>

                    <div className='w-full  md:w-[95%]   flex justify-between hover:bg-[]  '>
                        <div className=' flex items-center'>
                            <Link to={"/"}>
                            <div className='w-24' >
                                <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
                           </div>
                            </Link>
                            <div className='flex items-center gap-2 cursor-pointer ' onClick={searchfunc}>
                                <p className='flex items-center '>
                                    <span className='font-bold border-b-2 border-black'>other</span>
                                    <span className='ml-1  max-w-[250] text-sm opacity-85 line-clamp-1  '>{address}</span></p>
                                <i className="fi mt-2 text-2xl text-orange-500 fi-rs-angle-small-down"></i>
                            </div>
                        </div>

                        <div className=' items-center hidden  md:flex gap-2 md:gap-14  cursor-pointer mr-16 ' >
                            {
                                navitems.map((data) => (
                                        data.name=="Sign in" ?
                                    
                                        <div  onClick={handlelogin} key={data.path}>
                                        <div className='flex item-center  gap-2'>
                                            {  
                                            userdata ?  
                                            <img className="w-10 h-10 rounded-full "src={userdata.photo} alt=""/>  :
                                            <p className='mt-1  text-gray-700 '>{data.Image}</p>

                                            }

                                            <p className='text-md flex items-center font-medium text-gray-700'>{userdata  ? userdata.name :data.name}</p>
                                            
                                            {data.name === "Cart" && 
                                            <p>{cartdata.length}</p>
                                            }
                                        </div>
                                        </div>
                                    :
                                    <Link to={data.path} key={data.path}>

                                    <div className='flex justify-between  gap-2 '>
                                        <p className='mt-1  text-gray-700 '>{data.Image}</p>
                                        <p className='text-md flex items-center font-medium text-gray-700'>{data.name}</p>
                                        {data.name === "Cart" && 
                                        <p>{cartdata.length}</p>
                                        }
                                    </div>
                                    </Link>
                                ))
                                
                            }
                           

                        </div>
                        
                        <div className='flex gap-7 md:hidden mt-5  '>
                        {
                            navitems.map((data)=>(

                                data.name=="Sign in" ?
                                    <div onClick={handlelogin} key={data.path} >
                                    <div className=" flex item-center  gap-2 mr-4  " > 
                                    <p className='mt-1  text-gray-700 '>{data.Image}</p>
                                    </div>
                                    </div>
                                :                             
                                <Link to={data.path} key={data.path} >
                                <div className=" flex item-center  gap-2 mr-4  " > 
                                <p className='mt-1  text-gray-700 '>{data.Image}</p>
                                </div>
                                </Link>
                            ))
                        }
                    </div>
                    </div>
                   
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Head
