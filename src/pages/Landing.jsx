import React, { useEffect, useRef } from 'react';
import './landing.css';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Navbar/Navbar';
import AboutImg1 from '../assets/challenge.png';
import AboutImg2 from '../assets/compete.png';
import AboutImg3 from '../assets/colaborate.png';
import AboutImg4 from '../assets/char.png';
import Footer from '../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';


const Landing = () => {
  const navigate = useNavigate();

  const toSignup = () => {
    navigate('/signup');
  }

  const toSignin = () => {
    navigate('./signin');
  }

  // Scroll animation ref
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    aboutSectionRef.current.querySelectorAll('.section-animation').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='welcome-page'>
          <div className='headings-left'>
            <h1 className='welcome slide-in-left'>Welcome</h1>
            <h3 className='codewars fade-in'>to code wars</h3>
          </div>
          <div className='headings-right'>
            <div className="typewriting fade-in">
              <Typewriter
                words={['Code', 'Compete', 'Conquer']}
                cursor
                loop
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
                className='texts'
              />
            </div>
            <p className="writing fade-in">
              At CODE WARS, we bring together coders from around the globe to compete in thrilling real-time coding challenges. Join us to test your skills, learn from others, and emerge victorious!
            </p>
            <h1 className='get-started fade-in'>Get Started Today!</h1>
            <h5 className='join-details fade-in'>Sign up and Join the battle. <br /> Code your way to victory. <br /> Welcome to <span>CODE WARS!</span></h5>
            <div className='btns-div fade-in'>
              <button className='btn signup' onClick={toSignup}>Sign up</button>
              <button className='btn signin' onClick={toSignin}>Sign in</button>
            </div>
          </div>
        </div>
        <div className='more-about' ref={aboutSectionRef}>
          <h1 className='get-started section-animation'>About the page.</h1>
          <div className='about-1 section-animation'>
            <div className='random-div'>
              <img src={AboutImg1} alt="" height={125} className='about-img'/>
            </div>
            <div className='random-div-2'>
              <p className='writing-2'>Take on a variety of coding challenges spanning different difficulty levels and programming languages. From algorithmic puzzles to real-world projects, there's something for everyone.</p>
            </div>
          </div>
          <hr />
          <div className='about-1 section-animation'>
            <div className='random-div-2'>
              <p className='writing-2'>Experience the adrenaline rush of coding battles as you face off against other programmers in live challenges.</p>
            </div>
            <div className='random-div'>
              <img src={AboutImg2} alt="" height={125} className='about-img'/>
            </div>
          </div>
          <hr />
          <div className='about-1 section-animation'>
            <div className='random-div'>
              <img src={AboutImg3} alt="" height={125} className='about-img'/>
            </div>
            <div className='random-div-2'>
              <p className='writing-2'>Team up with friends in 2v2 or 4v4 challenges. Collaborate and expand your coding horizons.</p>
            </div>
          </div>
          <hr />
          <div className='about-1 section-animation'>
            <div className='random-div-2'>
              <p className='writing-2'>Monitor your performance, track your rankings, and earn badges and achievements.</p>
            </div>
            <div className='random-div'>
              <img src={AboutImg4} alt="" height={125} className='about-img'/>
            </div>
          </div>
          <hr />
          <div className='footer section-animation'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing;
