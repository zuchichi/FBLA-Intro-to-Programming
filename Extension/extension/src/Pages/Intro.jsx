import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';
import { useNavigate } from 'react-router-dom'
import '../index.css'

export function Intro() {
    const navigate = useNavigate()

    return (
        <div style={{
            width: '200px',
            height: '250px',
            backgroundColor: "rgb(203, 61, 61)",
            borderRadius: '20px',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <p style={{fontSize: "25px"}}>Redpie</p>
            <img
                src={Logo}
                alt="Redpie Logo"
                style={{ width: '120px', marginBottom: '5px' }}
            />
            <Button
              style={{ fontSize: "13px", padding: "5px 10px" }}
              onClick={() => navigate('/login')}
             >
                Log in!
            </Button>

            <Button 
              style={{ fontSize: "13px", padding: "5px 10px" }}
              onClick={() => navigate('/signup')}
            >
                Get Started
                </Button>
            <p style={{opacity: "60%", fontSize: "9px"}}>Devloped by Uchechi Ejiogu.</p>
        </div>
    )
}