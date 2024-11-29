import React from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='Page'>
            <h1 className='titleheading'>Hide and Reveal Text in Image</h1>
            <button className='mainbutton' onClick={()=>{navigate('/encode');}}>ENCODE IMAGE</button>
            <button className='mainbutton' onClick={()=>{navigate('/decode');}}>DECODE IMAGE</button>
        </div>
    );
};

export default Home;
