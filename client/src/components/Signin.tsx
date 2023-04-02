import { FormEvent, useState, useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { sendOtp, signin } from "../api/functions";
import { setAccessToken, setRefreshToken } from "../storage/io";

import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Signup() {
  const [isOTP, setIsOTP] = useState(true);
  const [isSendOTP, setIsSendOTP] = useState(true);
  //   const [firstName, setFirstName] = useState('');
  //   const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpError, setotpError] = useState(false);
  const [otpHelper, setotpHelper] = useState("");

  const [phoneError, setphoneError] = useState(false);
  const [phoneHelper, setphoneHelper] = useState("");

  const validateForm = () : boolean => {
    var bool: boolean = true;
    if(phone.length != 10) {
      setphoneError(true);
      setphoneHelper("Must be 10 digit");
      bool = false;
    }

    return bool;
  }

  const validateOTP = () : boolean => {
    if(otp.length !== 6) {
      setotpError(true);
      setotpHelper("OTP must be 6 digit")
      return false;
    }
    return true;
  }

  const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    if(validateForm()) {
      const res = await sendOtp(phone);
      console.log({ phone });
      if (res.message === "otp sent!") {
        setIsOTP(false);
        setIsSendOTP(false);
      }
      
    }
  };

  const handleResendOtp = async () => {
    if(validateForm()) {
      const res = await sendOtp(phone);
      alert(res.message);

    }
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if(validateOTP()) {
      try {
        const res = await signin(phone, otp);
        if (res.message === "success") {
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          navigate("/dashboard")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 3,
              mt: 0,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in to your Account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={phoneError}
                    helperText={phoneHelper}
                    onFocus={ ()=> {setphoneError(false); setphoneHelper(""); } }
                    id="phoneno"
                    label="Phone Number"
                    name="phoneno"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={otpError}
                    helperText={otpHelper}
                    disabled={isOTP}
                    onFocus={ ()=> {setotpError(false); setotpHelper(""); } }
                    required
                    fullWidth
                    name="otp"
                    label="OTP "
                    id="otp"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </Grid>

                <Grid container justifyContent="flex-end">
                  <Grid xs={12} sm={4} item>
                    <Link onClick={handleResendOtp} variant="body2">
                      Resend OTP
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              {isSendOTP ? (
                //@ts-ignore
                <Button
                  onClick={handleSendOtp}
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
                  Send OTP
                </Button>
              ) : (
                <Button
                  onClick={handleSignIn}
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
                  Sign in
                </Button>
              )}

              <Grid sx={ { m:2 } } container justifyContent="flex-end">
                
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
              
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
