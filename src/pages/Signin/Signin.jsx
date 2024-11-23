import React, { useState } from 'react'
import MainLogo from '../../assets/codewarslogo.png'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast';

const Signin = () => {

    const [signinInfo, setSigninInfo] = useState({
      email: '', 
      password: ''
    })

    const navigate = useNavigate()

    const toSignup = () => {
        navigate('/signup')
    }

    const handleChange = (e) => {
      const {name, value} = e.target; 
      console.log(name, value);
      const copySignIn = {...signinInfo}; 
      copySignIn[name] = value; 
      setSigninInfo(copySignIn); 
    }

    const handleSignin = async (e) => {
      e.preventDefault();
      const { email, password } = signinInfo;
      if (!email || !password) {
          return toast.error('email and password are required')
      }
      try {
          const url = "http://localhost:8080/auth/signin";
          const response = await fetch(url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(signinInfo)
          });
          const result = await response.json();
          console.log("result : ", result);
          
          const { success, message, jwtToken, name, error } = result;
          if (success) {
              toast.success(message);
              localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
              localStorage.setItem('emailID', email);
              setTimeout(() => {
                  navigate('/home')
              }, 1000)
          } else if (error) {
              const details = error?.details[0].message;
              toast.error(details);
          } else if (!success) {
              toast.error(message);
          }
          console.log(result);
      } catch (err) {
          toast.error(err);
      }
  }

  return (
    <div className='homePageWrapper'>
        
      <div className='formWrapper'>
        <div className='imagedesign'>
        <img src={MainLogo} alt="" width={200}/>
        </div>
        <h2 className='main-label'>Sign up</h2>
        <form className='input-group' onSubmit={handleSignin} id='signup'>
         
          <input 
            type="email" 
            name='email'
            className='input-box' 
            placeholder='Email ID' 
            value={signinInfo.email}
            onChange={handleChange}
            //required
            />
          <input 
            type="password" 
            name='password'
            className='input-box' 
            placeholder='password'
            value={signinInfo.password}
            onChange={handleChange}
            //required
            />
        <div className='btn-class'>
        <button className='btn joinbtn' type='submit'>Sign up</button>
        </div>
        <div className='create-info'>
        <p className='create-info-more'>already have an account ? &nbsp;
          <a href="" className='create-new-btn' onClick={toSignup}>Sign in</a>
        </p>
        <Toaster position="top-right" /> {/* Add ToastContainer */}
        </div>
        </form>
        
      </div>
      
      </div>
  )
}

export default Signin;