import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

import CardOne, { CardTwo } from "../../Components/Card";
import Paybutton from "../../Components/Paybutton";
import { calculateGst, calculateAmountWithoutGst, getInrFormattedAmount } from "../../utils";

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

  const voucher = localStorage.getItem("voucher");

  const [
    initialTicketPriceHasbeenFetched,
    setInitialTicketPriceHasbeenFetched,
  ] = useState(false);

  const emailId = localStorage.getItem("email");
  const plan = localStorage.getItem("plan");

  const candidateIsMember = localStorage.getItem("candidate") === "member";

  const isIndianCurrency = useMemo(
    () => currency.toLowerCase().includes("₹"),
    [currency]
  );

  const getCurrencySymbol = (currency) => {
    if (currency.toLowerCase().includes("inr")) {
      return "₹";
    }
    if (currency.toLowerCase().includes("usd")) {
      return "$";
    }
    return currency;
  };


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
            setCurrency(getCurrencySymbol(response.data.currency));
            setCalculatedAmount(response.data);
          }
        });
    }
  };

  useEffect(() => {
    setFinalPrice(calculate().finalAmount)
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

  const calculate = () => {
    if (isIndianCurrency) {
      let finalAmount = 0
      if (counterValue === 1) {
        let memberPriceWithoutGst = calculateAmountWithoutGst(memberPrice)
        if (voucher != null) memberPriceWithoutGst -= voucher
        finalAmount += memberPriceWithoutGst
        console.log(finalAmount, 'finalAmount till member')
      }
      if (counterValueTwo === 1) {
        finalAmount += calculateAmountWithoutGst(partnerPrice)
      }
      const gst = calculateGst(finalAmount)
      finalAmount += gst
      return {
        gst, finalAmount
      }
    } else {
      let finalAmount = 0
      if (counterValue === 1) {
        let tempMemberPrice = memberPrice
        // if (voucher) tempMemberPrice -= voucher
        finalAmount += tempMemberPrice
      }
      if (counterValueTwo === 1) {
        finalAmount += partnerPrice
      }
      return { finalAmount }
    }
  }

  return (
    <>
      <div className="w-full f-full flex flex-col md:flex-row md:h-screen">
        <div className="w-full h-full bg-gray-100">
          <header class="bg-white shadow-md text-gray-500">
            <div class="ml-5 mx-auto px-4 py-4">
              <h1 class="text-base font-bold font-sans">RIE Kolkata 11-Jan-2024 till 14-Jan-2024</h1>
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
                  discountedPrice={<>{currency} {isIndianCurrency ? getInrFormattedAmount(calculateAmountWithoutGst(memberPrice) - (voucher ?? 0)): memberPrice - (voucher ?? 0)}{currency.toLowerCase().includes("inr")}</>}
                  sendData={handleDataOne}
                  counterData={counterValue}
                  isLoading={isLoading}
                  voucher={voucher}
                  currency={currency}
                  candidateIsMember={candidateIsMember}
                  setSpouseTicketCount={setCounterValueTwo}
                  basePrice={memberPrice}
                  isIndianCurrency={isIndianCurrency}
                />
                <Box mt={2} />
                <CardTwo
                  title="Spouse/Life Partner"
                  discountedPrice={<>{currency} {isIndianCurrency ? getInrFormattedAmount(calculateAmountWithoutGst(partnerPrice)) : partnerPrice}{currency.toLowerCase().includes("inr")}</>}
                  sendData={handleDataTwo}
                  memberTicketCount={counterValue}
                  setMemberTicketCount={setCounterValue}
                  counterData={counterValueTwo}
                  isLoading={isLoading}
                  voucher={voucher}
                  currency={currency}
                  candidateIsMember={candidateIsMember}
                  setSpouseTicketCount={setCounterValueTwo}
                  basePrice={partnerPrice}
                  isIndianCurrency={isIndianCurrency}
                />
              </>
            )}
          </main>
        </div>

        <div className="w-full h-full bg-gray-200">
          <div className="w-full h-full">
            <div class="text-gray-500">
              <header class="bg-white shadow-md">
                <div class="container mx-auto px-4 py-4">
                  <h1 class="text-2xl font-extrabold font-sans text-black">Summary</h1>
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
                            {isIndianCurrency ? getInrFormattedAmount(calculateAmountWithoutGst(memberPrice) - (voucher ?? 0)) : memberPrice - (voucher ?? 0)}
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
                            {isIndianCurrency ? getInrFormattedAmount(calculateAmountWithoutGst(partnerPrice)) : partnerPrice}
                          </span>
                        </div>
                        <hr className="my-4" />
                      </>
                    ) : null}
                    {currency === "₹" && (
                      <>
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="title_layout text-black">
                            GST 18%
                            {/* {memberTypeIsEarlyBird ? " (Early Bird)" : ""} */}
                          </h2>
                          <span class="text-black">
                            {currency}&nbsp;
                            {getInrFormattedAmount(calculate().gst)}{" "}
                          </span>
                        </div>
                        <hr class="my-4" />
                      </>
                    )}
                    <div class="flex justify-between items-center">
                      <h2 class="text-2xl font-semibold font-sans text-black">
                        Total
                      </h2>
                      <span class="text-2xl text-black">
                        {currency}&nbsp;
                        {isIndianCurrency ? getInrFormattedAmount(calculate().finalAmount) : (finalPrice - (voucher ?? 0))}
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
