import Button from '../Components/Button';
import Logo from '../assets/redpie_mini_logo.png';
import Textbox from '../Components/Textbox';

import { useNavigate } from 'react-router-dom'
import '../index.css'

export function Login() {
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
            <Textbox></Textbox>
        </div>
    )
}