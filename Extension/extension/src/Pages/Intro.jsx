import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';

export function Intro() {
    return (
        <div style={{
            width: '470px',
            height: '600px',
            backgroundColor: "rgb(203, 61, 61)",
            borderRadius: '20px',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>

            <h1>Redpie</h1>
            <img
                src={Logo}
                alt="Redpie Logo"
                style={{ width: '150px', marginBottom: '20px' }}
            />
            
            <Button bgColor="rgb(134, 43, 43)" textColor="#FFFFFF">
                Log In!
            </Button>

            <Button bgColor="rgb(134, 43, 43)" textColor="#FFFFFF">
                Get Started
            </Button>
        </div>
    )
}