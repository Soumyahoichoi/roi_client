import React, { useEffect, useState } from "react";

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

  // console.log(counterData, "counter");
  useEffect(() => {
    if (counterData !== undefined && counterData > 0) {
      setCounter(counterData);
    }
  }, [counterData]);

  // console.log(counter,'counter');

  return (
    <div
      onClick={
        !isLoading
          ? !candidateIsMember
            ? counter === 0
              ? handleIncrement
              : handleDecrement
            : undefined
          : undefined
      }
      class={`w-full ${
        candidateIsMember
          ? "bg-[#a5f1bf]"
          : counter === 1
          ? "bg-[#a5f1bf]"
          : "bg-[#fff]"
      } mx-auto shadow-md rounded-2xl overflow-hidden my-2 flex justify-between ${
        !isLoading
          ? !candidateIsMember
            ? "cursor-pointer"
            : "cursor-not-allowed"
          : "opacity-40 cursor-wait"
      }`}
    >
      <div class="px-6 py-4 flex-initial">
        <h3 class="font-semibold text-2xl mb-1 text-gray-900">
          {counter > 0 && !candidateIsMember ? value : null}
          {title}
        </h3>
        <p class="text-gray-500 text-lg">{discountedPrice}</p>
        {voucher > 0 && (
          <p class="text-gray-500 text-xs mt-2">
            Voucher of{" "}
            <strong>
              {currency} {voucher}
            </strong>{" "}
            has been applied!
          </p>
        )}
      </div>
      {/* {!candidateIsMember && (
        <div class="px-3 py-3 flex-initial">
          <div class="flex space-x-4 py-8">
            <button
              class="bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50"
              onClick={handleDecrement}
              disabled={counter === 0 || isLoading}
            >
              -
            </button>
            <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
            <button
              class="bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50"
              onClick={handleIncrement}
              disabled={counter === 1 || isLoading}
            >
              +
            </button>
          </div>
        </div>
      )} */}
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
      onClick={
        !isLoading
          ? counter === 0
            ? handleIncrement
            : handleDecrement
          : undefined
      }
      class={`w-full mx-auto ${
        counter === 1 ? "bg-[#a5f1bf]" : "bg-white"
      } shadow-md rounded-2xl overflow-hidden my-2 flex justify-between ${
        !isLoading ? "cursor-pointer" : "opacity-40 cursor-wait"
      }`}
    >
      <div class="px-6 py-4 flex-initial">
        <h3 class="font-bold text-2xl mb-1 text-gray-900">
          {counter > 0 ? value : null}
          {title}
        </h3>
        <h5 class="text-lg text-gray-600 mb-2">{subTitle}</h5>
        <p class="text-gray-500 text-lg">{discountedPrice}</p>
        {voucher > 0 && (
          <p class="text-gray-500 text-xs mt-2">
            Voucher of{" "}
            <strong>
              {currency} {voucher}
            </strong>{" "}
            has been applied!
          </p>
        )}
      </div>
      {/* <div class="px-3 py-3 flex-initial">
        <div class="flex space-x-4 py-8">
          <button
            class="bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50"
            onClick={handleDecrement}
            disabled={counter === 0 || isLoading}
          >
            -
          </button>
          <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
          <button
            class="bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50"
            onClick={handleIncrement}
            disabled={counter === 1 || isLoading}
          >
            +
          </button>
        </div>
      </div> */}
    </div>
  );
}
