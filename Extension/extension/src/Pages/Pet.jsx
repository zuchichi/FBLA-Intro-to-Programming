import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import Button from '../Components/Button';
import PetIcon from '../assets/red_panda_personal_icon.png'
import BambooIcon from '../assets/bamboo.png';

// For firebase
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
// Adding some variables for the feed cost and hunger decrease
const FEED_COST = 5;
const HUNGER_DECREASE = 10;

export function Pet() {
  const navigate = useNavigate();

  // I'll configure most of this when I setup the database (will be within the few upcoming days)
  const petName = '(pet-name)';
  const [userData, setUserData] = useState(null);
  const petPronoun = '(pronoun)';
  const [clicks, setClicks] = useState(0);
  const [rewardMsg, setRewardMsg] = useState('');
  const [feedMsg, setFeedMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, []);

  /* Set up an award system for the pet and you can get some certain rewards*/
  const handlePet = async () => {
    setClicks(prev => prev + 1);

    // 30% chance of reward
    if (Math.random() < 0.3) {
      const user = auth.currentUser;
      if (!user) return;

      // Randomly give either apples or bamboo
      const rewardType = Math.random() < 0.25 ? 'apples' : 'bamboo';
      const rewardAmount = Math.floor(Math.random() * 15) + 1; // 1-10

      const current = userData?.[rewardType] ?? 0;
      const updates = { [rewardType]: current + rewardAmount };

      await updateDoc(doc(db, "users", user.uid), updates);
      setUserData(prev => ({ ...prev, ...updates }));
      setRewardMsg(`${userData?.petName} dropped ${rewardAmount} ${rewardType}!`);
      setTimeout(() => setRewardMsg(''), 3000);
  }
  };

  /* Feed pet costs 5 bamboo and reduces pet hunger by 10 */
  const feedPet = async () => {
    const user = auth.currentUser;
    if (!user) return;
 
    const currentBamboo = userData?.bamboo ?? 0;
    const currentHunger = userData?.petHunger ?? 0;
 
    if (currentBamboo < FEED_COST) {
      setFeedMsg(`Not enough bamboo! You need ${FEED_COST} bamboo to feed ${userData?.petName}.`);
      setTimeout(() => setFeedMsg(''), 3000);
      return;
    }
 
    if (currentHunger === 0) {
      setFeedMsg(`${userData?.petName} is already full!`);
      setTimeout(() => setFeedMsg(''), 3000);
      return;
    }
 
    const updates = {
      bamboo: currentBamboo - FEED_COST,
      petHunger: Math.max(0, currentHunger - HUNGER_DECREASE),
    };
 
    await updateDoc(doc(db, "users", user.uid), updates);
    setUserData(prev => ({ ...prev, ...updates }));
    setFeedMsg(`You fed ${userData?.petName} some bamboo! (-${FEED_COST} bamboo)`);
    setTimeout(() => setFeedMsg(''), 3000);
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

          {rewardMsg && (
            <div style={{ color: '#fff', fontSize: '11px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>
              {rewardMsg}
            </div>
          )}
          {/* Pet image placeholder, I'll replace with an actual sprite when I find one./}

          {/* Caption */}
          <div className="pet-caption">
            Click on {userData?.petName} to pet them!
            <img src={PetIcon} alt="Pet-Icon" onClick={(handlePet)}/>
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

          <div className="pet-header">
            <br/>
            Pet Stats:
          </div>
          <div className="pet-caption">
            { /* There's gonna be a lottt of breaks here because I'm lazy so */}

            Pet's Hunger: {userData?.petHunger}
            <br/>
            Pet's Cleanliness: {userData?.petCleanliness}
            <br/>
            Pet's Health: {userData?.petHealth}
            <br/>
            Pet's Energy: {userData?.petHealth}
            <br/>
            <br/>
          </div>
          <div className="pet-header"> User Stats </div>
          
          <div className="pet-caption">
            Bamboo: {userData?.bamboo}
            <br/>
            Apples: {userData?.apples}
          </div>



          <Button 
            onClick={(feedPet)}
            style={{ fontSize: '11px', padding: '5px 20px' }}
            >
            Feed your pet by giving it some bamboo! ({FEED_COST} bamboo)
          </Button>
          
                    <Button 
            onClick={() => navigate('/marketplace')}
            style={{ fontSize: '11px', padding: '5px 20px' }}
            >
            To clean your pet, go buy something from the marketplace!
          </Button>

                    <Button 
            onClick={() => navigate('/marketplace')}
            style={{ fontSize: '11px', padding: '5px 20px' }}
            >
            To heal your pet, go buy a bandaid from the marketplace!
          </Button>

          <div className="pet-caption">
            You should try petting your pet a lot! Sometimes you'll get rewards!
          </div>
        </div>
      </div>
    </>
  );
}