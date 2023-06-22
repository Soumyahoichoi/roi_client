import queryString from "query-string";
import React, { useEffect } from "react";
import supabase from "../config/supabaseClient";

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
  );
};

export default PaymentSuccessPage;
