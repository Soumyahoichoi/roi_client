import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Grid, OutlinedInput, Stack , Chip, FormHelperText} from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";


const Form = () => {
  const [foodPreference, setFoodPreference] = useState('');
  const [favoriteDrink, setFavoriteDrink] = useState('');
  const [otherFoodPreference, setOtherFoodPreference] = useState('');
  const [allergies, setAllergies] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [pitch, setPitch] = useState('');
  const [personalDevelopment, setPersonalDevelopment] = useState([]);
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [partnerPhoneNumber, setPartnerPhoneNumber] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerFoodPreference, setPartnerFoodPreference] = useState('');
  const [wishItem, setWishItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodPreference === '' || (foodPreference === 'other' && otherFoodPreference === '') || favoriteDrink === '' || allergies === '' || superpower === '' || pitch === '' || personalDevelopment.length === 0) {
      alert('Please fill all the fields');
    }
    // Perform any necessary form data processing or submission here
    console.log('Submitted:', { foodPreference, favoriteDrink , otherFoodPreference,allergies,superpower,pitch,personalDevelopment});
  };

  const names = [
    "Wellness and health",
    "Soft skills ( negotiation / communication / Team Building)",
    "Personal wealth management",
    "Time management",
    "Holistic living /Spirituality"
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="foodPreference-label">Food Preference</InputLabel>
            <Select
              labelId="foodPreference-label"
              id="foodPreference"
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
              label="Food Preference"
              required
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="gluten-free">Gluten Free</MenuItem>
              <MenuItem value="other">Other (Specify)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {foodPreference === 'other' && (
          <Grid item xs={12}>
            <TextField
              required
              id="otherFoodPreference"
              label="Specify Other Food Preference"
              variant="outlined"
              fullWidth
              value={otherFoodPreference}
              onChange={(e) => setOtherFoodPreference(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id="favoriteDrink"
            label="My Favorite Drink"
            variant="outlined"
            fullWidth
            required
            value={favoriteDrink}
            onChange={(e) => setFavoriteDrink(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            id="allergies"
            required
            label="Please specify if you have any allergies"
            variant="outlined"
            fullWidth
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="development-areas">Important Areas</InputLabel>
            <Select
              multiple
              value={personalDevelopment}
              onChange={(e) => setPersonalDevelopment(e.target.value)}
              input={<OutlinedInput label="Multiple Select" />}
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
                  {personalDevelopment.includes(name) ? <CheckIcon color="info" /> : null}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText>What are the two most important areas of personal development that you would like to seek</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="superpower"
            label="My superpower is "
            variant="outlined"
            fullWidth
            required
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="pitch"
            label="My elevator Pitch is"
            variant="outlined"
            fullWidth
            value={pitch}
            required
            onChange={(e) => setPitch(e.target.value)}
          />
        </Grid>

        {/* If Spouse is Selected */}

        <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              label="Partner's Email ID"
              variant="outlined"
              fullWidth
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
            />
          </Grid>

        <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              label="Partner's Phone Number"
              variant="outlined"
              fullWidth
              value={partnerPhoneNumber}
              onChange={(e) => setPartnerPhoneNumber(e.target.value)}
            />
          </Grid>


        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="partner-foodPreference-label"> Partner's Food Preference</InputLabel>
            <Select
              labelId="partner-foodPreference-label"
              id="foodPreference"
              value={partnerFoodPreference}
              onChange={(e) => setPartnerFoodPreference(e.target.value)}
              label="Food Preference"
              required
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="gluten-free">Gluten Free</MenuItem>
              <MenuItem value="other">Other (Specify)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {foodPreference === 'other' && (
          <Grid item xs={12}>
            <TextField
              required
              id="partnerOtherFoodPreference"
              label="Specify Other Food Preference"
              variant="outlined"
              fullWidth
              value={otherFoodPreference}
              onChange={(e) => setOtherFoodPreference(e.target.value)}
            />
          </Grid>
        )}

           <Grid item xs={12}>
            <TextField
              required
              id="wishItem"
              label="Intend to visit"
              variant="outlined"
              fullWidth
              value={wishItem}
              onChange={(e) => setWishItem(e.target.value)}
            />
            <FormHelperText>The one thing I wish to definitely see in Kolkata RIE</FormHelperText>
          </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
