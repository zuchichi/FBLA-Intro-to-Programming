import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PawIcon from '../assets/red_panda_paw.png';
import PandaIcon from '../assets/red_panda_hello.png';
import AppleIcon from '../assets/apple.png';
import BambooIcon from '../assets/bamboo.png';
import BookIcon from '../assets/book.png';
import Button from '../Components/Button';
import { applyDecay } from '../Utils/StatsDecay';


// For firebase
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .home-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .home-card {
    width: 250px;
    height: 300px;
    background: #c13737;
    border-radius: 20px;
    padding: 16px 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .home-top-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .home-paw-btn {
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
  }
  .home-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(80%);
  }
  .home-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .home-greeting {
    font-size: 13px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    flex: 1;
    line-height: 1.2;
  }

  .home-panda-img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  .home-subtitle {
    font-size: 10px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 8px;
    font-style: italic;
  }

  .home-body-text {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 10px;
    padding: 0 4px;
  }

  .home-book-icon {
    display: inline;
    width: 40px;
    height: 40px;
    object-fit: contain;
    vertical-align: middle;
    margin-left: 2px;
  }

  .home-placeholder-box {
    width: 100%;
    height: 90px;
    background: #a52727;
    border-radius: 10px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .home-stats-label {
    font-size: 11px;
    font-weight: 800;
    color: #ffffff;
    text-align: right;
    width: 100%;
    margin-bottom: 6px;
    padding-right: 50px;
  }

  .home-pet-status {
    font-size: 11px;
    font-weight: 800;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 12px;
  }

  .home-bottom-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .home-resource {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #fffbf8;
  }

  .home-resource img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

export function Faq() {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  console.log(userData);
  
    const faqs = [
    { question: "What is my data used for?", answer: "Your data is not given to anyone else and is strictly used for your own personal purposes. In no way, shape, or form will Redpie sell your data." },
    { question: "How do I take care of my pet?", answer: "You can take care of your pet by buying items from the marketplace, regularly feeding it, or going to play & pet with it." },
    { question: "What happens if my pet's stats drop?", answer: "You can go to the marketplace to help them rise." },
    { question: "What programming language was Redpie coded in?", answer: "Redpie was coded in ReactJS on Visual Studio Code." },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      await applyDecay();
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        <div className="home-card" style={{ height: 'auto', gap: '8px' }}>
          
          <div className="home-top-row">
            <button className="home-paw-btn" onClick={() => navigate(-1)}>
              <img src={PawIcon} alt="Back" />
            </button>
            <span className="home-greeting">FAQ</span>
            <img src={PandaIcon} alt="Panda" className="home-panda-img" />
          </div>

          <p className="home-subtitle">Got questions? We've got answers!</p>

          {faqs.map((faq, i) => (
            <div key={i} className="home-placeholder-box" style={{ height: 'auto', padding: '8px', flexDirection: 'column', gap: '4px' }}>
              <span className="home-stats-label" style={{ textAlign: 'center', paddingRight: 0 }}>
                {faq.question}
              </span>
              <span className="home-body-text" style={{ marginBottom: 0 }}>
                {faq.answer}
              </span>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}