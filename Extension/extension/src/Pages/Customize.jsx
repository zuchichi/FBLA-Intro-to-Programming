import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import Button from '../Components/Button';

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

  .customize-pet-img {
    width: 110px;
    height: 150px;
    background: #ddd;
    border-radius: 12px;
    flex-shrink: 0;
    object-fit: cover;
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

const MISC_OPTIONS = ['pet-color', 'pet-height', 'pet-curiosity', 'pet-personality'];
const ACCESSORY_OPTIONS = ['pet-hats', 'pet-necklaces'];

export function Customize() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const userName = '(user)';
  const petName = '(pet-name)';

  const handleSubmit = () => {
    // wire up save/submit logic here
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
              <div className="customize-title">Hi {userName}!</div>
              <div className="customize-subtitle">
                How would you like to customize<br />({petName} today?)
              </div>
            </div>
            <div className="customize-spacer" />
          </div>

          {/* Body: pet icon & options */}
          <div className="customize-body">
            {/* Pet icon placeholder (need to find a sprite for the red panda but just can't for the life of me.) */}
            <div className="customize-pet-img" />

            {/* Options panel. I'm gonna make these all so that you can type in your value or edit it accordingly but that's gonna be done later.*/}
            <div className="customize-options">
              <div className="customize-pet-name">pet_name</div>

              <div className="customize-section-title">Misc.</div>
              {MISC_OPTIONS.map(opt => (
                <div
                  key={opt}
                  className={`customize-option ${selected === opt ? 'selected' : ''}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
                </div>
              ))}

              <div className="customize-section-title">Accessories</div>
              {ACCESSORY_OPTIONS.map(opt => (
                <div
                  key={opt}
                  className={`customize-option ${selected === opt ? 'selected' : ''}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
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