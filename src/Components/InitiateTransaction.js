import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { getParameterByName } from "../utils";

const ProcessingPage = () => {
  const paymentId = getParameterByName("paymentId");
  const formRef = useRef(null);

  // const fetchPaymentDetailsById = () => {
  //   axios
  //     .post(``, {
  //       paymentId,
  //     })
  //     .then((response) => {
  //       if (response.data) {
  //         console.log(response.data);
  //         if (formRef.current) {
  //           formRef.current.innerHTML = response.data;
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    // fetchPaymentDetailsById();
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [formRef]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      width={"100%"}
      height="100%"
    >
      <Typography sx={{ my: 2, fontSize: 22 }} variant="body1" align="center">
        Please wait while we process...
      </Typography>
      <CircularProgress />
      <form
        style={{ display: "none" }}
        method="POST"
        action="http://localhost:4000/zuddl-ccavRequestHandler"
        ref={formRef}
      >
        <input name="paymentId" value={paymentId} />
      </form>
    </Box>
  );
};

export default ProcessingPage;
