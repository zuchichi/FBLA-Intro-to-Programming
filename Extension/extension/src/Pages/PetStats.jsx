import React from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import AppleIcon from '../assets/apple.png';
import BambooIcon from '../assets/bamboo.png';
import Button from '../Components/Button';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .petstats-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .petstats-card {
    width: 255px;
    background: #ce3d3a;
    border-radius: 20px;
    padding: 16px 18px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
  }

  .petstats-top-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .petstats-paw-btn {
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
  .petstats-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .petstats-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .petstats-title {
    font-size: 15px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    flex: 1;
  }

  .petstats-resources {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .petstats-resource {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
  }

  .petstats-resource img {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  .petstats-pet-img {
    width: 120px;
    height: 110px;
    background: #ddd;
    border-radius: 12px;
    margin-bottom: 14px;
    object-fit: cover;
  }

  .petstats-placeholder {
    width: 120px;
    height: 110px;
    background: #ddd;
    border-radius: 12px;
    margin-bottom: 14px;
  }

  .petstats-stats-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 14px;
    padding-left: 4px;
  }

  .petstats-stat-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
  }

  .petstats-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgb(250, 250, 250);
    flex-shrink: 0;
  }

  .petstats-buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

export function PetStats() {
  const navigate = useNavigate();

  const petApples = 'nil';
  const petBamboo = 'nil';

  return (
    <>
      <style>{styles}</style>
      <div className="petstats-page">
        <div className="petstats-card">

          {/* Top row: paw, title, resources */}
          <div className="petstats-top-row">
            <button className="petstats-paw-btn" onClick={() => navigate('/home')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="petstats-title">Pet Stats</div>
            <div className="petstats-resources">
              <div className="petstats-resource">
                <img src={AppleIcon} alt="Apple" />
                {petApples}
              </div>
              <div className="petstats-resource">
                <img src={BambooIcon} alt="Bamboo" />
                {petBamboo}
              </div>
            </div>
          </div>

          {/* Pet image placeholder */}
          <div className="petstats-placeholder" />

          {/* Stats list */}
          <div className="petstats-stats-list">
            <div className="petstats-stat-row">
              <div className="petstats-dot" />
              Pet's Mood:
            </div>
            <div className="petstats-stat-row">
              <div className="petstats-dot" />
              Pet's Cleanliness:
            </div>
            <div className="petstats-stat-row">
              <div className="petstats-dot" />
              Pet's Hunger:
            </div>
            <div className="petstats-stat-row">
              <div className="petstats-dot" />
              Pet's Health:
            </div>
          </div>

          {/* Action buttons */}
          <div className="petstats-buttons">
            <Button onClick={() => navigate('/chores')} style={{ fontSize: '10px', padding: '4px 14px' }}>
              See Pet Chores
            </Button>
            <Button onClick={() => navigate('/marketplace')} style={{ fontSize: '10px', padding: '4px 14px' }}>
              Go to Marketplace
            </Button>
            <Button onClick={() => navigate('/financialogistics')} style={{ fontSize: '9px', padding: '4px 14px' }}>
              Your Financial Logistics
            </Button>
            <Button onClick={() => navigate('/pet')} style={{ fontSize: '10px', padding: '4px 14px' }}>
              Play with Pet!
            </Button>
            <Button onClick={() => navigate('/customize')} style={{ fontSize: '10px', padding: '4px 14px' }}>
              Customize Pet
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}