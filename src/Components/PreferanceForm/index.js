import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {
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
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Form = ({ orderId, count }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [isSavingData, setIsSavingData] = useState(false);

  const onSubmit = async (data) => {
    // Perform your form submission logic here
    setIsSavingData(true);
    const {
      allergies,
      countryCode,
      otherFoodPreference,
      developmentAreas,
      email,
      favoriteDrink,
      foodPreference,
      partnerFoodPreference,
      partnerOtherFoodPreference,
      partnerPhoneNumber,
      phoneNumber,
      pitch,
      superpower,
      wishItem,
    } = data;
    console.log(data);

    const formDatas = JSON.stringify({
      order_id: orderId,
      email: email,
      contact_number: `${countryCode} ${phoneNumber}`,
      food_preference: foodPreference,
      favourite_drink: favoriteDrink,
      alergy: allergies,
      personal_d_area: developmentAreas,
      super_power: superpower,
      e_pitch: pitch,
      partner_food_preference: partnerFoodPreference,
      intend_to_visit: wishItem,
      partner_contact_number: partnerPhoneNumber,
      member_other_food_preference: otherFoodPreference || "",
      partner_other_food_preference: partnerOtherFoodPreference || "",
    });

    var config = {
      method: "post",
      url: "https://riekolpayment.vercel.app/createPreference",
      headers: {
        "Content-Type": "application/json",
      },
      data: formDatas,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);

        if (response.data) {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const names = [
    "Wellness and health",
    "Soft skills ( negotiation / communication / Team Building)",
    "Personal wealth management",
    "Time management",
    "Holistic living /Spirituality",
  ];

  useEffect(() => {
    // Fetch data and populate form fields here
  }, []);

  const handleSelectChange = (selected, field) => {
    if (selected.length > 2) {
      selected = selected.slice(0, 2); // Limit the selection to two options
    }
    field.onChange(selected);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-1xl font-bold text-gray-900 mb-5">
        Preference Registration
      </h2>
      <Grid container rowSpacing={4} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Controller
                control={control}
                name="countryCode"
                defaultValue="+91" // Set the default country code here
                render={({ field }) => (
                  <TextField
                    select
                    label="Country Code"
                    variant="standard"
                    fullWidth
                    {...field}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    {/* Add more country codes as needed */}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "This field is required.",
                  pattern: /^[0-9]{10}$/,
                }}
                render={({ field }) => (
                  <TextField
                    required
                    label="Mobile Number"
                    variant="standard"
                    fullWidth
                    error={Boolean(errors.phoneNumber)}
                    helperText={errors.phoneNumber?.message}
                    // InputProps={{
                    //   startAdornment: (
                    //     <span>{control.getValues("countryCode")}</span>
                    //   ),
                    // }}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="foodPreference"
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl variant="standard" fullWidth>
                <InputLabel id="foodPreference-label">
                  Food Preference
                </InputLabel>
                <Select
                  labelId="foodPreference-label"
                  id="foodPreference"
                  {...field}
                >
                  <MenuItem value="vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
                  <MenuItem value="vegan">Vegan</MenuItem>
                  <MenuItem value="gluten-free">Gluten Free</MenuItem>
                  <MenuItem value="other">Other (Specify)</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.foodPreference && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
        </Grid>

        {watch("foodPreference") === "other" && (
          <Grid item xs={12}>
            <Controller
              control={control}
              name="otherFoodPreference"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  required
                  label="Specify Other Food Preference"
                  variant="standard"
                  fullWidth
                  {...field}
                />
              )}
            />
            {errors.otherFoodPreference && (
              <FormHelperText sx={{ color: "red" }}>
                This field is required.
              </FormHelperText>
            )}
          </Grid>
        )}

        <Grid item xs={12}>
          <Controller
            control={control}
            name="favoriteDrink"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                label="My Favorite Drink"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.favoriteDrink && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="allergies"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                label="Please specify if you have any allergies"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.allergies && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="developmentAreas"
            rules={{ required: "Please select important areas" }}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="development-areas">Important Areas</InputLabel>
                <Select
                  {...field}
                  multiple
                  value={field.value || []}
                  onChange={(e) => handleSelectChange(e.target.value, field)}
                  input={<Input label="Multiple Select" />}
                  maxRows={2}
                  required
                  labelId="development-areas"
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() =>
                            handleSelectChange(
                              field.value.filter((item) => item !== value),
                              field
                            )
                          }
                          deleteIcon={<CancelIcon />}
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
                      {field.value?.includes(name) ? (
                        <CheckIcon color="info" />
                      ) : null}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.developmentAreas && (
            <FormHelperText error>
              {errors.developmentAreas.message}
            </FormHelperText>
          )}
          <FormHelperText>
            What are the two most important areas of personal development that
            you would like to seek
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="superpower"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                label="My superpower is"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.superpower && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
          <FormHelperText>
            Please enter your superpower (something you are really good at)
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="pitch"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                label="My elevator Pitch is"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.pitch && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
          <FormHelperText>
            Please enter your elevator pitch (something you would like to share)
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "This field is required.",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }}
            render={({ field }) => (
              <TextField
                required
                label="Partner's Email ID"
                variant="standard"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Controller
                control={control}
                name="countryCode"
                defaultValue="+91" // Set the default country code here
                render={({ field }) => (
                  <TextField
                    select
                    label="Country Code"
                    variant="standard"
                    fullWidth
                    {...field}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    {/* Add more country codes as needed */}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                control={control}
                name="partnerPhoneNumber"
                rules={{
                  required: "This field is required.",
                  pattern: /^[0-9]{10}$/,
                }}
                render={({ field }) => (
                  <TextField
                    required
                    label="Partner's Phone Number"
                    variant="standard"
                    fullWidth
                    error={Boolean(errors.partnerPhoneNumber)}
                    helperText={errors.partnerPhoneNumber?.message}
                    // InputProps={{
                    //   startAdornment: (
                    //     <span>{control.getValues("countryCode")}</span>
                    //   ),
                    // }}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="partnerFoodPreference"
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl variant="standard" fullWidth>
                <InputLabel id="partner-foodPreference-label">
                  Partner's Preference
                </InputLabel>
                <Select
                  labelId="foodPreference-label"
                  id="partnerFoodPreference"
                  {...field}
                >
                  <MenuItem value="vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="non-vegetarian">Non Vegetarian</MenuItem>
                  <MenuItem value="vegan">Vegan</MenuItem>
                  <MenuItem value="gluten-free">Gluten Free</MenuItem>
                  <MenuItem value="partnerOther">Other (Specify)</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {errors.partnerFoodPreference && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
          <FormHelperText>
            Please select your partner's food preference
          </FormHelperText>
        </Grid>

        {watch("partnerFoodPreference") === "partnerOther" && (
          <Grid item xs={12}>
            <Controller
              control={control}
              name="partnerOtherFoodPreference"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  required
                  label="Specify Other Food Preference"
                  variant="standard"
                  fullWidth
                  {...field}
                />
              )}
            />
            {errors.partnerOtherFoodPreference && (
              <FormHelperText sx={{ color: "red" }}>
                This field is required.
              </FormHelperText>
            )}
          </Grid>
        )}

        <Grid item xs={12}>
          <Controller
            control={control}
            name="wishItem"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                label="Intend to visit"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.wishItem && (
            <FormHelperText sx={{ color: "red" }}>
              This field is required.
            </FormHelperText>
          )}
          <FormHelperText>
            The one thing You wish to definitely see in Kolkata RIE
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            disabled={isSavingData}
            startIcon={isSavingData && <CircularProgress size={20} />}
          >
            {isSavingData ? "Saving..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
