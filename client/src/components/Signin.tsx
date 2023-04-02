import * as React from "react";
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

const theme = createTheme();

export default function Signup() {
  const [isOTP, setIsOTP] = React.useState(true);
  const [isSendOTP, setIsSendOTP] = React.useState(true);
  //   const [firstName, setFirstName] = React.useState('');
  //   const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    const res = await sendOtp(phone);
    console.log({ phone });
    if (res.message === "otp sent!") {
      setIsOTP(false);
      setIsSendOTP(false);
    }
  };

  const handleResendOtp = async () => {
    const res = await sendOtp(phone);
    alert(res.message);
  };

  const handleSignUp = async () => {
    try {
      const res = await signin(phone, otp);
      if (res.message === "success") {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
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
                    disabled={isOTP}
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
                  Sign in
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
