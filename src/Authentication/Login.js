import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useAtom } from "jotai";
import { emailAtom } from "../Atoms/atoms";

import { useNavigate } from "react-router-dom";

function Login() {
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

      setEmailId(getValues("emailId"));
      localStorage.setItem("emailId", getValues("emailId"));

      if (response.status === 200) {
        window.location.reload(true);
        () => navigate("/display");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container maxWidth="xs" className="container">
        <Typography
          variant="h4"
          className="heading"
          style={{ color: "blue", marginBottom: "10px", fontWeight: "bold" }}
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
          {errors.emailId && <span> enter valid email</span>}
          <br />
          <br />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: true })}
            className="textField"
          />
          {errors.password && <span> enter valid password</span>}
          <br />
          <br />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="submitButton"
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}
export default Login;
