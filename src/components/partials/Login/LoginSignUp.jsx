import React, { useRef, useState } from 'react'
import { auth } from '../../../utils/firebase'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { GoogleLogin, handleButtonClick } from './handleButtonClick';
import { handleLoginPopUp } from '../../../store/reducers/userSlice';

const LoginSignUp = () => {
  const name=useRef(null)
  const email=useRef(null)  
  const password=useRef(null)
  const [showSignUp,setShowSignUp]=useState(true)
  const [ShowPassword,setShowPassword]=useState(false)
  const [showErrorMessage,setshowErrorMessage]=useState(false)
  const [errorMessage,setErrorMessage]=useState({name:'',email:'',password:''})
  const errorClass=`text-lg text-red-700 tracking-wide`;
  const passWordHiddenClass=`absolute cursor-pointer text-white right-0 top-[50%]
                translate-x-[-50%] translate-y-[-50%]`
  
  const dispatch=useDispatch()
  const handleSignUp=()=>{
    setShowSignUp(!showSignUp)
  }
  
  const handleClick=()=>{
    let errors={}
    if(showSignUp && name.current.value.length===0) errors.name='Enter your username'
    if(email.current.value.length===0) errors.email='Enter your email Id'
    if(password.current.value.length<8) errors.password='Password should be of atleast 8 characters long'
    if(password.current.value.length===0) errors.password='Enter your password'
    // console.log(Object.keys(errors).length)
    if(Object.keys(errors).length!==0){
      setErrorMessage(errors)
      return
    }
    handleButtonClick({
      auth,name,email,password,showSignUp,setshowErrorMessage,dispatch
    })
  }
  const PlatformLogin=()=>{
    GoogleLogin({auth,dispatch})
  }
  return (
    <div>
      <button className="font-bold w-8 h-9 text-xl text-red-900 cursor-pointer float-right"
      onClick={()=>dispatch(handleLoginPopUp(false))}>X</button>
      <form className='text-black p-4' onClick={e=>e.preventDefault()}>
        <h3 className={showErrorMessage? errorClass:'hidden'}>
          {
              showSignUp? 'Enter valid email Id and password. Password should be of atleast 8 characters long':
              'Either your email ID or password is incorrect'
          }
        </h3>
        <h2 className="font-semibold text-3xl m-2 mb-4 text-red-500">
          {
            showSignUp? 'Sign Up':'Sign In'
          }
        </h2>
        {
          showSignUp && <input type="text" placeholder="Enter Username" ref={name} 
            className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/>
        }
        {
          showSignUp && errorMessage.name && <p className={errorClass}>{errorMessage.name}</p>
        }
        <input type="email" placeholder="Enter Email ID" ref={email} 
        className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/>
        {
          errorMessage.email && <p className={errorClass}>{errorMessage.email}</p>
        }
        <div className="relative">  
          <input type={ShowPassword? 'text' : 'password'} placeholder="Enter Password" ref={password} 
          className='p-2 m-2 bg-black bg-opacity-10 text-white w-[100%] ml-0'/>
          <span className="relative">
            {
              ShowPassword? (
                <FaEye className={passWordHiddenClass}
                onClick={()=>setShowPassword(!ShowPassword)}/>
              ):(
                <FaEyeSlash className={passWordHiddenClass}
                onClick={()=>setShowPassword(!ShowPassword)}/>
              )
            }
          </span>
          {
            errorMessage.password && <p className={errorClass}>{errorMessage.password}</p>
          }
          
        </div>
        <div className="">
          <button onClick={handleClick}
          className='w-[50%] bg-red-500 rounded font-semibold text-xl p-1 mt-4 mb-4 flex mx-auto justify-center'>
            {
              showSignUp? 'Create Account':'Login'
            }
          </button>
          <div className="flex justify-center text-white flex-col items-center">
            <p className='text-xl text-orange-300'>OR</p>
            <h3 className='font-semibold text-xl p-1 mt-2 mb-2'> 
              { showSignUp? 'Sign up with':'Login with' }
            </h3>
            <div className=" w-9 h-9 rounded-full flex items-center justify-center shadow-custom-inset hover:scale-110 transition-all duration-300"
            onClick={PlatformLogin}>
              <FcGoogle className="text-3xl" />
            </div>
          </div>
        </div>
        <p className='text-white text-lg text-center cursor-pointer pt-3 hover:text-slate-300' 
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