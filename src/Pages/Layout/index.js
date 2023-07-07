import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardOne, { CardTwo } from "../../Components/Card";
import Paybutton from "../../Components/Paybutton";
export default function Layout() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);

  const voucher = localStorage.getItem("voucher");
  const [counterValue, setCounterValue] = useState(0);
  const [counterValueTwo, setCounterValueTwo] = useState(0);
  const [memberPrice, setMemberPrice] = useState(0);
  const [partnerPrice, setPartnerPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [memberTypeIsEarlyBird, setMemberTypeIsEarlyBird] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState({
    member: 0,
    spouse: 0,
    totalAmount: 0,
    currency: "",
    cap: "",
    plan: "",
  });

  const [
    initialTicketPriceHasbeenFetched,
    setInitialTicketPriceHasbeenFetched,
  ] = useState(false);

  let regularMemberPrice, regularAddOns;
  let emailId = localStorage.getItem("email");
  let plan = localStorage.getItem("plan");
  let voucherDiscount = localStorage.getItem("voucher");
  const candidateIsMember = localStorage.getItem("candidate") === "member";

  const getCalculatedAmount = () => {
    if (
      counterValue + counterValueTwo > 0 ||
      !initialTicketPriceHasbeenFetched
    ) {
      if (initialTicketPriceHasbeenFetched) {
        setIsLoading(true);
      }
      axios
        .post("https://riekolpayment.vercel.app/calculate-amount", {
          count: !initialTicketPriceHasbeenFetched
            ? 2
            : counterValue + counterValueTwo,
          email: emailId,
        })
        .then((response) => {
          setIsLoading(false);
          setInitialTicketPriceHasbeenFetched(true);
          if (response.data) {
            setMemberPrice(response.data.member);
            setPartnerPrice(response.data.spouse);
            setCurrency(response.data.currency);
            setMemberTypeIsEarlyBird(
              response.data.cap.toLowerCase() === "earlybird"
            );
            setCalculatedAmount(response.data);
            // setFinalPrice(
            //   counterValue + counterValueTwo === 1
            //     ? !candidateIsMember
            //       ? response.data.member
            //       : response.data.spouse
            //     : response.data.totalAmount
            // );
          }
        });
    } else {
      // setMemberPrice(0);
      // setPartnerPrice(0);
      // setFinalPrice(0);
      // setCurrency("");
    }
  };

  useEffect(() => {
    setFinalPrice(
      counterValue + counterValueTwo === 1
        ? !candidateIsMember
          ? calculatedAmount.member
          : calculatedAmount.spouse
        : calculatedAmount.totalAmount
    );

    return () => {};
  }, [candidateIsMember, counterValue, counterValueTwo, calculatedAmount]);

  console.log({
    candidateIsMember,
    counterValue,
    counterValueTwo,
  });

  useEffect(() => {
    getCalculatedAmount();
  }, [counterValue, counterValueTwo]);

  const handleDataOne = (data) => {
    setCounterValue(data);
  };

  const handleDataTwo = (data) => {
    setCounterValueTwo(data);
  };

  useEffect(() => {
    if (voucherDiscount === "null") {
      setMessage(true);
    } else {
      setMessage(false);
    }
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="w-full h-full grid grid-rows-2 text-white md:grid-cols-2">
          <div className="w-full h-full bg-gray-100 md:h-screen container">
            <Box minWidth={"40rem"} className="px-8">
              {/* <header>
                <div class="container mx-auto px-4 py-6 ">
                  <h1 class="text-xl font-normal text-black border-b border-black font-sans">
                    Tickets
                  </h1>
                </div>
              </header> */}
              {!initialTicketPriceHasbeenFetched ? (
                <Box display="flex" justifyContent={"center"}>
                  <CircularProgress sx={{ color: "#454545" }} />
                </Box>
              ) : (
                <>
                  <CardOne
                    title="Member"
                    discountedPrice={`${currency} ${memberPrice}${
                      currency.toLowerCase().includes("inr")
                        ? " incl. 18% GST"
                        : ""
                    }`}
                    sendData={handleDataOne}
                    counterData={counterValue}
                    isLoading={isLoading}
                    voucher={voucher}
                    currency={currency}
                    candidateIsMember={candidateIsMember}
                    setSpouseTicketCount={setCounterValueTwo}
                  />
                  <Box mt={2} />
                  <CardTwo
                    title={"Spouse/Life Partner"}
                    // subTitle={`Bring along your Spouse / Life Partner to India!`}
                    discountedPrice={`${currency} ${partnerPrice}${
                      currency.toLowerCase().includes("inr")
                        ? " incl. 18% GST"
                        : ""
                    }`}
                    sendData={handleDataTwo}
                    memberTicketCount={counterValue}
                    setMemberTicketCount={setCounterValue}
                    counterData={counterValueTwo}
                    isLoading={isLoading}
                    voucher={voucher}
                    currency={currency}
                    candidateIsMember={candidateIsMember}
                    setSpouseTicketCount={setCounterValueTwo}
                  />
                </>
              )}
            </Box>
          </div>

          <div className="w-full h-full bg-gray-200 md:h-screen container">
            {/* 
             Shopping Cart
             Purchase Overview
             */}
            <div className="w-full h-full">
              {/* <Addtocart /> */}
              <div class="text-gray-500 min-h-screen">
                <header class="bg-white shadow-md">
                  <div class="container mx-auto px-4 py-6">
                    <h1 class="text-2xl font-bold font-sans">Summary</h1>
                  </div>
                </header>

                <main class=" mx-auto px-4 py-6">
                  {isLoading ? (
                    <div class="bg-white shadow w-full p-6 font-sans text-xl">
                      Loading...
                    </div>
                  ) : counterValue + counterValueTwo > 0 ? (
                    <>
                      <div class="bg-white shadow w-full p-6">
                        {counterValue > 0 && (
                          <>
                            <div class="flex justify-between items-center mb-4">
                              <h2 class="text-lg text-black font-semibold font-sans">
                                Member
                                {memberTypeIsEarlyBird ? " (Early Bird)" : ""}
                              </h2>
                              <span class="text-black">
                                {currency}
                                {memberPrice}
                              </span>
                            </div>
                            <hr class="my-4" />
                          </>
                        )}
                        {counterValueTwo > 0 ? (
                          <>
                            <div class="flex justify-between items-center mb-4 ">
                              <h2 class="text-lg text-black font-semibold font-sans">
                                Spouse/Life Partner
                                {memberTypeIsEarlyBird ? " (Early Bird)" : ""}
                              </h2>
                              <span class="text-black">
                                {currency}
                                {partnerPrice}
                              </span>
                            </div>
                            <hr className="my-4" />
                          </>
                        ) : null}

                        {/* GST */}
                        
                        {currency === "₹" && (
                              <>
                            <div class="flex justify-between items-center mb-4">
                              <h2 class="text-lg text-black font-semibold font-sans">
                                GST 18%
                                {/* {memberTypeIsEarlyBird ? " (Early Bird)" : ""} */}
                              </h2>
                              <span class="text-black">
                                {currency}
                                GST price
                              </span>
                            </div>
                            <hr class="my-4" />
                            </>
                        )}

                        <div class="flex justify-between items-center">
                          <h2 class="text-2xl font-semibold font-sans">
                            Total
                          </h2>
                          <span class="text-2xl text-black">
                            {currency}&nbsp;
                            {finalPrice}
                            {currency.toLowerCase().includes("inr")
                              ? " (inc. of GST)"
                              : ""}
                          </span>
                        </div>
                        <div class="flex justify-center mt-6">
                          {/* <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
                          onClick={handleSubmit}>
                          Proceed to payment
                          </button> */}
                          <Paybutton
                            plan={plan}
                            amount={finalPrice}
                            user={emailId}
                            count={counterValue + counterValueTwo}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="bg-white shadow w-full p-6 font-sans text-xl rounded-2xl">
                        Your cart is empty. Please select tickets.
                      </div>
                    </>
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
