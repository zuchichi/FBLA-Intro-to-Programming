import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from '../Components/Textbox';
import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';

import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebase";

import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
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

    .social-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 2px;
  }

  .social-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
    transition: transform 0.15s, opacity 0.15s;
  }
  .social-btn:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
  .social-btn.google {
    background: #fff;
    color: #DB4437;
  }
  .social-btn.facebook {
    background: #1877F2;
    color: #fff;
  }
`;

export function SignUp() {
  const navigate = useNavigate();

  /* Stuff for firebase */
  const [email, setEmail] = useState('');
  const [username, SetUsername] = useState('');
  const [password, setPassword] = useState('');
  const[loginError,setLoginError] = useState('');
  
/* Initalize a new user into firestore database */


  const auth = getAuth(app);

  const HandleSignUp =async () => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;
      console.log("Sign up successful. Initalizing user.");

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        apples: 50,
        bamboo: 10,
        petName: "",
        petMood: "Happy",
        petHealth: 100,
        petHunger: 45,
        petCleanliness: 100,
        petEnergy: 100,
        chores: ["Pet your pet 10 times", "Feed your pet", "Buy something from the store"],
        financialGoals: [],
        expenses: ["", ""],
        color: "",
        petNote: 'Your pet is feeling excited today! Go ahead and complete your chores to earn rewards for your pet!'
      });

      console.log("User initalized. Going to home screen.");
      navigate('/customize');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-brand">Redpie</div>
          <div className="signup-inner-card">
            <div className="signup-inner-title">Sign Up</div>
            <Textbox
              type="text"
              value={username}
              onChange={SetUsername}
              placeholder="User:"    
            />

            <Textbox
              type="text"
              value={email}
              onChange={setEmail}
              placeholder="Email:"    
            />
            <Textbox
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Password:"  
            />
          </div>
          <Button onClick={HandleSignUp} style={{ fontSize: '12px', padding: '5px 24px' }}>
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