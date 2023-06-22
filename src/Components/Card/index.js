import React, { useEffect, useState } from "react";

export default function CardOne({
  title,
  description,
  discountedPrice,
  sendData,
  counterData,
}) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
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
    <div class="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden my-2 flex justify-between">
      <div class="px-6 py-4 flex-initial">
        <h3 class="font-bold text-2xl mb-1 text-gray-900">
          {counter > 0 ? value : null}
          { title}
        </h3>
        <p class="text-gray-500 text-lg">{description}</p>
        <p class="text-gray-500 text-sm">{discountedPrice}</p>
      </div>
      <div class="px-3 py-3 flex-initial">
        <div class="flex space-x-4 py-8">
          <button
            class="bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50"
            onClick={handleDecrement}
            disabled={counter === 0}
          >
            -
          </button>
          <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
          <button
            class="bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50"
            
            onClick={handleIncrement}
            disabled={counter === 1}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardTwo({
  title,
  description,
  subTitle,
  discountedPrice,
  sendData,
  counterData,
}) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
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
    <div class="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden my-2 flex justify-between">
      <div class="px-6 py-4 flex-initial">
        <h3 class="font-bold text-2xl mb-1 text-gray-900">
          {counter > 0 ? value : null}
          {title}
        </h3>
        <h5 class="text-lg text-gray-600 mb-2">{subTitle}</h5>
        <p class="text-gray-500 text-lg">{description}</p>
        <p class="text-gray-500 text-sm">{discountedPrice}</p>
      </div>
      <div class="px-3 py-3 flex-initial">
        <div class="flex space-x-4 py-8">
          <button
            class="bg-gray-300 shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full w-12 h-12 disabled:opacity-50"
            onClick={handleDecrement}
            disabled={counter === 0}
          >
            -
          </button>
          <p class="text-gray-500 text-2xl px-2 py-2">{counter}</p>
          <button
            class="bg-gray-300  shadow-md hover:bg-gray-500 hover:shadow-lg text-black text-4xl font-normal  rounded-full  w-12 h-12 disabled:opacity-50"
            onClick={handleIncrement}
            disabled={counter === 1}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
