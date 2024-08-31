import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from 'firebase/auth'
import { auth } from '../../../utils/firebase'
import { validateUserCredentials } from '../../../utils/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { handleLoginPopUp } from '../../../store/reducers/userSlice';

const LoginSignUp = () => {
  const name=useRef(null)
  const email=useRef(null)
  const password=useRef(null)
  const [showSignUp,setShowSignUp]=useState(true)
  const [ShowPassword,setShowPassword]=useState(false)
  const dispatch=useDispatch()
  const handleSignUp=()=>{
    setShowSignUp(!showSignUp)
  }
  const expirationDate=new Date()
  expirationDate.setDate(expirationDate.getDate()+2)
  const handleButtonClick=()=>{
    const result=validateUserCredentials(email.current.value,password.current.value)
    if(result) return
    
    if(showSignUp)
    {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          // Cookies.set('authToken', token, { expires: 1, secure: true });
          document.cookie=`authToken=${token}; expires=${expirationDate.toUTCString()}; path='/'; Secure`
        });
        updateProfile(user, {
          displayName: name.current.value
        }).then(() => {
          console.log("Reached here")
        }).catch((error) => {
          console.log(error)
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      dispatch(handleLoginPopUp(false))
    }
    else
    {
      console.log(email.current.value," ",password.current.value)
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        user.getIdToken().then((token) => {
          // document.cookie=`authToken=${token}; expires=${expirationDate.toUTCString()}; path='/'`
          document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; Secure`;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
      dispatch(handleLoginPopUp(false))
    }
  }
  return (
    <div>
      <button className="font-bold w-7 h-7 text-xl text-red-900 cursor-pointer float-right"
      onClick={()=>dispatch(handleLoginPopUp(false))}>X</button>
      <form className='text-black p-4' onClick={e=>e.preventDefault()}>
        <h2 className="font-semibold text-3xl m-2 text-red-500">
          {
            showSignUp? 'Sign Up':'Sign In'
          }
        </h2>
        {
          showSignUp && <input type="text" placeholder="Enter Username" ref={name} 
            className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/> 
        }
        <input type="email" placeholder="Enter Email ID" ref={email} 
        className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/>
        <div className="relative">  
          <input type={ShowPassword? 'text' : 'password'} placeholder="Enter Password" ref={password} 
          className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/>
          {
            ShowPassword? (
              <FaEye className='absolute cursor-pointer text-white right-0 top-[50%]
              translate-x-[-50%] translate-y-[-50%]'
              onClick={()=>setShowPassword(!ShowPassword)}/>
            ):(
              <FaEyeSlash className='absolute cursor-pointer text-white right-0 top-[50%]
              translate-x-[-50%] translate-y-[-50%]'
              onClick={()=>setShowPassword(!ShowPassword)}/>
            )
          }
        </div>
        <button onClick={handleButtonClick}
        className='w-[50%] bg-red-500 rounded font-semibold text-xl p-1 mt-4 mb-4 flex mx-auto justify-center'>
          {
            showSignUp? 'Create Account':'Login'
          }
        </button>
        <p className='text-white text-lg text-center cursor-pointer pt-5 hover:text-slate-300' 
        onClick={handleSignUp}>
          {
            showSignUp?  'Already have an account? login into your existing account':'Don\'t have an account yet? Sign Up to create a new account'
          }
        </p>

      </form>
    </div>
  )
}

export default LoginSignUp