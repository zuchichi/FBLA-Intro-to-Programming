import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import Button from '../Components/Button';
import PetIcon from '../assets/red_panda_personal_icon.png'

// For firebase
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .pet-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .pet-card {
    width: 255px;
    background: #af3535;
    border-radius: 20px;
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pet-top-row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
  }

  .pet-paw-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s;
    flex-shrink: 0;
  }
  .pet-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .pet-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .pet-title {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    flex: 1;
    line-height: 1.3;
  }

  .pet-header {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    flex: 1;
    line-height: 1.3;
  }

  .pet-spacer {
    width: 28px;
    flex-shrink: 0;
  }

  .pet-img-placeholder {
    width: 180px;
    height: 180px;
    background: #ddd;
    border-radius: 14px;
    margin-bottom: 14px;
    cursor: pointer;
    transition: transform 0.12s, filter 0.12s;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
  }
  .pet-img-placeholder:hover {
    transform: scale(1.03);
    filter: brightness(95%);
  }
  .pet-img-placeholder:active {
    transform: scale(0.97);
  }

  .pet-caption {
    font-size: 11px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 14px;
  }
`;

export function Pet() {
  const navigate = useNavigate();

  // I'll configure most of this when I setup the database (will be within the few upcoming days)
  const petName = '(pet-name)';
  const [userData, setUserData] = useState(null);
  const petPronoun = '(pronoun)';
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, []);

  const handlePet = () => {
    
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pet-page">
        <div className="pet-card">

          {/* Top row */}
          <div className="pet-top-row">
            <button className="pet-paw-btn" onClick={() => navigate('/petstats')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="pet-title">Say hi to {userData?.petName}!</div>
            <div className="pet-spacer" />
          </div>

          {/* Pet image placeholder, I'll replace with an actual sprite when I find one./}
          <div className="pet-img-placeholder" onClick={handlePet} />

          {/* Caption */}
          <div className="pet-caption">
            Click on {userData?.petName} to pet them!
            <img src={PetIcon} alt="Pet-Icon" onClick={() => setClicks(prev => prev + 1)}/>
          </div>

          {/* Button */}
          <Button
            onClick={() => navigate('/home')}
            style={{ fontSize: '11px', padding: '5px 20px' }}
          >
            Go to Home
          </Button>
          <div className="pet-header">
            You have pet {userData?.petName} {clicks} times!
          </div>

        </div>
      </div>
    </>
  );
}