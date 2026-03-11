import React from 'react';
import { useNavigate } from 'react-router-dom';
import PawIcon from '../assets/red_panda_paw.png';
import AppleIcon from '../assets/apple.png';
import BambooIcon from '../assets/bamboo.png';
import Button from '../Components/Button';
import { useUser } from '../context/UserContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .finance-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .finance-card {
    width: 255px;
    background: #c13737;
    border-radius: 20px;
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
  }

  .finance-top-row {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .finance-paw-btn {
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
  .finance-paw-btn:hover {
    transform: scale(1.15);
    filter: brightness(70%);
  }
  .finance-paw-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .finance-title {
    font-size: 14px;
    font-weight: 900;
    color: rgb(246, 246, 246);
    text-align: center;
    flex: 1;
    line-height: 1.2;
  }

  .finance-resources {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }

  .finance-resource {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
  }

  .finance-resource img {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  /* Two column section */
  .finance-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }

  .finance-col-left {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .finance-col-right {
    display: flex;
    flex-direction: column;
    gap: 0px;
  }

  .finance-label {
    font-size: 10px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.3;
  }

  .finance-value {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
  }

  .finance-expenses-title {
    font-size: 10px;
    font-weight: 800;
    color: #ffffff;
    text-align: right;
    margin-bottom: 8px;
  }

  .finance-expense-row {
    margin-bottom: 10px;
  }

  .finance-expense-label {
    font-size: 10px;
    font-weight: 800;
    color: #ffffff;
    text-align: right;
  }

  .finance-expense-value {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
    text-align: right;
  }

  .finance-divider {
    width: 100%;
    height: 2px;
    background: rgb(255, 255, 255);
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .finance-goals-title {
    font-size: 13px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 12px;
    line-height: 1.2;
  }

  .finance-goals-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 2px;
  }

  .finance-goal-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .finance-goal-dot {
    width: 10px;
    height: 10px;
    background: rgb(255, 255, 255);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .finance-goal-text {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
  }
`;

export function FinancialLogistics() {
  const navigate = useNavigate();

  const currentApples = 'nil';
  const currentBamboo = 'nil';
  const expense1 = 'nil';
  const expense2 = 'nil';

  // Placeholder goals, replace with real data when I get the database up & running
  const goals = [null, null, null];

  return (
    <>
      <style>{styles}</style>
      <div className="finance-page">
        <div className="finance-card">

          {/* Top row */}
          <div className="finance-top-row">
            <button className="finance-paw-btn" onClick={() => navigate('/petstats')} title="Back to Home">
              <img src={PawIcon} alt="Back" />
            </button>
            <div className="finance-title">Financial<br />Logistics</div>
            <div className="finance-resources">
              <div className="finance-resource">
                <img src={AppleIcon} alt="Apple" />
                {currentApples}
              </div>
              <div className="finance-resource">
                <img src={BambooIcon} alt="Bamboo" />
                {currentBamboo}
              </div>
            </div>
          </div>

          {/* Layout: Two column */}
          <div className="finance-columns">
            {/* Left: current balances */}
            <div className="finance-col-left">
              <div>
                <div className="finance-label">Current<br />Apples: ({currentApples})</div>
              </div>
              <div>
                <div className="finance-label">Current<br />Bamboo: ({currentBamboo})</div>
              </div>
            </div>

            {/* Right: expenses */}
            <div className="finance-col-right">
              <div className="finance-expenses-title">Expenses:</div>
              <div className="finance-expense-row">
                <div className="finance-expense-label">Expense 1:</div>
                <div className="finance-expense-value">{expense1}</div>
              </div>
              <div className="finance-expense-row">
                <div className="finance-expense-label">Expense 2:</div>
                <div className="finance-expense-value">{expense2}</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="finance-divider" />

          {/* Goals section */}
          <div className="finance-goals-title">Your Current<br />Goals</div>
          <div className="finance-goals-list">
            {goals.map((goal, i) => (
              <div className="finance-goal-row" key={i}>
                <div className="finance-goal-dot" />
                <div className="finance-goal-text">{goal || ''}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}