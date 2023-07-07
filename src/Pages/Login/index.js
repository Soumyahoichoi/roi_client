
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/RIE-KOL-Logo.png"
import './style.css';
import { IconButton } from "@mui/material";

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
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(true);
  const [emailError, setEmailError] = useState(" ");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const navigate = useNavigate();

  const allowUserToCheckout = (previousOrdersList = []) => {
    console.log({
      previousOrdersList,
    });

    //   let amount =
    //   count === 1
    //     ? calculateCheckoutAmount.member
    //     : calculateCheckoutAmount.totalAmount;
    // let candidate = count === 2 ? "both" : "member";
    let reference_id = null;

    if (previousOrdersList.length > 0) {
      if (
        (previousOrdersList.length === 1 &&
          previousOrdersList[0].candidate === "both") ||
        previousOrdersList.length === 2
      ) {
        const order = previousOrdersList[previousOrdersList.length - 1];
        navigate(
          `/payment-successed?order_no=${order.order_id}&amount=${order.amount}`
        );
        return false;
      } else if (
        previousOrdersList.length === 1 &&
        previousOrdersList[0].candidate === "member"
      ) {
        localStorage.setItem("candidate", previousOrdersList[0].candidate);
      }
    }

    return true;
  };

  const fetchData = async () => {
    localStorage.removeItem("candidate");
    const { data, error } = await axios.post(
      "https://riekolpayment.vercel.app/getMemberByEmail",
      {
        email,
      }
    );

    if (error) {
      console.log(error, "error");
      setEmailError("Please enter your EO email or reach your EO Chapter");
    }
    if (data) {
      console.log(data, "data");
      const found = data;
      setLoading(false);
      if (found) {
        const checkForExistingOrderByEmailResponse = await axios.post(
          "https://riekolpayment.vercel.app/checkForExistingOrderByEmail",
          {
            email,
          }
        );

        if (
          allowUserToCheckout(checkForExistingOrderByEmailResponse.data.data)
        ) {
          localStorage.setItem("email", email);
          // localStorage.setItem("currency", found.Plan);
          localStorage.setItem("plan", found.plan);
          if (found.plan === "Plan 1") {
            localStorage.setItem("voucher", found.VoucherINR);
          } else {
            localStorage.setItem("voucher", found.VoucherUSD);
          }
          navigate("/layout");
        }
      } else {
        setEmailError("Please enter your EO email or reach your EO Chapter");
      }
    }

    setLoading(false);
    setEmailError("Please enter your EO email or reach your EO Chapter");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || email === null) {
      setEmailError("Please enter email");
      return;
    }
    if (checked === false) {
      setError("Please accept disclaimer");
      return;
    }
    if (email && checked) {
      setLoading(true);
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
      <Container component="main" maxWidth="">
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

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img src={logo} alt="Logo" className="logo-avatar" />
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              width: "100%", // Adjust the width based on your needs
              maxWidth: "400px", // Set the maximum width for the form
            }}
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
              <span style={{ color: "red", fontSize: "14px", margin: "5px" }}>
                {emailError}
              </span>
            )}
            <br />
            <Box sx={{  
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
            }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onChange={(e) => handleCheckChange(e)}
              checked={checked}
              sx={{mx: 0}}
            />
            <div className="text-gray-500 font-sans text-sm">
              I agree to the
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.riekol.com/event-waiver"
                className="text-gray-800"
              >
                {" "}
                Event Waiver,{" "}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.riekol.com/termsofservices"
                className="text-gray-800"
              >
                {" "}
                Terms of Service,{" "}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.riekol.com/privacypolicy"
                className="text-gray-800 px-1"
              >
                {" "}
                Privacy Policy{" "}
              </a>{" "}
              and
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.riekol.com/cancellationpolicy"
                className="text-gray-800"
              >
                {" "}
                Cancellation Policy
              </a>
            </div>
            </Box>
            <br />
            {error && (
              <span style={{ color: "red", fontSize: "14px" ,margin: "5px" }}>{error}</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: "bold" ,fontSize: "16px" }}
            >
              Proceed
            </Button>
          </Box>
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
