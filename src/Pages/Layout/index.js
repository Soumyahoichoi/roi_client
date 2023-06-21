import React, { useEffect, useState } from "react";
import CardOne, { CardTwo } from "../../Components/Card";
import supabase from "../../config/supabaseClient";
// import { Cart } from '../../Context';
import { useNavigate } from "react-router-dom";
import Paybutton from "../../Components/Paybutton";
export default function Layout() {
  // const {value,setValue} = useContext(Cart);

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [extraRow, setExtraRow] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [counterValueTwo, setCounterValueTwo] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();
  let price, memberPrice,partnerPrice, currency;
  let regularPrice, regularMemberPrice, regularAddOns, regularTotalPrice,earlybird_member,earlybird_spouse,earlybird_total;
  let emailId = localStorage.getItem("email");
  let plan = localStorage.getItem("plan");
  let voucherDiscount = localStorage.getItem("voucher");
  useEffect(() => {
    const fetchData = async () => {
      console.log('clicked');
      const { data, error } = await supabase
        .from("eo table")
        // .select("discount,Currency,addOns,voucherPrice")
        .select("*")
        .eq("PlanID", plan);
      if (error) {
        setError("could not fetch Data!");
        setData([]);
        console.log(error, "error");
      }
      if (data) {
        setData(data);
        console.log(data, "data");
        setError(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (counterValueTwo > 0) {
      setTotalValue(earlybird_total);
    } else {
      // totalPrice = discountedPrice;
      setTotalValue(earlybird_member);
    }
  }, [counterValue, counterValueTwo]);

  const handleDataOne = (data) => {
    setCounterValue(data);
  };

  const handleDataTwo = (data) => {
    setCounterValueTwo(data);
  };

  if (data.length > 0) {
    price = data[0].voucherPrice;
    memberPrice = data[0].earlybird_member;
    // discount = data[0].discount;
    currency = data[0].Currency;
    // addOns = data[0].earlybird_spouse;
    regularMemberPrice = data[0].regular_member;
    regularAddOns = data[0].regular_spouse;
    regularTotalPrice = data[0].regular_total;
    earlybird_member = data[0].earlybird_member;
    earlybird_spouse = data[0].earlybird_spouse;
    earlybird_total = data[0].earlybird_total;
  }
  if (voucherDiscount !== "") {
    memberPrice = regularMemberPrice;
    partnerPrice = regularAddOns;
  }
  else {
    memberPrice = earlybird_member;
    partnerPrice = earlybird_spouse;
  } 
  

  return (
    <React.Fragment>
      <section>
        <div className="w-screen h-screen grid grid-rows-2 text-white md:grid-cols-2">
          <div className="w-full h-full bg-gray-100 md:h-screen container">
            <div className="px-8">
              <header>
                <div class="container mx-auto px-4 py-6 ">
                  <h1 class="text-2xl font-normal text-black border-b border-black">
                    Early Bird Tickets | South Asia Member Registrations Open at
                    SALC
                  </h1>
                </div>
              </header>
              <CardOne
                title="Member (Early Bird)"
                description={`Your voucher of ${currency} ${voucherDiscount} has been applied as a discount on the actual ticket cost ${currency} ${regularMemberPrice}`}
                discountedPrice={`${currency} ${partnerPrice} incl. 18% GST`}
                sendData={handleDataOne}
                counterData={counterValueTwo}
              />
              <CardTwo
                title="Spouse/Life Partner (Early Bird)"
                description={`We have some great experiences for everyone at RIE and can help curate a holiday 
              for you and your SLP before or after RIE while you are in India.`}
                subTitle={`Bring along your Spouse / Life Partner to India!`}
                discountedPrice={`${currency} ${partnerPrice} incl. 18% GST`}
                sendData={handleDataTwo}
              />
            </div>
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
                    <h1 class="text-2xl font-bold">Shopping Cart</h1>
                  </div>
                </header>

                <main class=" mx-auto px-4 py-6">
                  {counterValue > 0 ? (
                    <>
                      <div class="bg-white shadow w-full p-6">
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="text-xl text-black font-semibold">
                            Members (Early Bird)
                          </h2>
                          <span class="text-black">
                            {currency} {earlybird_member}
                          </span>
                        </div>
                        <hr class="my-4" />
                        {counterValueTwo > 0 ? (
                          <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl text-black font-semibold">
                              Spouse/Life Partner (Early Bird)
                            </h2>
                            <span class="text-black">
                              {currency} {earlybird_spouse}
                            </span>
                          </div>
                        ) : null}
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="text-xl text-black font-semibold">Fees</h2>
                          <span class="text-black">{currency} 0.00</span>
                        </div>
                        <hr class="my-4" />
                        <div class="flex justify-between items-center">
                          <h2 class="text-2xl font-semibold">Total</h2>
                          <span class="text-2xl text-black">
                            {currency} {totalValue}
                          </span>
                        </div>
                        <div class="flex justify-center mt-6">
                          {/* <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
                          onClick={handleSubmit}>
                          Proceed to payment
                          </button> */}
                          <Paybutton amount={earlybird_total} user={emailId} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="bg-white shadow w-full p-6">
                        The shopping cart is empty. Please select tickets.
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
