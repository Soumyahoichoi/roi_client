import axios from "axios";
import React from "react";

export default function Paybutton({ amount, user }) {
  const handleCheckout = () => {
    axios
      .post("http://localhost:4242/ccavResponseHandler", {
        amount: amount,
        user: user,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;

          var newWin = window.open("url", "windowName", "height=300,width=300");
          newWin.document.write(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      onClick={handleCheckout}
      className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
    >
      Checkout
    </div>
  );
}
