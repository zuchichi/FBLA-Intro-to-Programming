import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from '../Components/Textbox';
import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  .login-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .login-card {
    position: relative;
    z-index: 1;
    width: 230px;
    background: rgb(190, 55, 55);
    border-radius: 20px;
    padding: 20px 18px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }

  .login-brand {
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.5px;
    margin-bottom: 14px;
  }

  .login-inner-card {
    width: 100%;
    background: rgba(220, 75, 75, 0.6);
    border-radius: 12px;
    padding: 12px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
  }

  .login-inner-title {
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    letter-spacing: 0.3px;
  }

  .divider-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0 8px;
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.35);
  }
  .divider-text {
    font-size: 10px;
    color: rgba(255,255,255,0.75);
    white-space: nowrap;
  }

  .get-started-btn {
    width: 100%;
    padding: 8px;
    background: rgba(255,255,255,0.18);
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 8px;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    letter-spacing: 0.4px;
    transition: background 0.2s, border-color 0.2s;
  }
  .get-started-btn:hover {
    background: rgba(255,255,255,0.28);
    border-color: rgba(255,255,255,0.8);
  }

  .login-logo {
    width: 28px;
    margin-top: 12px;
    opacity: 0.9;
  }
`;

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="login-card">
          <div className="login-brand">Redpie</div>

          <div className="login-inner-card">
            <div className="login-inner-title">Log In</div>

            <Textbox
              placeholder="Email:"
              value={email}
              onChange={setEmail}
              type="email"
            />

            <Textbox
              placeholder="Password:"
              value={password}
              onChange={setPassword}
              type="password"
            />

            <div className="divider-row">
              <div className="divider-line" />
            </div>
          </div>

          <Button onClick={() => navigate('/home')} style={{ fontSize: '12px', padding: '5px 24px' }}>
            Log in
          </Button>

          <Button onClick={() => navigate('/signup')} style={{ fontSize: '9px', padding: '4px 15px' }}>
            Don't have an account? Get started!
          </Button>

          <Button onClick={() => navigate('/intro')} style={{ fontSize: '9px', padding: '4px 15px' }}>
            Go back
          </Button>
        </div>
      </div>
    </>
  );
}