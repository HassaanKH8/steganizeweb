import React, { useRef, useState } from 'react';
import './App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Encode = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const [encodedBuffer, setEncodedBuffer] = useState('')
    const [loading, setLoading] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const encodeImage = async () => {
        if (!imageFile || !text) {
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('message', text);

        try {
            setLoading(true)
            const response = await axios.post(`${apiUrl}/encode`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'arraybuffer',
            });
            setEncodedBuffer(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error encoding image:', error);
        }
    };

    const encodeArrayBufferToBase64 = (arrayBuffer) => {
        const uint8Array = new Uint8Array(arrayBuffer);
        let binary = '';
        uint8Array.forEach(byte => {
            binary += String.fromCharCode(byte);
        });
        return window.btoa(binary);
    };

    const handleDownload = async () => {
        const base64Image = encodeArrayBufferToBase64(encodedBuffer);

        const byteCharacters = atob(base64Image);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `Encoded_Image_Steganize_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        navigate('/')
    };

    return (
        <div className='Page'>
            <h1 className='titleheading'>Hide Text in Image</h1>
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
                    <input
                        id="textInput"
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Add text to hide..."
                    />
                    <div style={{flexDirection: 'row'}}>
                        <button className='mainbutton' onClick={encodeImage}>ENCODE IMAGE</button>
                        {loading && (
                            <ReactLoading type="spin" color="#36454f" height={40} width={40} className='activity'/>
                        )}
                    </div>

                    {encodedBuffer && (
                        <button className='mainbutton' onClick={handleDownload}>DOWNLOAD</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Encode;
