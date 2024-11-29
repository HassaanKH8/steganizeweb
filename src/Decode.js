import React, { useRef, useState } from 'react';
import './App.css';
import axios from "axios";
import ReactLoading from 'react-loading';

const Decode = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const decodeImage = async () => {
        if (!imageFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            setLoading(true)
            const response = await axios.post(`${apiUrl}/decode`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false)
            setText(response.data.message);

        } catch (error) {
            console.error('Error encoding image:', error);
        }
    };

    return (
        <div className='Page'>
            <h1 className='titleheading'>Reveal Hidden Text</h1>
            {!image ? (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <div className='plusbtn' onClick={handleButtonClick}>
                        <h1 style={{ fontSize: 40 }}>+</h1>
                        <h1>Select an Image</h1>
                    </div>
                </>
            ) : (
                <>
                    <div className='imageContainer'>
                        <img
                            alt={"selectedImg"}
                            src={image}
                            style={{
                                width: "300px",
                                height: "300px",
                                marginTop: "20px",
                                marginBottom: "20px",
                                objectFit: 'contain',
                                borderRadius: "20px"
                            }}
                        />
                    </div>
                    {text && (
                        <>
                            <h1 className='DecodedMessageHeading'>DECODED MESSAGE: </h1>
                            <p className='DecodedMessage'>{text}</p>
                        </>
                    )}
                    <div style={{ flexDirection: 'row', marginTop: '30px' }}>
                        <button className='mainbutton' onClick={decodeImage}>DECODE IMAGE</button>
                        {loading && (
                            <ReactLoading type="spin" color="#36454f" height={40} width={40} className='activity' />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Decode;
