import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { getInrFormattedAmount } from "../../utils";
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

  const isRemoveDisabled = counter === 0 || isLoading;
  const isAddDisabled = counter === 1 || isLoading;

  const handleIncrement = () => {
    if (!isAddDisabled) setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (!isRemoveDisabled) {
      setCounter(0);
      setSpouseTicketCount(0);
    }
  };

  if (sendData !== undefined) {
    sendData(counter);
  }

  useEffect(() => {
    if (counterData !== undefined && counterData > 0) {
      setCounter(counterData);
    }
  }, [counterData]);

  return (
    <div
      class={`w-full ${
        candidateIsMember
          ? "bg-[#a5f1bf]"
          : "bg-[#fff]"
      } mx-auto shadow-md rounded-2xl overflow-hidden mb-2 mt-0 flex justify-between ${
        !isLoading
          ? !candidateIsMember
            ? ""
            : "cursor-not-allowed"
          : "opacity-40 cursor-wait"
      }`}
    >
      <div class="px-6 py-4 flex-initial">
        <h3 class="font-semibold text-lg mb-1 text-gray-900">
          {counter > 0 && !candidateIsMember ? `${counter}x` : null} {title}
        </h3>
        {voucher > 0 && (
          <p class="text-gray-500 text-md my-2">
            Your voucher of{" "}
            <strong>
              {currency}{isIndianCurrency ? getInrFormattedAmount(voucher) : voucher}
            </strong>{" "}
            has been applied as a discount
          </p>
        )}
        <span class="text-gray-500 text-lg mr-1">{discountedPrice}</span>
        {isIndianCurrency ? <span className="text-sm text-gray-500">exc GST</span> : <span className="text-sm text-gray-500">inc. of all taxes</span>}
      </div>
      {!candidateIsMember && (
        <div class="p-3 flex-initial flex justify-center items-center">
          <IconButton aria-label="delete" onClick={handleDecrement} disabled={isRemoveDisabled}>
            <RemoveCircleOutlineIcon fontSize="large"/>
          </IconButton>
          <p class="text-gray-500 text-2xl">{counter}</p>
          <IconButton aria-label="delete" onClick={handleIncrement} disabled={isAddDisabled}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export function CardTwo({
  title,
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

  const isRemoveDisabled = counter === 0 || isLoading;
  const isAddDisabled = counter === 1 || isLoading;

  const handleIncrement = () => {
    if (!isAddDisabled) {
      if (memberTicketCount === 0) {
        setCounter(1);
        if (!candidateIsMember) {
          setMemberTicketCount(1);
        }
      }
      if (!candidateIsMember) setCounter(1);
    }
  };

  const handleDecrement = () => {
    if (!isRemoveDisabled) {
      setCounter(0);
      setSpouseTicketCount(0);
    }
  };

  if (sendData !== undefined) {
    sendData(Number(counter));
  }

  useEffect(() => {
    if (counterData !== undefined && counterData === 0) {
      setCounter(counterData);
    }
  }, [counterData]);

  return (
    <div
      class={`w-full mx-auto shadow-md rounded-2xl overflow-hidden my-2 flex justify-between bg-white ${
        isLoading && "opacity-40 cursor-wait"
      }`}
    >
      <div class="pl-6 py-4 flex-initial">
        <h3 class="font-semibold text-lg mb-1 text-gray-900">
          {counter > 0 && !candidateIsMember ? `${counter}x` : null} {title}
        </h3>
        <span class="text-gray-500 text-lg mr-1">{discountedPrice}</span>
        {isIndianCurrency ? <span className="text-sm text-gray-500">exc GST</span> : <span className="text-sm text-gray-500">inc. of all taxes</span>}
      </div>
      <div class="p-3 flex-initial flex justify-center items-center">
        <IconButton aria-label="delete" onClick={handleDecrement} disabled={isRemoveDisabled}>
          <RemoveCircleOutlineIcon fontSize="large"/>
        </IconButton>
        <p class="text-gray-500 text-2xl">{counter}</p>
        <IconButton aria-label="delete" onClick={handleIncrement} disabled={isAddDisabled}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
