import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";  
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImg from 'client/src/assets/images/farm.jpeg';


import { sendOtp,signup } from "../api/functions";
import { useQuery } from "@tanstack/react-query";
import { setAccessToken, setRefreshToken } from "../storage/io";
import { redirect } from "react-router-dom";

const theme = createTheme();

export default function Signup() {
  const [isOTP, setIsOTP] = React.useState(true);
  const [isSendOTP, setIsSendOTP] = React.useState(true);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  

  const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    const res = await sendOtp(phone)
    console.log({firstName, lastName, phone});
    if(res.message === "otp sent!") {
      setIsOTP(false);
      setIsSendOTP(false);
    }
  };

  const handleResendOtp = async () => {
    const res = await sendOtp(phone);
    alert(res.message);;
  }

  const handleSignUp = async () => {
    const res = await signup(firstName, lastName, phone, otp);
    if(res.message === "User created") {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      location.href = "/dashboard";
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
        <CssBaseline />
        <Box
        sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
            
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 3,
              mt: 0,
              border: "2px solid #ccc",
              borderRadius: 2,
            }}
          >
           
            <Typography component="h1" variant="h5" textAlign="center">
              Create A New Account
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneno"
                    label="Phone Number"
                    name="phoneno"
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled = {isOTP}
                    required
                    fullWidth
                    name="otp"
                    label="OTP "
                    id="otp"
                    onChange={(e) => { setOtp(e.target.value) }}
                  />
                </Grid>
               
                <Grid container justifyContent="flex-end">
                <Grid  xs={12} sm={4} item>
                  <Link onClick={handleResendOtp} variant="body2">
                  Resend OTP
                  </Link>
                </Grid>
              </Grid>

              
              </Grid>
              {
                isSendOTP ?
                <Button
                onClick={handleSendOtp}
                // type="submit"
                variant="contained"
                sx={{
                  mb: 2,
                  backgroundColor: "",
                  // "&:hover": {
                  //   backgroundColor: "darkGreen",
                  // },
                  alignItems: "center"
                }}
                >
                Send OTP
              </Button> :
              <Button
              onClick={handleSignUp}
              // type="submit"
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: "",
                "&:hover": {
                  backgroundColor: "darkGreen",
                },
              }}
            >
              Sign up
            </Button>
              }

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}