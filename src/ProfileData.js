import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import './ProfileData.css';
import { useAtom } from 'jotai';
import { emailAtom } from './login';
import { useNavigate } from 'react-router-dom';

const ProfileData = () => {
  const [profileData, setProfileData] = useState(null);
   const[emailId]=useAtom(emailAtom);
   const navigate =useNavigate();

  useEffect(() => {
    

    const fetchProfileData = async () => {
      try {
        console.log(emailId,"emailId");
        const encodedEmail = encodeURIComponent(localStorage.getItem("emailId"));
        const response = await axios.get(`http://localhost:8080/api/v1/customer/${encodedEmail}`);
        setProfileData(response.data);
        console.log(response.data);
        
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
  }, [emailId]);

  return (
    <Container maxWidth="sm" className="profile-container">
      <h2 className="profile-heading">Profile Page</h2>
      <div className="customer-info">
        <h3>Customer Information</h3>
        <p><b>Username:</b> {profileData?.username}</p>
        <p><b>Email:</b> {profileData?.emailId}</p>
        <p><b>Phone Number:</b> {profileData?.phoneNumber}</p>
      </div>
      <div className="addresses">
        <h3>Addresses</h3>
        {profileData?.address.map((address, index) => (
          <div key={address.addressId} className="address">
            <h4>Address {index + 1}</h4>
            <p>Address Line: {address.addressLine}</p>
            <p>City: {address.city}</p>
            <p>Region: {address.region}</p>
            <p>State: {address.state}</p>
            <p>Postal Code: {address.postalCode}</p>
            <p>Country: {address.country}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProfileData;
