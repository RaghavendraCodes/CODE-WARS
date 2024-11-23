import React, { useState } from 'react'
import MainLogo from '../../assets/codewarslogo.png'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast' 
//import { handleError } from '../../utils'

const Signup = () => {
    
    // navigate.
    const navigate = useNavigate();

    // navigates the pages.
    const toSignin = () => {
        navigate('/signin')
    }

    // use states for state management of input values from form. 
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      cpassword: '',
    });

  const onChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target; 
    console.log(name, value);
    const copyinfo = {...formData}; 
    copyinfo[name] = value; 
    setFormData(copyinfo); 
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {username, email, password, cpassword} = formData; 
    if(!username || !email || !password || !cpassword) {
      return toast.error('All fields are required.');
    }
    if (password !== cpassword) {
      return toast.error('Passwords do not match.');
    }
    try {
      const url = "http://localhost:8080/auth/signup"; 
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(formData)
      });
      const result = await response.json(); 
      console.log(result);

      if (response.status === 201) {
        toast.success('Signup successful! Please login.');
        setFormData({ username: '', email: '', password: '', cpassword: '' });
        navigate('/signin');
      } else if (response.status === 409) { // Check for "User already exists" response
        toast.error(result.message); // Show error toast with the backend message
      } else {
        toast.error(result.message || 'Signup failed. Please try again.');
      }
      
    } catch (err) {
      console.error(err.response.data); // Handle error
    }
  };

  return (
    <div className='homePageWrapper'>
        
      <div className='formWrapper'>
        <div className='imagedesign'>
        <img src={MainLogo} alt="" width={200}/>
        </div>
        <h2 className='main-label'>Sign up</h2>
        <form className='input-group' onSubmit={handleSignup} id='signup'>
          <input 
            type="text" 
            className='input-box' 
            placeholder='username' 
            name="username"
            value={formData.username}
            onChange={onChange}
            //required
            />
          <input 
            type="email" 
            name='email'
            className='input-box' 
            placeholder='Email ID' 
            value={formData.email}
            onChange={onChange}
            //required
            />
          <input 
            type="password" 
            name='password'
            className='input-box' 
            placeholder='password'
            value={formData.password}
            onChange={onChange}
            //required
            />
          <input 
            type="password" 
            name='cpassword'
            className='input-box' 
            placeholder='confirm password'
            value={formData.cpassword}
            onChange={onChange}
            //required
            />

        <div className='btn-class'>
        <button className='btn joinbtn' type='submit'>Sign up</button>
        </div>
        <div className='create-info'>
        <p className='create-info-more'>already have an account ? &nbsp;
          <a href="" className='create-new-btn' onClick={toSignin}>Sign in</a>
        </p>
        <Toaster position="top-right" /> {/* Add ToastContainer */}
        </div>
        </form>
      </div>
      </div>
  )
}

export default Signup;