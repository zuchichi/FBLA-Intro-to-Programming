import React from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import AppleIcon from '../assets/apple.png';
import BambooIcon from '../assets/bamboo.png';
import Button from '../Components/Button';
import { useUser } from '../context/UserContext';

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

const ShelfItem = ({ onBuy }) => (
  <div className="market-item" onClick={onBuy}>
    {/* Replace this div with <img> when I get the item images*/}
    <div className="market-item-img" />
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

  const petApples = 'nil';
  const petBamboo = 'nil';

  /* Items and prices */
  const ITEMS = [
    /* Food */
    {id: 1, name: 'Energy Drink', price: 10, currency: 'apples', modifier1: 50, modifier2: -15, image: null},
    {id: 2, name: 'Bamboo Salad', price: 10, currency: 'bamboo', modifier1: 50, image: null},

    /* Items that can help w/ health */
    {id: 3, name: 'Medkit', price: 50, currency: 'apples', modifier1: 80, image: null},
    {id: 4, name: 'Bandaid', price: 30, currency: 'apples', modifier1: 45, image: null},

    /* Things for hygenic purposes */
    {id: 5, name: 'Small bottle of soap', price: 15, currency: 'apples', modifier1: 40, image: null},
    {id: 6, name: 'Large bottle of soap', price: 25, currency: 'apples', modifier1: 65, image: null},

    /* Fun things */
    {id: 7, name: '67', price: 67, currency: 'apples', modifier1: 67, image: null}, // This is the worst secret egg I've ever added in my life ..
    {id: 8, name: 'Random stat change', price: 5, currency: 'apples', modifier1: 1, image: null},
  ]

  const handleBuy = () => {
    // Purchase setup here
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

          {/* 2x2 shelf grid */}
          <div className="market-grid">
            <Shelf onBuy={handleBuy} />
            <Shelf onBuy={handleBuy} />
            <Shelf onBuy={handleBuy} />
            <Shelf onBuy={handleBuy} />
          </div>

          {/* Bottom buttons */}
          <div className="market-bottom-row">
            <Button
              onClick={handleBuy}
              style={{ fontSize: '11px', padding: '4px 16px' }}
            >
              Sell
            </Button>
            <Button
              onClick={handleBuy}
              bgColor="#4caf50"
              style={{ fontSize: '10px', padding: '4px 12px' }}
            >
              Purchase
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}