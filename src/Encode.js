import React, { useRef, useState } from 'react';
import './App.css'
import axios from "axios";

const Encode = () => {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    
      const encodeImage = async () => {
        if (!image || !text) {
          alert("Please select an image and enter a message.");
          return;
        }
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("message", text);
    
        try {
          const response = await axios.post(`${apiUrl}/encode`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "arraybuffer", // For binary response
          });
          console.log(response.data);
        //   setBufferData(response.data);
        } catch (error) {
          console.error("Error encoding image:", error);
        }
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
                    <img alt={"selectedImg"} src={image} style={{ width: "300px", height: "300px", marginTop: "20px", marginBottom: "20px", objectFit: 'contain', borderRadius: "20px" }} />
                    <input
                        id="textInput"
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Add text to hide..."
                    />
                    <button className='mainbutton' onClick={encodeImage}>ENCODE IMAGE</button>
                </div>
            )}

        </div>
    );
};

export default Encode;
