import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import Button from '../Components/Button';
import PersonalPetIcon from '../assets/red_panda_personal_icon.png';


/* Firebase */
import { auth, db } from "./firebase"; // adjust path
import { doc, getDoc, updateDoc } from "firebase/firestore";

const PERSONALITIES = [
  '',
  '',
  '',
  '',
  '',
  '',
]

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .customize-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .customize-card {
    width: 255px;
    background: #cc5454;
    border-radius: 20px;
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .customize-top-row {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 4px;
  }

  .customize-paw-btn {
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
  .customize-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .customize-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .customize-heading {
    flex: 1;
    text-align: center;
  }

  .customize-title {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    line-height: 1.3;
  }
  
   .customize-name-input::placeholder { color: rgba(255,255,255,0.5); }

  .customize-subtitle {
    font-size: 10px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    font-style: italic;
    line-height: 1.4;
  }

  .customize-spacer {
    width: 28px;
    flex-shrink: 0;
  }

  /* Main content: image left, options right */
  .customize-body {
    width: 100%;
    display: flex;
    gap: 10px;
    margin-bottom: 14px;
    margin-top: 10px;
  }

  .customize-color-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .customize-color-label {
    font-size: 10px;
    font-weight: 600;
    color: #fff;}

  .customize-personality-option {
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    padding: 3px 6px;
    border-radius: 6px;
    transition: background 0.15s;
    border: 1px solid transparent;
  }

  .customize-personality-option:hover {
    background: rgba(255,255,255,0.15);
  }
  .customize-personality-option.selected {
    background: rgba(255,255,255,0.25);
    border-color: #fff;
    font-weight: 800;
  }

  /* There's not really a need for this anymore, but I'm just too lazy to remove it, so I just removed the background. (how did I have enough energy to make a comment on this & not remove it? Huh... */
  .customize-pet-img {
    width: 120px;
    height: 200px;
    border-radius: 12px;
    flex-shrink: 0;
    object-fit: contain;
  }

  .customize-options {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;
  }

  .customize-pet-name {
    font-size: 10px;
    font-weight: 800;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 4px;
    text-decoration: underline;
    cursor: pointer;
  }

  .customize-section-title {
    font-size: 11px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-decoration: underline;
    margin-top: 6px;
    margin-bottom: 2px;
  }

  .customize-option {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .customize-option:hover {
    background: rgba(190, 55, 55, 0.1);
  }
  .customize-option.selected {
    color: rgb(190, 55, 55);
    font-weight: 800;
  }

  .customize-bottom {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const MISC_OPTIONS = ['pet-color', 'pet-personality'];

export function Customize() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  /* This will be important for firebase later */
  const [userData, setUserData] = useState(null);
  const [petName, setPetName] = useState('');

  const [editingName, setEditingName] = useState(false);

  /* Color for pet-color */
  const [petHue, setPetHue] = useState('');

  /* Personality variable */
  const [petPersonality, setPetPersonality] = useState('');

  /* Fetch user values */
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);
        setPetName(data.petName || '');
        setPetHue(data.petHue || 0);
        setPetPersonality(data.petPersonality || '');
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        petName,
        petHue,
        petPersonality,
      });
      console.log("Profile Saved!");
      navigate('/home');
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="customize-page">
        <div className="customize-card">

          {/* Top row */}
          <div className="customize-top-row">
            <button className="customize-paw-btn" onClick={() => navigate('/home')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="customize-heading">
              <div className="customize-title">Hi {userData?.username}!</div>
              <div className="customize-subtitle">
                How would you like to customize<br />({userData?.petName} today?)
              </div>
            </div>
            <div className="customize-spacer" />
          </div>

          {/* Body: pet icon & options */}
          <div className="customize-body">
            {/* Pet icon placeholder (need to find a sprite for the red panda but just can't for the life of me.) */}
            <img 
              src={PersonalPetIcon}
              alt="Your pet"
              className="customize-pet-img"
              style={{
                marginLeft: '5px',
                transform: 'scale(1.25)',
                filter: `hue-rotate(${petHue}deg) saturate(1.4)`, 
                }}/>

          <div className="customize-options">

              {editingName ? (
                <input
                  autoFocus
                  className="customize-name-input"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
                  placeholder="Enter pet name..."
                />
              ) : (
                <div className="customize-pet-name" onClick={() => setEditingName(true)}>
                  {petName || "What's your pet's name?"}
                </div>
              )}
              
              <div className="customize-section-title">Attributes</div>
              
              <div className="customize-color-row">
                <span className="customize-color-label">pet-color</span>
                <input
                  type="color"
                  className="customize-color-input"
                  title="Pick a color"
                  onChange={(e) => {
                    /* Convert hex color to hue degrees (awful awful evil thing to do oh my god) */
                    const hex = e.target.value;
                    const r = parseInt(hex.slice(1,3),16)/255;
                    const g = parseInt(hex.slice(3,5),16)/255;
                    const b = parseInt(hex.slice(5,7),16)/255;
                    const max = Math.max(r,g,b), min = Math.min(r,g,b);
                    let h = 0;
                    if (max !== min) {
                      const d = max - min;
                      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                      else if (max === g) h = ((b - r) / d + 2) / 6;
                      else h = ((r - g) / d + 4) / 6;
                    }
                    setPetHue(Math.round(h * 360));
                  }}
                />
              </div>

        <div className="customize-color-label" style={{ marginBottom: '3px', marginTop: '6px' }}>pet-personality</div>
        {PERSONALITIES.map((p, i) => (
          <div
            key={i}
            className={`customize-personality-option ${petPersonality === p ? 'selected' : ''}`}
            onClick={() => setPetPersonality(p)}
          >
            {p || `Option ${i + 1}`}
          </div>
        ))}

            </div>
          </div>

          {/* Submit */}
          <div className="customize-bottom">
            <Button
              onClick={handleSubmit}
              style={{ fontSize: '11px', padding: '5px 28px' }}
            >
              Submit
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}