import React from 'react'
import './navbar.css'
import Logo from '../../assets/codewarslogo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={Logo} alt="" height={60} className='img-logo'/>
        <div className='lists'>
            <ul className='unordered-list'>
                <li className='link'>Explore</li>
                <li className='link'>About us</li>
                <li className='link'>Contact</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar