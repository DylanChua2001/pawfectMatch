'use client' 


import Header from "../../components/header";
import React, {useState} from 'react';
import axios from 'axios';

const userID  = 16 //need change
const petID = 48
const trainID = 1


function s3Page() {  
    const [file, setFile] = useState(null)
    const [userID, setUserID] = useState("")
    const [petID, setPetID] = useState("")
    const [trainID, setTrainID] = useState("")
  
    const userPhotosubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", file)
        formData.append("userID", userID)

        try {
            const response = await axios.post(`https://pawfect-match-backend-six.vercel.app//api/image/uploadImage/${userID}`, formData, {
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
        formData.append("petID", petID)

        try {
            const response = await axios.post(`https://pawfect-match-backend-six.vercel.app//api/image/uploadPetImage/${petID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('File uploaded successfully:', response.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const trainingPhotosubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", file)
        formData.append("trainID", trainID)

        try {
            const response = await axios.post(`https://pawfect-match-backend-six.vercel.app//api/image/uploadTrainingImage/${trainID}`, formData, {
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
                    <input value={userID} onChange={e => setUserID(e.target.value)} type="text" placeholder='userID'></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <p>Hello, this is a pet photo upload!</p>
                <form onSubmit={petPhotosubmit}>
                    <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
                    <input value={petID} onChange={e => setPetID(e.target.value)} type="text" placeholder='petID'></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <p>Hello, this is a training photo upload!</p>
                <form onSubmit={trainingPhotosubmit}>
                    <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
                    <input value={trainID} onChange={e => setTrainID(e.target.value)} type="text" placeholder='trainID'></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default s3Page