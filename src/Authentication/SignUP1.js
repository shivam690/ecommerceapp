import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./SignUp1.css";
const SignUp1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailId: '',
    phoneNumber: "",
    password: '',
    address: [{
      
      addressLine: '',
      city: '',
      region: '',
      state: '',
      postalCode: '',
      country: '',
    }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const fieldPath = name.split('.');
      const field = fieldPath[fieldPath.length - 1];

      setFormData((prevData) => ({
        ...prevData,
        address: [{
          ...prevData.address[0],
          [field]: value,
        }],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/signup', formData);
      console.log(response);
      
      
    } 
    catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className='container'>
      <h4 className='heading'>Sign Up</h4>
      <br/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <br/>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <br/>
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <h6>Address</h6>
        <input
          type="text"
          name="address.addressLine"
          placeholder="Address Line"
          value={formData.address[0].addressLine}
          onChange={handleChange}
        />
        <input
        className='form-input'
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address[0].city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.region"
          placeholder="Region"
          value={formData.address[0].region}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={formData.address[0].state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.postalCode"
          placeholder="Postal Code"
          value={formData.address[0].postalCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.country"
          placeholder="Country"
          value={formData.address[0].country}
          onChange={handleChange}
        />
        <button type="submit" className='submit-button'>Sign Up</button>
      </form>
    </div>
  )}
  export default SignUp1;
