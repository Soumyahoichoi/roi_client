import axios from "axios";
import React from "react";

export default function Paybutton({ amount, user }) {
  const handleCheckout = () => {
    axios
      .post("http://localhost:4242/ccavResponseHandler", {
        amount: 10,
        user: "user",
        currency: "INR",
      })
      .then((res) => {
        if (res.data) {
          var newWin = window.open(
            "",
            "windowName",
            "" +
              (window.screen.height - 400) +
              ",left=" +
              (window.screen.width - 840)
          );
          console.log({ res });
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
