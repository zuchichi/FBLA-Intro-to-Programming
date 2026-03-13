import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import Button from '../Components/Button';
import BadgeIcon from '../assets/badge.png';
import ChecklistIcon from '../assets/checklist.png';

// For firebase
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .chores-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .chores-card {
    width: 255px;
    background: #d33c3c;
    border-radius: 20px;
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
  }

  .chores-top-row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    gap: 8px;
  }

  .chores-paw-btn {
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
  .chores-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .chores-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .chores-title {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    flex: 1;
    text-align: center;
  }

  /* Banner row */
  .chores-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }

  .chores-banner-img {
    width: 75px;
    height: 70px;
    border-radius: 10px;
    flex-shrink: 0;
    object-fit: cover;
  }

  .chores-banner-text {
    font-size: 12px;
    font-weight: 800;
    color: rgb(255, 255, 255);
    line-height: 1.4;
  }

  /* Chore list */
  .chores-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
  }

  .chore-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .chore-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .chore-checkbox.checked {
    background: rgb(190, 55, 55);
  }
  .chore-checkmark {
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    line-height: 1;
  }

  .chore-label {
    font-size: 11px;
    font-weight: 700;
    color: #ededed;
    flex: 1;
  }
  .chore-label.checked {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .chore-reward {
    width: 28px;
    height: 14px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  /* Bottom */
  .chores-bottom {
    display: flex;
    justify-content: center;
  }
`;

export function Chores() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  
  const [userData, setUserData] = useState(null);


  const CHORES = userData ? [
    { id: 0, label: userData?.chores?.[0] },
    { id: 1, label: userData?.chores?.[1] },
    { id: 2, label: userData?.chores?.[2] },
  ] : [];

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, []);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <style>{styles}</style>
      <div className="chores-page">
        <div className="chores-card">

          {/* Top row */}
          <div className="chores-top-row">
            <button className="chores-paw-btn" onClick={() => navigate('/home')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="chores-title">Daily Chores</div>
            <div style={{ width: 28 }} /> {/* Spacer to center title */}
          </div>

          {/* Banner */}
          <div className="chores-banner">
            <div className="chores-banner-img">
              <img src={ChecklistIcon} style={{width: '120px', marginLeft: '7px'}}></img>
            </div>
            <div className="chores-banner-text">
              Complete your daily chores today!
            </div>
          </div>

          {/* Chore list */}
          <div className="chores-list">
            {CHORES.map(chore => (
              <div className="chore-row" key={chore.id}>
                <div
                  className={`chore-checkbox ${checked[chore.id] ? 'checked' : ''}`}
                  onClick={() => toggle(chore.id)}
                >
                  {checked[chore.id] && <span className="chore-checkmark">✓</span>}
                </div>
                <div className={`chore-label ${checked[chore.id] ? 'checked' : ''}`}>
                  {chore.label}
                </div>
                <div className="chore-reward">
                  <img src={BadgeIcon} style={{ width: '28px', height: '28px', objectFit: 'contain' }} alt="badge" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}