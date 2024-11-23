import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../components/Navbar/navbar.css'
import Logo from '../../assets/codewarslogo.png'
import { CgProfile } from "react-icons/cg";
import './home.css'
import axios from 'axios';

const Home = ({ setCanAccessProtectedPage }) => {

  const navigate = useNavigate(); 

  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up
  const [difficulty, setDifficulty] = useState('easy'); // State to manage selected difficulty level

  const userName = localStorage.getItem('loggedInUser');
  const email = localStorage.getItem('emailID');

  const handleButtonClick = () => {
    setShowPopup(true); // Show the pop-up when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the pop-up
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value); // Update selected difficulty
  };

  const handleStartWar = async () => {
    setCanAccessProtectedPage(true);
    setLoading(true);
  
    try {
      const userDetails = {
        name: userName,
        email: email,
        difficulty, // Pass the selected difficulty
        matchID: generateMatchID(),
      };
  
      // Call the backend API to add the user to the "waiting" collection
      const response = await axios.post('http://localhost:8080/waiting/add', userDetails);
  
      if (response.data.matchFound) {
        console.log('Match found!', response.data.matchDetails);
        // Navigate to the match if found, or show a waiting screen
        navigate('/singlecombat');
      } else {
        console.log(response.data.message);
        // Maybe show a waiting message or refresh to try again
      }
    } catch (error) {
      console.error('Failed to add user to waiting list:', error);
    } finally {
      setLoading(false);
      handleClosePopup();
    }
  };

  const generateMatchID = () => {
    return `match_${Date.now()}`; // Simple example to generate a unique match ID
  };

  return (
    
    <>
    <div className='container'>
      <div className='navbar'>
        <img src={Logo} alt="" height={60} className='img-logo'/>
        <div className='lists'>
          <ul className='unordered-list'>
              <li className='link'>{userName}</li>
              <CgProfile size={25} onFocus={'profile'}/>
          </ul>
        </div>
      </div>

      <div className='wrapper'>
        <div className='war-type-wrapper'>
        <h1 className='headings'>Select War Type.</h1>
          <div className='1v1'>
            <button className='btn-type' onClick={handleButtonClick}>Single Combat</button>
          </div>
          <div className='2v2'>
            <button className='btn-type'>2v2 Relay War</button>
          </div>
          <div className='4v4'>
            <button className='btn-type'>4v4 Relay War</button>
          </div>
        </div>
          <div className='create-war-zone-wrapper'>
            {/* COMPONENT RENDER */}
          </div>
          <div className='join-war-zone-wrapper'>
            {/* COMPONENT RENDER */}
          </div>
      </div>
      {showPopup && (
          <div className='popup-overlay'>
            <div className='popup-card'>
              <h2>Select Difficulty</h2>
              <select value={difficulty} onChange={handleDifficultyChange} className='difficulty-select'>
                <option value="easy" className='easy'>Easy (50 pts)</option>
                <option value="medium" className='medium'>Medium (100 pts)</option>
                <option value="hard" className='hard'>Hard (150 pts)</option>
              </select>
              <div className='instructions'>
                <h1 className='heading-1'>Instructions : </h1>
                <p><span>Choose Difficulty:</span> Select from Easy (15 mins), Medium (25 mins), or Hard (35 mins).</p>
                <p><span>Start Match:</span> Click "Play" to find an opponent. The server matches you with another coder at the same difficulty level.</p> 
                <p><span>Solve the Challenge:</span> A random coding problem appears. Complete it within the time limit. The first to solve it correctly wins.</p>
                <p><span>Incomplete Challenges:</span>
                    <ul>
                      <li><span>Most Progress Wins:</span> Player with the most test cases passed.</li>
                      <li><span>Draw:</span> If both have equal progress, the match is a draw.</li>
                      </ul>
                    </p>
              </div>
              <button className='start-war-btn' onClick={handleStartWar}>Start War</button>
              <button className='close-btn' onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home