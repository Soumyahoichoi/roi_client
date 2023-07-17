import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import PreferanceForm from "../Components/PreferanceForm";

const PaymentSuccessPage = () => {
  const parsed = queryString.parse(window.location.search);
  console.log({ parsed });
  const [orderDetails, setOrderDetails] = useState({});
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [preferenceFormData, setPreferenceFormData] = useState({});

  const fetchOrderDetails = () => {
    setIsFetchingDetails(true);
    axios
      .post("https://riekolpayment.vercel.app/getOrderByOrderId", {
        order_id: parsed.order_no,
      })
      .then((response) => {
        if (response.data) {
          setOrderDetails(response.data);

          axios
            .post("https://riekolpayment.vercel.app/getPreferenceByOrderId", {
              order_id: parsed.order_no,
            })
            .then((response) => {
              setIsFetchingDetails(false);
              setShowPartnerForm(response.data.count === 2);
              setPreferenceFormData(response.data.preferenceDetails || {});
            });
        }
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <React.Fragment>
      {isFetchingDetails ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems="center"
          height={"100vh"}
          width={"100%"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <section>
          <Grid container className="text-white w-full h-full">
            <Grid item xs={12} md={6} className="w-full h-full bg-gray-100">
              <div className="px-8">
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-green-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    Thank you for your purchase.
                  </p>
                  <br />
                  {parsed.order_no && (
                    <div>
                      <p className="text-gray-700">
                        <strong>Order ID:</strong> {parsed.order_no}
                      </p>
                    </div>
                  )}
                  {parsed.reference_no && (
                    <div>
                      <p className="text-gray-700">
                        <strong>Tracking ID:</strong> {parsed.reference_no}
                      </p>
                    </div>
                  )}
                  {parsed.currency && (
                    <div className="text-gray-700">
                      <p className="text-gray-700">
                        <strong>Amount:</strong> {parsed.currency}&nbsp;
                        {Number(parsed.amount).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                  <p className="text-gray-700">
                    <strong>Status:</strong> Your payment was successful!
                  </p>
                  <br />
                  <h2 className="text-gray-600 text-2xl mb-6 text-center">
                    Please fill out all the details in the form to complete the
                    Registration.
                  </h2>
                  <br />
                </div>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              className="w-full h-full"
              sx={{
                overflowY: window.innerWidth <= 900 ? "auto" : "scroll",
                maxHeight: window.innerWidth <= 900 ? "100%" : "100vh",
                boxShadow: "0 0 30px 0 #d8e1ff !important",
                "& .MuiFormLabel-root": {
                  color: "#111",
                },
                "& #development-areas": {
                  left: "-14px !important",
                },
              }}
            >
              {/* 
             Shopping Cart
             Purchase Overview
             */}
              <div className="w-full h-full">
                {/* <Addtocart /> */}
                <div class="text-gray-500">
                  {/* <header class="bg-white shadow-md">
                  <div class="container mx-auto px-4 py-6">
                    <h1 class="text-2xl font-bold font-sans">Please select the fields as per your prference and submit the form</h1>
                  </div>
                </header> */}

                  <main class=" mx-auto px-12 py-10">
                    <PreferanceForm
                      orderId={parsed.order_no}
                      count={orderDetails.count || 0}
                      showPartnerForm={showPartnerForm}
                      preferenceFormData={preferenceFormData}
                    />
                  </main>
                </div>
              </div>
            </Grid>
          </Grid>
        </section>
      )}
    </React.Fragment>
  );
};

export default PaymentSuccessPage;
