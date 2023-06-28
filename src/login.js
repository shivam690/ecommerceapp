import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useState } from "react";
import { useAtom, atom } from "jotai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";
const emailAtom = atom("");
function Login1() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const [emailid, setEmailId] = useAtom(emailAtom);
  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          emailId: getValues("emailId"),
          password: getValues("password"),
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/signin",
        data,
        config
      );
      console.log(getValues("emailId"));
      setEmailId(getValues("emailId"));
      localStorage.setItem("emailId",getValues("emailId"));
      if (response.status === 200) {
        Swal.fire("Welcome!", "Login Sucessfull", "success")
        
         navigate("/display");
        window.location.reload(true);
        
        
      }
     
        
    } catch (error) {
      Swal.fire("Welcome!", "Error", "error")
      console.error(error);
      
    }
  };
  return (
    <div className="body-main">
      <Box maxWidth="xs" className="container-xy">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
          borderRadius="20px"
          border="2px solid black" /* Added border style */
          padding="80px" /* Added padding */
          //backgroundColor="lightgray"
          style={{
            backgroundImage:
              "url(/img/black-friday-elements-assortment (1).jpg)" /* Replace with the path to your JPG image */,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
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
            User Login
          </Typography>
          <br />
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
  <TextField
    label="Email"
    fullWidth
    {...register("emailId", { required: true })}
    onChange={(e) => setEmailId(e.target.value)}
    className="textField"
  />
  {errors.emailId && (
    <span className="error-span"> Enter valid Email</span>
  )}
  <br />
  <br />
  <TextField
    label="Password"
    type="password"
    fullWidth
    {...register("password", { required: true })}
    className="textField"
  />
  {errors.password && (
    <span className="error-span"> Enter valid Password</span>
  )}
  <br />
  <br />
  <Button
    type="submit"
    variant="contained"
    color="secondary"
    className="submitButton"
    style={{ width: "100%", textAlign: "center" }}
  >
    Login
  </Button>
</form>

        </Box>
      </Box>
    </div>
  );
}
export { emailAtom };
export default Login1;
