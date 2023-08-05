import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { config } from '../services/config';
const AWS = require('aws-sdk');

AWS.config.update({ region: config.REGION }); // Replace 'YOUR_AWS_REGION' with your desired AWS region


async function uploadImageToS3(imageFile) {
    // Check if the image file exists
    if (!imageFile) {
      console.error('No image file selected.');
      throw new Error('No image file selected.');
    }

  const fileKey = `images/${Date.now()}_${imageFile.name}`; // Define a unique key for the file in the bucket

  const params = {
    Bucket: config.SPOT_PHOTO_S3_BUCKET,
    Key: fileKey,
    Body: imageFile, // The actual image file data
    ContentType: imageFile.type, // The MIME type of the image
  };

  try {
    const s3 = new AWS.S3();
    const result = await s3.upload(params).promise();

    // Return the URL of the uploaded file
    return result.Location;
  } catch (error) {
    console.log('Error uploading image:', error);
    throw error;
  }
}



const IntroduceSpot = () => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [introducedBy, setIntroducedBy] = useState('');

  // Get the current Cognito user's properties
  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setIntroducedBy(user.username);
    } catch (error) {
      console.log('Error getting current user:', error);
    }
  };

  // Handle photo upload
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  // Handle form submission
  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
        // Upload the photo to S3 and get the URL
        const photoUrl = await uploadImageToS3(photo);

        console.log('Photo URL:', photoUrl);
        // Create a JSON object with all the user-filled information
        const spotData = {
            description,
            name,
            address,
            introducedBy,
            photoUrl,
        };

        const requestURL = config.api;

    // Get the current authenticated user
    const user = await Auth.currentAuthenticatedUser();

    // Get the Cognito token
    const token = user.signInUserSession.idToken.jwtToken;

    console.log('token:', token);
        // Make a POST request to your API
        const res = await fetch(requestURL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(spotData),
        })


        const resJSON = await res.json();
        console.log('Response from API:', resJSON);

        console.log('Spot data:', spotData);
    } catch (error) {
      console.error('Error submitting spot:', error);
    }
  };

  // Call getCurrentUser to populate "Introduced by" on component mount
  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <h1>Introduce a Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Introduced by:
          <input
            type="text"
            value={introducedBy}
            readOnly // This makes the field read-only
          />
        </label>
        <br />
        <label>
          Upload Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IntroduceSpot;
