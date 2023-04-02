import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sendOtp, signup } from "../api/functions";
import { setAccessToken, setRefreshToken } from "../storage/io";
import { FormEvent, useState, useRef } from "react";

const theme = createTheme();

export default function Signup() {
  const [isOTP, setIsOTP] = useState(true);
  const [isSendOTP, setIsSendOTP] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otpHelper, setotpHelper] = useState("");

  const [firstNameError, setfirstNameError] = useState(false);
  const [firstNameHelper, setfirstNameHelper] = useState("");

  const [lastNameError, setlastNameError] = useState(false);
  const [lastNameHelper, setlastNameHelper] = useState("");

  const [phoneError, setphoneError] = useState(false);
  const [phoneHelper, setphoneHelper] = useState("");

  
  const validateForm = () : boolean => {
    var bool: boolean = true;
    if(firstName.length < 3) {
      setfirstNameError(true);
      setfirstNameHelper("Atleast 3 characters")
      bool =  false;
    }

    if(lastName.length < 3) {
      setlastNameError(true);
      setlastNameHelper("Atleast 3 characters");
      bool =  false;
    }
    
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




  const handleSendOtp = async (event: FormEvent<HTMLFormElement>) => {
    if(validateForm()) {
      const res = await sendOtp(phone);
      console.log({ firstName, lastName, phone });
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

  const handleSignUp = async () => {
    if(validateOTP()) {
      const res = await signup(firstName, lastName, phone, otp);
      if (res.message === "User created") {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        location.href = "/dashboard";
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    
                    autoComplete="given-name"
                    name="firstName"
                    error={firstNameError}
                    helperText={firstNameHelper}
                    onFocus={ ()=> {setfirstNameError(false); setfirstNameHelper(""); } }
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    error={lastNameError}
                    helperText={lastNameHelper}
                    onFocus={ ()=> {setlastNameError(false); setlastNameHelper(""); } }
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Grid>
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

                <Grid sx={ { m:2 } } container justifyContent="flex-end">
                  
                    <Link onClick={handleResendOtp} variant="body2">
                      Resend OTP
                    </Link>
                  
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
                    // "&:hover": {
                    //   backgroundColor: "darkGreen",
                    // },
                    alignItems: "center",
                  }}
                >
                  Send OTP
                </Button>
              ) : (
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
              )}

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
