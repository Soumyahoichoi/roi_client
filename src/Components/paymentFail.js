import React from "react";

const PaymentFailurePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-red-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed!</h2>
      <p className="text-gray-700 text-lg mb-6">
        We were unable to process your payment.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-md"
        onClick={(event) =>
          (window.location.href = "https://register.riekol.com/")
        }
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailurePage;
