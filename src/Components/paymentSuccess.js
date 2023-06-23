import queryString from "query-string";
import React, { useEffect } from "react";
import supabase from "../config/supabaseClient";
import PreferanceForm from "../Components/PreferanceForm";

const PaymentSuccessPage = () => {
  const parsed = queryString.parse(window.location.search);

  console.log({ parsed });

  const updateOrderStatus = async () => {
    if (parsed.order_no) {
      const { data, error } = await supabase
        .from("order_details")
        .update({ status: "PAYMENT SUCCESSFULL" })
        .eq("order_id", parsed.order_no);
    }
  };

  useEffect(() => {
    updateOrderStatus();
  }, [JSON.stringify(parsed)]);

  return (
    

    <React.Fragment>
      <section>
        <div className=" grid grid-rows-2 text-white md:grid-cols-2 w-full h-full">
          <div className="w-full h-full bg-gray-100 md:h-screen container">
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
              <p className="text-gray-700 text-lg mb-6">Thank you for your purchase.</p>
              <br />
              <div>
                <p>
                  <strong>Order ID:</strong> {parsed.order_no}
                </p>
              </div>
              <div>
                <p>
                  <strong>Tracking ID:</strong> {parsed.reference_no}
                </p>
              </div>
              <div>
                <p>
                  <strong>Amount:</strong> {parsed.currency}&nbsp;
                  {Number(parsed.amount).toLocaleString("en-IN")}
                </p>
              </div>
              <p>
                <strong>Status:</strong> Your payment was successful!
              </p>
            </div>
              
                  

                 
             
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
                {/* <header class="bg-white shadow-md">
                  <div class="container mx-auto px-4 py-6">
                    <h1 class="text-2xl font-bold font-sans">Please select the fields as per your prference and submit the form</h1>
                  </div>
                </header> */}

                <main class=" mx-auto px-4 py-6 h-10rm ">
                  
                <PreferanceForm />
                      
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>

   
    
  );
};

export default PaymentSuccessPage;
