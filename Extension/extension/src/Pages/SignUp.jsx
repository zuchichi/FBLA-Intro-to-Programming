import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from '../Components/Textbox';
import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  .signup-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .signup-card {
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

  .signup-brand {
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.5px;
    margin-bottom: 14px;
  }

  .signup-inner-card {
    width: 100%;
    background: rgba(220, 75, 75, 0.6);
    border-radius: 12px;
    padding: 12px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
  }

  .signup-inner-title {
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    letter-spacing: 0.3px;
  }

  .signup-logo {
    width: 28px;
    margin-top: 12px;
    opacity: 0.9;
  }
`;

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <style>{styles}</style>
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-brand">Redpie</div>
          <div className="signup-inner-card">
            <div className="signup-inner-title">Sign Up</div>
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
          </div>
          <Button onClick={() => navigate('/customize')} style={{ fontSize: '12px', padding: '5px 24px' }}>
            Sign up
          </Button>
          <Button onClick={() => navigate('/login')} style={{ fontSize: '10px', padding: '5px 12px' }}>
            Have an account? Log in
          </Button>
          <Button onClick={() => navigate('/intro')} style={{ fontSize: '12px', padding: '5px 24px' }}>
            Go back
          </Button>
        </div>
      </div>
    </>
  );
}