import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .intro-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    font-family: 'Nunito', sans-serif;
  }

  .intro-card {
    width: 230px;
    background: #d44c4c;
    border-radius: 20px;
    padding: 18px 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .intro-title {
    font-size: 18px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
    letter-spacing: 0.3px;
  }

  .intro-logo {
    width: 90px;
    object-fit: contain;
    margin-bottom: 12px;
  }

  .intro-inner-card {
    width: 100%;
    background: rgb(186, 56, 56);
    border-radius: 14px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .intro-credits {
    font-size: 9px;
    font-weight: 600;
    color: #ffffff;
    opacity: 0.5;
    text-align: center;
    margin-top: auto;
  }
`;

export function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="intro-page">
        <div className="intro-card">

          <div className="intro-title">Redpie</div>

          <img src={Logo} alt="Redpie Logo" className="intro-logo" />

          <div className="intro-inner-card">
            <Button
              style={{ fontSize: '12px', padding: '5px 24px' }}
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button
              style={{ fontSize: '12px', padding: '5px 24px' }}
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>

          <div className="intro-credits">Developed by Uchechi Ejiogu & Soham Patel.</div>

        </div>
      </div>
    </>
  );
}