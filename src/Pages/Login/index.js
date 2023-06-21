import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState(" ");
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState(" ");
  const [error, setError] = useState(" ");
  // const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data, error } = await supabase.from("tb1").select("*");
    // .eq("emailId", email);

    if (error) {
      setEmailError("Please enter your EO email or reach your EO Chapter");
    }
    if (data) {
      const found = data.find(({ emailId }) => emailId === email);
      if (found) {
        localStorage.setItem("email", email);
        localStorage.setItem("currency", found.Currency);
        navigate("/layout");
      } else {
        setEmailError("Please enter your EO email or reach your EO Chapter");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === " " || email === null) {
      setEmailError("Please enter email");
      return;
    }
    if (checked === false) {
      setError("Please accept disclaimer");
      return;
    }
    if (email && checked) {
      fetchData();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(" ");
  };

  const handleCheckChange = (e) => {
    setChecked(e.target.checked);
    setError(" ");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rie-Kol
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "22vw" }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter EO Global website/app login email (EO Hub)"
              onChange={(e) => handleEmailChange(e)}
            />
            {emailError && (
              <span style={{ color: "red", fontSize: "12px", margin: "5px" }}>
                {emailError}
              </span>
            )}
            <br />

            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onChange={(e) => handleCheckChange(e)}
              label="Remember me"
            />
            <br />
            {error && (
              <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
            >
              Proceed
            </Button>
           
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
