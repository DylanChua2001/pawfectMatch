'use client' 

require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const crypto = require('crypto');
const sharp = require('sharp');


const storage = multer.memoryStorage();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

//Random Name Generator
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex') //rename the photo



const s3Controller = {
    uploadImage : async (req, res) => {
        try{    
            const {userID} = req.params

            if (!req.file) {
                console.error('No file uploaded');
                return res.status(400).send('No file uploaded');
            }
            console.log("req.body", req.body);
            console.log("req.file", req.file);
            /* Logging of req.file
                Display :             
                field name : image
                original name : "_____.png"
                buffer - most important to send into S3
            */

            //Generating a Unique Name for a Photo
            const imageName = randomImageName()

            //resize image
            const fileBuffer = await sharp(req.file.buffer).resize({
                height : 500, 
                width : 500,
                fit: 'contain',
            }).toBuffer()
                            
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: fileBuffer,
                ContentType: req.file.mimetype
            };

            const command = new PutObjectCommand(params);
            const response = await s3.send(command);
            console.log('S3 Response:', response);
            console.log('Photo ID', imageName )

            const updateResponse = await fetch(`http://localhost:3001/api/users/uploadUserImageID/${userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photoID: imageName
                })
            })
    
            if (updateResponse.ok) {
                res.status(200).json({
                    message: 'File Uploaded Successfully and Photo ID Updated in Database',
                    imageName : imageName
                });
            } else {
                throw new Error('Failed to update photo ID in database');
            }

        } catch (error) {
            console.error('Error uploading file to S3:', error);
            res.status(500).send('Error uploading file');
        }
        
    },

    displayImage : async (req, res) => {
        try {
            const {userID} = req.params

            const responsePhoto = await fetch(`http://localhost:3001/api/users/retrieveUserImageID/${userID}`, {
                method: 'GET',
            });

            if (!responsePhoto.ok) {
                throw new Error(`Failed to fetch user photo for userID ${userID}`);
            }

            const responseData = await responsePhoto.json();

            const user_photo = responseData.userImage[0].user_image_id

            const getObjectParams = {
                Bucket: bucketName,
                Key: user_photo
            }
            const command = new GetObjectCommand(getObjectParams);

            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            responseData.userImage[0].photo_url = url;

                 // Send updated responseData back in response
                res.json(responseData);
        } catch (error) {
            console.error('Error fetching or processing photo:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
 }

module.exports = s3Controller;