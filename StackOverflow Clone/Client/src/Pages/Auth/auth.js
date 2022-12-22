import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import icon from '../../assets/icon.png'
import './auth.css'
import AboutAuth from './aboutAuth'
import {signup , login} from '../../actions/auth'


const Auth = () => {
  const [isSignup , setSignup ] = useState(false);
  const [email , setemail] = useState('');
  const [name , setname] = useState('');
  const [password , setpassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const Handleclick = () => 
  {
    setSignup(!isSignup);
  }

  const Handlesumbit = (e) => {
    e.preventDefault()
    if(!email && !password){
        alert('Enter email and password')
    }
    if(isSignup){
        if(!name){
            alert("Enter a name to continue")
        }
        dispatch(signup({ name, email, password }, navigate))
    }else{
        dispatch(login({ email, password }, navigate))
    }
}


  return (
    <section className='auth-section' >
      {isSignup && <AboutAuth/> }
    <div className='auth-container-2' >
      {!isSignup && <img src={icon} alt='StackOverFlow' className='login-logo' width={18}></img>}
      <form onSubmit={Handlesumbit}>

      {
        isSignup && (
          <label htmlFor='name'>
          <h4>Display name</h4>
          <input type='text' id='name'  onChange={(e)=>{setname(e.target.value)}}></input>
        </label>
      )}
      <label htmlFor='email'>
         <h4>Email</h4>
         <input type='email' id='email' onChange={(e)=>{setemail(e.target.value)}}></input>
      </label>
      <label htmlFor="password">
          <div style={{display:"flex", justifyContent:"space-between"}}>
              <h4>Password</h4>
              { !isSignup && <p style={{ color: "#007ac6", fontSize:'13px'}}>forgot password?</p> }
          </div>
          <input type="password" name='password' id='password' onChange={(e)=>{setpassword(e.target.value)}}/>
          { isSignup && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> }
      </label>
      {
        isSignup && (
            <label htmlFor='check'>
                <input type="checkbox" id='check'/>
                <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br />product updates, user research invitations,<br />company announcements, and digests.</p>
            </label>
        )
      }
      <button type='submit' className='auth-button' >{ isSignup ? 'Sign-up': 'Log-in'}</button>
      {
        isSignup && (
          <p style={{ color: "#666767", fontSize:"13px"}}>
                  By clicking “Sign up”, you agree to our 
                  <span style={{ color: "#007ac6"}}> terms of<br /> service</span>,
                  <span style={{ color: "#007ac6"}}> privacy policy</span> and 
                  <span style={{ color: "#007ac6"}}> cookie policy</span>
              </p>
          )
        }
      </form>
      <p>
        {isSignup ? "Already have a account" : "Don't have a account"} 
        <button type='button' className='switch-button' onClick={Handleclick} >{!isSignup ? "Sign-Up" : "Log-In"}</button>
      </p>
    </div>
    </section>
  )
}

export default Auth
