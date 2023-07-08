import React, { useEffect, useState } from "react";
import { calculateAmountWithoutGst } from "../../utils";
import './style.css';
export default function CardOne({
  title,
  discountedPrice,
  sendData,
  counterData,
  isLoading,
  voucher,
  currency,
  candidateIsMember,
  setSpouseTicketCount,
  basePrice,
  isIndianCurrency,
}) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(0);
    setSpouseTicketCount(0);
  };

  const value = `${counter}x`;
  if (sendData !== undefined) {
    sendData(counter);
  }

  console.log(discountedPrice, "counter");
  useEffect(() => {
    if (counterData !== undefined && counterData > 0) {
      setCounter(counterData);
    }
  }, [counterData]);

  return (
    <div
      className={` custom-class ${
        candidateIsMember ? "bg-[#a5f1bf]" : "bg-[#fff]"
      }  ${
        !isLoading ? "" : "opacity-40 cursor-wait"
      }`}
    >
      <div class="px-6 py-4 flex-initial">
        <h3 className="title">
          {counter > 0 && !candidateIsMember ? value : null}
          {" "}{title}
        </h3>
        
        
        {voucher !== "null" ? (
          <p class="text-gray-500 text-md my-2">
            Your voucher of{" "}
            <strong>
              {currency}{voucher}
            </strong>{" "}
            has been applied as a discount on the actual ticket cost{" "}
            <strong>
              {isIndianCurrency
                ? `${currency}${calculateAmountWithoutGst(basePrice)}`
                : basePrice}
            </strong>{" "}
            
          </p>
        ) : null}

            <p class="text-gray-500 text-lg">{discountedPrice}{" "}
            {isIndianCurrency ? <span className="text">incl. 18% GST</span> : <span className="text">inc. of all taxes</span>}
            </p>
        
        {/* <p class="text-gray-500 text-lg">
          {isIndianCurrency
            ? `${currency}${calculateAmountWithoutGst(basePrice)}`
            : `${currency}${basePrice}`}
        </p> */}
        
      </div>
      {!candidateIsMember && (
        <div class="px-3 py-3 flex-initial">
          <div className="button_container">
            <button
              class={`bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50 ${
                counter === 0 || isLoading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={
                !isLoading
                  ? !candidateIsMember
                    ? counter === 0
                      ? handleIncrement
                      : handleDecrement
                    : undefined
                  : undefined
              }
              disabled={counter === 0 || isLoading}
            >
              -
            </button>
            <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
            <button
              class={`bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50 ${
                counter === 1 || isLoading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={
                !isLoading
                  ? !candidateIsMember
                    ? counter === 0
                      ? handleIncrement
                      : handleDecrement
                    : undefined
                  : undefined
              }
              disabled={counter === 1 || isLoading}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CardTwo({
  title,
  subTitle,
  discountedPrice,
  sendData,
  counterData,
  isLoading,
  voucher,
  currency,
  memberTicketCount,
  setMemberTicketCount,
  candidateIsMember,
  setSpouseTicketCount,
  basePrice,
  isIndianCurrency,
}) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    if (memberTicketCount === 0) {
      setCounter(1);
      if (!candidateIsMember) {
        setMemberTicketCount(1);
      }
    }
    if (!candidateIsMember) setCounter(1);
  };

  const handleDecrement = () => {
    setCounter(0);
    setSpouseTicketCount(0);
  };

  const value = `${counter}x`;
  if (sendData !== undefined) {
    sendData(Number(counter));
  }

  useEffect(() => {
    if (counterData !== undefined && counterData === 0) {
      setCounter(counterData);
    }
  }, [counterData]);

  // console.log(counter,'counter');

  return (
    <div
      className="custom-class"
    >
      <div class="px-6 py-4 flex-initial">
        <h3 className="title">
          {counter > 0 ? value : null} {" "}
          {title}
        </h3>
        <h5 class="text-lg text-gray-600 mb-2">{subTitle}</h5>
        <p class="text-gray-500 text-lg">{discountedPrice}{" "}
        {isIndianCurrency ? <span className="text">incl. 18% GST</span> : <span className="text">inc. of all taxes</span>}
        </p>
        {/* {voucher !== "null" ? (
        <p class="text-gray-500 text-lg">
          {isIndianCurrency
            ? `${currency} ${calculateAmountWithoutGst(basePrice)}`
            : `${currency} ${basePrice}`}
        </p>
        ) : null} */}
      </div>
      <div class="px-3 py-3 flex-initial">
        <div className="button_container">
          <button
            class={`bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50 ${
              counter === 0 || isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              !isLoading
                ? counter === 0
                  ? handleIncrement
                  : handleDecrement
                : undefined
            }
            disabled={counter === 0 || isLoading}
          >
            -
          </button>
          <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
          <button
            class={`bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50 ${
              counter === 1 || isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              !isLoading
                ? counter === 0
                  ? handleIncrement
                  : handleDecrement
                : undefined
            }
            disabled={counter === 1 || isLoading}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
