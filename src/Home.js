import React from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='Page'>
            <h1 className='titleheading'>Hide and Reveal Text in Image</h1>
            <img
                        alt={"selectedImg"}
                        src={require('./favicon.png')}
                        style={{
                            width: "300px",
                            height: "300px",
                            marginTop: "20px",
                            marginBottom: "20px",
                            objectFit: 'contain',
                            borderRadius: "20px"
                        }}
                    />
            <div>
                <button className='mainbutton' onClick={() => { navigate('/encode'); }}>ENCODE IMAGE</button>
                <button className='mainbutton' onClick={() => { navigate('/decode'); }}>DECODE IMAGE</button>
            </div>
        </div>
    );
};

export default Home;
