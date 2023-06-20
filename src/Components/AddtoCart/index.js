import React, {useState, useEffect} from 'react'

export default function Addtocart() {
  
  useEffect(() => {
    const data = localStorage.getItem('counterOne');
    console.log(data,'data');
  }, []);
  
  return (
    <div class="text-gray-500 min-h-screen">
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-2xl font-bold">Shopping Cart</h1>
        </div>
      </header>
      <main class=" mx-auto px-4 py-6">
        <div class="bg-white shadow w-full p-6">
          
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl text-black font-semibold">Members (Early Bird)</h2>
            <span class="text-black">$99.00</span>
          </div>
          <hr class="my-4"/>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl text-black font-semibold">Fees</h2>
            <span class="text-black">$10.00</span>
          </div>
          <hr class="my-4"/>
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Total</h2>
            <span class="text-2xl text-black">$109.00</span>
          </div>
          <div class="flex justify-center mt-6">
            <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center">
            Proceed to payment
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
