import { signInWithEmailLink, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/FirebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { adduser, removeuser } from '../utils/auth'
import { Await, Navigate, useNavigate } from 'react-router-dom'

function SignIn() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const userdata =useSelector((state)=>state.authslice.userdata)
  async function handleAuth() {
    let data = await signInWithPopup(auth, provider)
    // console.log(data)
    const userdata = {
      name: data.user.displayName,
      photo: data.user.photoURL
    }
    dispatch(adduser(userdata))
    Navigate("/")
  }
  async function handlelogout() {
    await signOut(auth)
    dispatch(removeuser())
  }
  return (
    <div>
      <div>
        google
        <button onClick={handleAuth} className='text-slate-500 text-lg font-semibold bg-blue-300 m-6 '>
          google login
        </button>
        { userdata  ?
        <button onClick={handlelogout} className='text-slate-500 text-lg font-semibold bg-blue-300 m-6 '>
          log out
        </button>: <p></p>
}

      </div>
    </div>
  )
}

export default SignIn
