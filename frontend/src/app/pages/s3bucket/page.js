'use client' 


import Header from "../../components/header";
import React, {useState} from 'react';
import axios from 'axios';

const userID  = 16 //need change
const petID = 48


function s3Page() {  
    const [file, setFile] = useState(null)
    const [caption, setCaption] = useState("")
  
    const userPhotosubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)

        try {
            const response = await axios.post(`http://localhost:3001/api/image/uploadImage/${userID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('File uploaded successfully:', response.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const petPhotosubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)

        try {
            const response = await axios.post(`http://localhost:3001/api/image/uploadPetImage/${petID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('File uploaded successfully:', response.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
  
    return (
        <>
            <div>
                <p>Hello, this is a user photo upload!</p>
                <form onSubmit={userPhotosubmit}>
                    <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
                    <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <p>Hello, this is a pet photo upload!</p>
                <form onSubmit={petPhotosubmit}>
                    <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
                    <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default s3Page