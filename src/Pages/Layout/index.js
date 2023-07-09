import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

import CardOne, { CardTwo } from "../../Components/Card";
import Paybutton from "../../Components/Paybutton";

export default function Layout() {
  const [counterValue, setCounterValue] = useState(0);
  const [counterValueTwo, setCounterValueTwo] = useState(0);
  const [memberPrice, setMemberPrice] = useState(0);
  const [partnerPrice, setPartnerPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
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

  const emailId = localStorage.getItem("email");
  const plan = localStorage.getItem("plan");
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
            setCalculatedAmount(response.data);
          }
        });
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
  }, [candidateIsMember, counterValue, counterValueTwo, calculatedAmount]);

  useEffect(() => {
    getCalculatedAmount();
  }, [counterValue, counterValueTwo]);

  const handleDataOne = (data) => {
    setCounterValue(data);
  };

  const handleDataTwo = (data) => {
    setCounterValueTwo(data);
  };

  return (
    <>
      <div className="w-full f-full flex flex-col md:flex-row md:h-screen">
        <div className="w-full h-full bg-gray-100">
          <header class="bg-white shadow-md text-gray-500">
            <div class="ml-5 mx-auto px-4 py-6">
              <h1 class="text-2xl font-bold font-sans">RIE Kolkata 2024</h1>
            </div>
          </header>
          <main class="mx-auto p-6">
            {!initialTicketPriceHasbeenFetched ? (
              <Box display="flex" justifyContent={"center"}>
                <CircularProgress sx={{ color: "#454545" }} />
              </Box>
            ) : (
              <>
                <CardOne
                  title="Member"
                  discountedPrice={<>{currency} {memberPrice}{currency.toLowerCase().includes("inr") ? <span className="text-sm">&nbsp;incl. 18% GST</span>: <></>}</>}
                  sendData={handleDataOne}
                  counterData={counterValue}
                  isLoading={isLoading}
                  candidateIsMember={candidateIsMember}
                  setSpouseTicketCount={setCounterValueTwo}
                />
                <Box mt={2} />
                <CardTwo
                  title="Spouse/Life Partner"
                  discountedPrice={<>{currency} {partnerPrice}{currency.toLowerCase().includes("inr") ? <span className="text-sm">&nbsp;incl. 18% GST</span>: <></>}</>}
                  sendData={handleDataTwo}
                  memberTicketCount={counterValue}
                  setMemberTicketCount={setCounterValue}
                  counterData={counterValueTwo}
                  isLoading={isLoading}
                  candidateIsMember={candidateIsMember}
                  setSpouseTicketCount={setCounterValueTwo}
                />
              </>
            )}
          </main>
        </div>

        <div className="w-full h-full bg-gray-200">
          <div className="w-full h-full">
            <div class="text-gray-500">
              <header class="bg-white shadow-md">
                <div class="container mx-auto px-4 py-6">
                  <h1 class="text-2xl font-bold font-sans">Summary</h1>
                </div>
              </header>

              <main class="mx-auto p-6">
                {isLoading ? (
                  <div class="bg-white shadow w-full p-6 font-sans text-xl rounded-2xl">
                    Loading...
                  </div>
                ) : counterValue + counterValueTwo > 0 ? (
                  <div class="bg-white shadow w-full p-6 rounded-2xl">
                    {counterValue > 0 && (
                      <>
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="text-lg text-black font-semibold font-sans">
                            Member
                          </h2>
                          <span class="text-black">
                            {currency}&nbsp;
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
                          </h2>
                          <span class="text-black">
                            {currency}&nbsp;
                            {partnerPrice}
                          </span>
                        </div>
                        <hr className="my-4" />
                      </>
                    ) : null}
                    <div class="flex justify-between items-center">
                      <h2 class="text-2xl font-semibold font-sans">
                        Total
                      </h2>
                      <span class="text-2xl text-black">
                        {currency}&nbsp;
                        {finalPrice}
                      </span>
                    </div>
                    <div class="flex justify-center mt-6">
                      <Paybutton
                        plan={plan}
                        amount={finalPrice}
                        user={emailId}
                        count={counterValue + counterValueTwo}
                      />
                    </div>
                    <div className="flex justify-center mt-4"><span className="w-3/4 text-center">We will reserve your tickets for you. You will have 15 minutes to complete the order.</span></div>
                  </div>
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
    </>
  );
}
