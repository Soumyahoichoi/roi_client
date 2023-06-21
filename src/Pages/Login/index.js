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

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState(" ");
  const [checked, setChecked] = useState(true);
  const [emailError, setEmailError] = useState(" ");
  const [error, setError] = useState(" ");
  // const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data, error } = await supabase
    .from("MembersList")
    .select("VoucherUSD,Plan,emailaddress,VoucherINR")
    .eq("emailaddress", email);

    if (error) {
      setEmailError("Please enter your EO email or reach your EO Chapter");
    }
    if (data) {
      const found = data.find(({ emailaddress }) => emailaddress === email);
      
      if (found) {
        localStorage.setItem("email", email);
        // localStorage.setItem("currency", found.Plan);
        localStorage.setItem("plan", found.Plan);
        if(found.Plan === "Plan 1"){
          localStorage.setItem("voucher", found.VoucherINR);
        }
        else {
          localStorage.setItem("voucher", found.VoucherUSD);
        }
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
              checked={checked}
            />
            <span className="text-gray-400">I agree to the 
             <a href="https://www.riekol.com/event-waiver" className="text-decoration-line: underline"> Event Waiver, </a>
             <a href="https://www.riekol.com/termsofservices" className="text-decoration-line: underline"> Terms of Service, </a>
             <a href="https://www.riekol.com/privacypolicy" className="text-decoration-line: underline"> Privacy Policy </a> and
             <a href="https://www.riekol.com/cancellationpolicy" className="text-decoration-line: underline">  Cancellation Policy</a>
            </span>
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
