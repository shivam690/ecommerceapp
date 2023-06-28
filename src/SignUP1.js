import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState ,useRef} from "react";
import { Button, Container, TextField, Typography ,Alert} from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import "./SignUp1.css";

const StyledContainer = styled(Container)`
  display: flex;
  border: 1px solid red;
  flex-direction: column;
  justifycontent: center;
  alignitems: center;
  minheight: 10vh;
  borderradius: 20px;
  border: 3px solid black; /* Added border style */
  padding: 30px; /* Added padding */
  backgroundcolor: lightgray;
`;

const SignUp1 = () => {
  const formRef = useRef(null);
  const [signupSuccess, setSignUpSuccess] = useState(false);
  const [errAlert , seterrAlert]=useState();
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    phoneNumber: "",
    password: "",
    address: [
      {
        addressLine: "",
        city: "",
        region: "",
        state: "",
        postalCode: "",
        country: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const fieldPath = name.split(".");
      const field = fieldPath[fieldPath.length - 1];

      setFormData((prevData) => ({
        ...prevData,
        address:[
          {
            ...prevData.address[0],
            [field]: value,
          },
        ],
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
      const response = await axios.post(
        "http://localhost:8080/api/v1/signup",
        formData
      );
      console.log(response);
      if(response.status===200)
      { Swal.fire("Ok", "User Added", "success");
        navigate("/login");
    }

    
      

    } catch (error) {
      console.error(error);
      
    }

    
  };

  return (
    <div className="body-main">
        {signupSuccess&& (
            <Alert variant="filled" severity="success">
              User Register successful !
            </Alert>
          )}

        {errAlert&& (
            <Alert variant="filled" severity="error">
              {errAlert}
            </Alert>
          )}
      <StyledContainer maxWidth="sm"  className="container-xy">
        <Typography
          variant="h4"
          align="center"
          className="heading"
          style={{
            color: "purple",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          User SignUP
        </Typography>
        <br />
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextField
            type="text"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            type="text"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            type="email"
            label="Email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          <br />
          <Typography variant="h5" 
          color="purple"
          align="center"
            >Address</Typography>
          <TextField
            type="text"
            label="Address Line"
            name="address.addressLine"
            value={formData.address[0].addressLine}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            type="text"
            label="City"
            name="address.city"
            value={formData.address[0].city}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            type="text"
            label="Region"
            name="address.region"
            value={formData.address[0].region}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            type="text"
            label="State"
            name="address.state"
            value={formData.address[0].state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            type="text"
            label="Postal Code"
            name="address.postalCode"
            value={formData.address[0].postalCode}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            type="text"
            label="Country"
            name="address.country"
            value={formData.address[0].country}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <br/>
          <br/>
          <Button
            type="submit"
            className="submit-button"
            variant="contained"
            style={{
        
        backgroundColor: "Blue",
        
        fontSize: "18px"
    }}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </StyledContainer>
    </div>
  );
};

export default SignUp1;
