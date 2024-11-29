import React from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

const Encode = () => {
    const navigate = useNavigate();

    return (
        <div className='Page'>
            <h1 className='titleheading2'>Hide Text in Image</h1>
            <div className='plusbtn'>
                <h1 style={{ fontSize: 40 }}>+</h1>
                <h1>Select an Image</h1>
            </div>
            
            <button className='mainbutton' onClick={() => { navigate('/encode'); }}>ENCODE IMAGE</button>
        </div>
    );
};

export default Encode;
