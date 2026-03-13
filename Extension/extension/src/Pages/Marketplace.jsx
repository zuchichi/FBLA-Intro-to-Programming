import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import AppleIcon from '../assets/apple.png';
import BambooIcon from '../assets/bamboo.png';
import Button from '../Components/Button';

/* Image imports for all the items */
import EnergyDrinkIcon from '../assets/energy-drink.png';
import MedKitIcon from '../assets/medkit.png';
import BandAidIcon from '../assets/bandaid.png';
import MysteryStatIcon from '../assets/question_mark.png';
import SaladIcon from '../assets/salad.png';
import SixSevenIcon from '../assets/67.png';
import SmallSoapIcon from '../assets/small_soap.png';
import LargeSoapIcon from '../assets/large_soap.png';

// For firebase
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .market-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .market-card {
    width: 255px;
    background: #c25151;
    border-radius: 20px;
    padding: 14px 16px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .market-top-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .market-paw-btn {
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
  .market-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .market-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .market-title {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    flex: 1;
  }

  .market-resources {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .market-resource {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
  }

  .market-resource img {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  .market-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 14px;
  }

  .market-shelf {
    background: #ddd;
    border-radius: 12px;
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .market-item {
    background: rgba(255,255,255,0.55);
    border-radius: 6px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .market-item:hover {
    background: rgba(255,255,255,0.85);
  }

  .market-item-img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    opacity: 0.4;
  }

  .market-bottom-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ShelfItem = ({ item, onBuy }) => (
  <div className="market-item" onClick={() => onBuy(item)} title={`${item.name} - ${item.price} ${item.currency}`}>
    <img src={item.image} className="market-item-img" alt={item.name} style={{ opacity: 1 }} />
  </div>
);

const Shelf = ({ onBuy }) => (
  <div className="market-shelf">
    <ShelfItem onBuy={onBuy} />
    <ShelfItem onBuy={onBuy} />
  </div>
);

export function Marketplace() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, []);

  const petApples = userData?.apples
  const petBamboo = userData?.bamboo

  /* Items and prices */
  const ITEMS = [
    { id: 1, name: 'Energy Drink', price: 10, currency: 'apples', effects: { petEnergy: 50, petHunger: -15 }, image: EnergyDrinkIcon },
    { id: 2, name: 'Bamboo Salad', price: 10, currency: 'bamboo', effects: { petHunger: -50 }, image: SaladIcon },
    { id: 3, name: 'Medkit', price: 50, currency: 'apples', effects: { petHealth: 80 }, image: MedKitIcon },
    { id: 4, name: 'Bandaid', price: 30, currency: 'apples', effects: { petHealth: 45 }, image: BandAidIcon },
    { id: 5, name: 'Small bar of soap', price: 15, currency: 'apples', effects: { petCleanliness: 40 }, image: SmallSoapIcon },
    { id: 6, name: 'Large bottle of soap', price: 25, currency: 'apples', effects: { petCleanliness: 65 }, image: LargeSoapIcon },
    { id: 7, name: '67', price: 67, currency: 'apples', effects: {petCleanliness: -67}, image: SixSevenIcon }, // This is the dumbest easter egg I've ever added in my life I'm truly contemplating this
    { id: 8, name: 'Random stat change', price: 5, currency: 'apples', effects: { petCleanliness: Math.floor(Math.random() * 40) - 20 }, image: MysteryStatIcon },
  ];


  const [errorMsg, setErrorMsg] = useState('');
  const handleBuy = async (item) => {
    const user = auth.currentUser;
    if (!user) return;

    const currentBalance = userData?.[item.currency] ?? 0;
    if (currentBalance < item.price) {
      setErrorMsg(`Not enough ${item.currency} to buy ${item.name}!`);
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    const updates = { [item.currency]: currentBalance - item.price };
    for (const [stat, delta] of Object.entries(item.effects)) {
      const current = userData?.[stat] ?? 0;
      updates[stat] = Math.min(100, Math.max(0, current + delta));
    }

    await updateDoc(doc(db, "users", user.uid), updates);
    const newData = { ...userData, ...updates };
    const checkedData = await checkPetStatus(newData);
    setUserData(checkedData);
    setErrorMsg(`Bought ${item.name}!`);
    setTimeout(() => setErrorMsg(''), 3000);
  };

  const checkPetStatus = async (data) => {
  const user = auth.currentUser;
  if (!user) return;

  let petMood = data.petMood;
  let petNote = data.petNote;

  // Hunger checks (high hunger = hungry)
  if (data.petHunger > 50) {
    petMood = 'Sad';
    petNote = "Your pet is hungry! Feed them soon.";
  }

  // Cleanliness checks
  if (data.petCleanliness < 35) {
    petMood = 'Uncomfortable';
    petNote = "It seems like your pet is dirty, oh no! Go ahead and visit the marketplace to buy your pet some soap to clean them!";
  }

  // Energy checks
  if (data.petEnergy < 20) {
    petMood = 'Tired';
    petNote = "Your pet's awfully tired! Go buy an energy drink to help with their energy from the marketplace!";
  }

  // Health checks
  if (data.petHealth < 30) {
    petMood = 'Sick';
    petNote = "Uh oh! Your pet is sick! Go to the marketplace to help them heal up, or feed them some food to help cure their sickness!";
  }

  // Summary is just that if your pet is doing well, then.. well they'll be doing well.
  if (data.petHunger <= 30 && data.petCleanliness >= 60 && data.petEnergy >= 50 && data.petHealth >= 70) {
    petMood = 'Happy';
    petNote = "Your pet is doing great today!";
  }

  // Only update if something changed
  if (petMood !== data.petMood || petNote !== data.petNote) {
    const moodUpdates = { petMood, petNote };
    await updateDoc(doc(db, "users", user.uid), moodUpdates);
    return { ...data, ...moodUpdates };
  }

  return data;
};

  
  return (
    <>
      <style>{styles}</style>
      <div className="market-page">
        <div className="market-card">
          {/* Top row */}
          <div className="market-top-row">
            <button className="market-paw-btn" onClick={() => navigate('/petstats')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="market-title">Marketplace</div>
            <div className="market-resources">
              <div className="market-resource">
                <img src={AppleIcon} alt="Apple" />
                {petApples}
              </div>
              <div className="market-resource">
                <img src={BambooIcon} alt="Bamboo" />
                {petBamboo}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div style={{ color: '#fff', fontSize: '10px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          {/* 2x2 Shelf grid */}
          <div className="market-grid">
            {Array.from({ length: 4 }).map((_, shelfIdx) => (
              <div key={shelfIdx} className="market-shelf">
                {ITEMS.slice(shelfIdx * 2, shelfIdx * 2 + 2).map(item => (
                  <ShelfItem key={item.id} item={item} onBuy={handleBuy} />
                ))}
              </div>
            ))}
          </div>

          {/* Bottom buttons */}
          <div className="market-bottom-row">
          </div>

        </div>
      </div>
    </>
  );
}