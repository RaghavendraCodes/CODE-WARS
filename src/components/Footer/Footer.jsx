import React from 'react'
import './footer.css'
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
        <div className='linkss'>
        <div className="sides">
                <div className="links">About us</div>
                <div className="links">Contact us</div>
                <div className="links">Privacy policy</div>
                <div className="links">Our services</div>
        </div>
        <div className="sides">
                <div className="links">FAQ</div>
                <div className="links">Blog</div>
                <div className="links">Careers</div>
                <div className="links">Support</div>
        </div>
        <div className="sides">
                <div className="links">Community Guidelines</div>
                <div className="links">Feedback</div>
                <div className="links">Developer API</div>
                <div className="links">Resources</div>
        </div>
        <div className="sides">
                <div className="links">Documentation</div>
                <div className="links">Report a Bug</div>
                <div className="links">Partner Programs</div>
                <div className="links">Affiliate Program</div>
        </div>
        </div>
        <div className='social-medias'>
                <div className="medias-1"><FaInstagram/></div>
                <div className="medias-2"><FaYoutube/></div>
                <div className="medias-3"><FaTwitter/></div>
                <div className="medias-4"><FaFacebook/></div>
        </div>
        <div className='copyright'>
                <p className='cp-1'>copyright © <span>@codewars</span></p>
        </div>
    </div>
  )
}

export default Footer