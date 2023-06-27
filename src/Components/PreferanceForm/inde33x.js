import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Form = ({ orderId, count }) => {
  const [foodPreference, setFoodPreference] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");
  const [memberOtherFoodPreference, setMemberOtherFoodPreference] =
    useState("");
  const [partnerOtherFoodPreference, setPartnerOtherFoodPreference] =
    useState("");
  const [allergies, setAllergies] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [pitch, setPitch] = useState("");
  const [personalDevelopment, setPersonalDevelopment] = useState([]);
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partnerPhoneNumber, setPartnerPhoneNumber] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerFoodPreference, setPartnerFoodPreference] = useState("");
  const [wishItem, setWishItem] = useState("");
  const navigate = useNavigate();
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);

  const hasJsonStructure = (str) => {
    if (typeof str !== "string") return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === "[object Object]" || type === "[object Array]";
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      foodPreference === "" ||
      (foodPreference === "other" && partnerOtherFoodPreference === "") ||
      favoriteDrink === "" ||
      allergies === "" ||
      superpower === "" ||
      pitch === "" ||
      personalDevelopment.length === 0
    ) {
      alert("Please fill all the fields");
    }

    setIsSavingData(true);
    const createPreferenceResponse = await axios.post(
      "https://riekolpayment.vercel.app/createPreference",
      {
        order_id: orderId,
        email: partnerEmail,
        contact_number: phoneNumber,
        food_preference: foodPreference,
        favourite_drink: favoriteDrink,
        alergy: allergies,
        personal_d_area: JSON.stringify(personalDevelopment),
        super_power: superpower,
        e_pitch: pitch,
        partner_food_preference: partnerFoodPreference,
        intend_to_visit: wishItem,
        partner_contact_number: partnerPhoneNumber,
      }
    );
    setIsSavingData(false);
    if (createPreferenceResponse.data) {
      Swal.fire({
        icon: "success",
        title: "Your form has been submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const names = [
    "Wellness and health",
    "Soft skills ( negotiation / communication / Team Building)",
    "Personal wealth management",
    "Time management",
    "Holistic living /Spirituality",
  ];

  function isValidEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  }

  const handleChange = (event) => {
    console.log("hi");
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setPartnerEmail(event.target.value);
  };

  const getPreferenceByOrderId = () => {
    setIsFetchingDetails(true);
    axios
      .post("https://riekolpayment.vercel.app/getPreferenceByOrderId", {
        order_id: orderId,
      })
      .then((response) => {
        setIsFetchingDetails(false);
        if (response.data) {
          console.log(response.data);
          if (response.data.id) {
            setFoodPreference(response.data.food_preference);
            setFavoriteDrink(response.data.food_preference);
            setAllergies(response.data.alergy);
            setSuperpower(response.data.super_power);
            setPitch(response.data.e_pitch);
            setPersonalDevelopment(
              !!response.data.personal_d_area &&
                hasJsonStructure(response.data.personal_d_area)
                ? JSON.parse(response.data.personal_d_area)
                : []
            );
            setPhoneNumber(response.data.contact_number);
            setPartnerPhoneNumber(response.data.partner_contact_number);
            setPartnerEmail(response.data.email);
            setPartnerFoodPreference(response.data.partner_food_preference);
            setWishItem(response.data.intend_to_visit);
          }
        }
      });
  };

  useEffect(() => {
    getPreferenceByOrderId();
  }, []);

  console.log(error, "error");

  return isFetchingDetails ? (
    <Box
      height="90vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
    </Box>
  ) : (
    <form onSubmit={handleSubmit}>
      <h2 className="text-1xl font-bold text-gray-900 mb-5">
        Preference Registration
      </h2>
      <Grid container rowSpacing={4} alignItems="center" justify="center">
        <Grid item xs={12}>
          <TextField
            required
            inputProps={{ type: "number", maxLength: 15 }}
            id="phoneNumber"
            label="Phone Number"
            variant="standard"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormHelperText>
            Please enter your phone number with country code
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="foodPreference-label">Food Preference</InputLabel>
            <Select
              labelId="foodPreference-label"
              id="foodPreference"
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
              label="Food Preference"
              required
            >
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="gluten-free">Gluten Free</MenuItem>
              <MenuItem value="other">Other (Specify)</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText>Please select your food preference</FormHelperText>
        </Grid>
        {foodPreference === "other" && (
          <Grid item xs={12}>
            <TextField
              required
              id="otherFoodPreference"
              label="Specify Other Food Preference"
              variant="standard"
              fullWidth
              value={memberOtherFoodPreference}
              onChange={(e) => setMemberOtherFoodPreference(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id="favoriteDrink"
            label="My Favorite Drink"
            variant="standard"
            fullWidth
            required
            value={favoriteDrink}
            onChange={(e) => setFavoriteDrink(e.target.value)}
          />
          <FormHelperText>
            Please enter your favorite drink (alcoholic or non-alcoholic)
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="allergies"
            required
            label="Please specify if you have any allergies"
            variant="standard"
            fullWidth
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <FormHelperText>
            Please specify if you have any allergies
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="development-areas">Important Areas</InputLabel>
            <Select
              variant="outlined"
              multiple
              value={personalDevelopment}
              onChange={(e) => setPersonalDevelopment(e.target.value)}
              input={<Input label="Multiple Select" />}
              required
              labelId="development-areas"
              renderValue={(selected) => (
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() =>
                        setPersonalDevelopment(
                          personalDevelopment.filter((item) => item !== value)
                        )
                      }
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  ))}
                </Stack>
              )}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  sx={{ justifyContent: "space-between" }}
                >
                  {name}
                  {personalDevelopment.includes(name) ? (
                    <CheckIcon color="info" />
                  ) : null}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText>
            What are the two most important areas of personal development that
            you would like to seek
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="superpower"
            label="My superpower is "
            variant="standard"
            fullWidth
            required
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
          />
          <FormHelperText>
            Please enter your superpower (something you are really good at)
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="pitch"
            label="My elevator Pitch is"
            variant="standard"
            fullWidth
            value={pitch}
            required
            onChange={(e) => setPitch(e.target.value)}
          />
          <FormHelperText>
            Please enter your elevator pitch (something you would like to share)
          </FormHelperText>
        </Grid>

        {/* If Spouse is Selected */}
        {/* {count === 2 && (
        )} */}

        <>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              inputProps={{ type: "email", maxLength: 30 }}
              label="Partner's Email ID"
              variant="standard"
              fullWidth
              value={partnerEmail}
              onChange={handleChange}
            />
            <FormHelperText>
              Please enter your partner's email ID
            </FormHelperText>
            {error && (
              <FormHelperText error>
                Please enter a valid email ID
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              inputProps={{ type: "number" }}
              label="Partner's Phone Number"
              variant="standard"
              fullWidth
              value={partnerPhoneNumber}
              onChange={(e) => setPartnerPhoneNumber(e.target.value)}
            />
            <FormHelperText>
              Please enter your partner's phone number with country code
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="partner-foodPreference-label">
                {" "}
                Partner's Preference
              </InputLabel>
              <Select
                labelId="partner-foodPreference-label"
                id="foodPreference"
                value={partnerFoodPreference}
                onChange={(e) => setPartnerFoodPreference(e.target.value)}
                label="Food Preference"
                required
                variant="standard"
              >
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="gluten-free">Gluten Free</MenuItem>
                <MenuItem value="partnerOther">Other (Specify)</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText>
              Please select your partner's food preference
            </FormHelperText>
          </Grid>
          {partnerFoodPreference === "partnerOther" && (
            <Grid item xs={12}>
              <TextField
                required
                id="partnerOtherFoodPreference"
                label="Specify Other Food Preference"
                variant="standard"
                fullWidth
                value={partnerOtherFoodPreference}
                onChange={(e) => setPartnerOtherFoodPreference(e.target.value)}
              />
            </Grid>
          )}
        </>
        <Grid item xs={12}>
          <TextField
            required
            id="wishItem"
            label="Intend to visit"
            variant="standard"
            fullWidth
            value={wishItem}
            onChange={(e) => setWishItem(e.target.value)}
          />
          <FormHelperText>
            The one thing You wish to definitely see in Kolkata RIE
          </FormHelperText>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            disabled={isSavingData}
            type="submit"
          >
            {isSavingData && <CircularProgress size={18} sx={{ mr: 1 }} />}
            {isSavingData ? "Saving..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
