import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
      setLoading(false);
      console.log(error, "error");
      setEmailError("Please enter your EO email or reach your EO Chapter");
    }
    if (data) {
      console.log(data, "data");
      const found = data;
      setLoading(false);
      if (found) {
        const checkForExistingOrderByEmailResponse = await axios.post(
          "http://localhost:4000/checkForExistingOrderByEmail",
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
          if (found.Plan === "Plan 1") {
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

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
              <span style={{ color: "red", fontSize: "12px", margin: "5px" }}>
                {emailError}
              </span>
            )}
            <br />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onChange={(e) => handleCheckChange(e)}
              checked={checked}
            />
            <span className="text-gray-500 font-sans text-sm">
              I agree to the
              <a
                href="https://www.riekol.com/event-waiver"
                className="text-decoration-line: underline"
              >
                {" "}
                Event Waiver,{" "}
              </a>
              <a
                href="https://www.riekol.com/termsofservices"
                className="text-decoration-line: underline"
              >
                {" "}
                Terms of Service,{" "}
              </a>
              <a
                href="https://www.riekol.com/privacypolicy"
                className="text-decoration-line: underline"
              >
                {" "}
                Privacy Policy{" "}
              </a>{" "}
              and
              <a
                href="https://www.riekol.com/cancellationpolicy"
                className="text-decoration-line: underline"
              >
                {" "}
                Cancellation Policy
              </a>
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
