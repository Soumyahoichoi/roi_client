import React,{useState,useEffect, useContext} from 'react'
import CardOne , {CardTwo} from '../../Components/Card';
import supabase from '../../config/supabaseClient';
// import { Cart } from '../../Context';
import { useNavigate } from 'react-router-dom';
import Paybutton from '../../Components/Paybutton';
export default function Layout() {

  // const {value,setValue} = useContext(Cart);

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [extraRow, setExtraRow] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [counterValueTwo, setCounterValueTwo] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();
  let price, discount , currency , discountedPrice,addOns,totalPrice;
  let emailId = localStorage.getItem('email');
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
          .from('tb1')
          .select("discount,Currency,addOns,voucherPrice")
          .eq("EmailID", emailId);
        if(error){
          setError("could not fetch Data!");
          setData([]);
        }
        if(data){
          setData(data);
          setError(null);
        }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if( counterValueTwo > 0){
      totalPrice = discountedPrice + addOns;
      setTotalValue(totalPrice);
    }
    else {
      totalPrice = discountedPrice;
      setTotalValue(totalPrice);
    }
  }, [counterValue,counterValueTwo]);

  const handleDataOne = (data) => {
    setCounterValue(data);
  }

  const handleDataTwo = (data) => {
    setCounterValueTwo(data);
  }

  
  
  if(data.length > 0){
  price = data[0].voucherPrice;
  discount = data[0].discount;
  currency = data[0].Currency;
  addOns = data[0].addOns;
  discountedPrice = Math.floor(price - discount);
  }
  

  return (
    <React.Fragment>
      <section>
        <div className='w-screen h-screen grid grid-rows-2 text-white md:grid-cols-2'>
          <div className='w-full h-full bg-gray-100 md:h-screen container'>
              
              <div className='px-8'>
                    <header>
                      <div class="container mx-auto px-4 py-6 ">
                        <h1 class="text-2xl font-normal text-black border-b border-black">Early Bird Tickets   |   South Asia Member Registrations Open at SALC</h1>
                      </div>
                    </header>
              <CardOne 
              title="Member (Early Bird)" 
              description ={`Your voucher of ${currency} ${discount} has been applied as a discount on the actual ticket cost ${currency} ${price}`}
              discountedPrice={`${currency} ${discountedPrice} incl. 18% GST`}
              sendData={handleDataOne}
              counterData={counterValueTwo}
              />
              <CardTwo 
              title="Spouse/Life Partner (Early Bird)" 
              description={`We have some great experiences for everyone at RIE and can help curate a holiday 
              for you and your SLP before or after RIE while you are in India.`}
              subTitle={`Bring along your Spouse / Life Partner to India!`}
              discountedPrice={`${currency} ${addOns} incl. 18% GST`}
              sendData={handleDataTwo}
              />
              </div>

            </div>
            
          
          <div className='w-full h-full bg-gray-200 md:h-screen container'>
            {/* 
             Shopping Cart
             Purchase Overview
             */}
             <div className='w-full h-full'>
              {/* <Addtocart /> */}
              <div class="text-gray-500 min-h-screen">
                    <header class="bg-white shadow-md">
                      <div class="container mx-auto px-4 py-6">
                        <h1 class="text-2xl font-bold">Shopping Cart</h1>
                      </div>
                    </header>
                    
                    <main class=" mx-auto px-4 py-6">
                    { counterValue > 0 ? 
                    (
                    <>
                    <div class="bg-white shadow w-full p-6">
                        
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="text-xl text-black font-semibold">Members (Early Bird)</h2>
                          <span class="text-black">{currency} {discountedPrice}</span>
                        </div>
                        <hr class="my-4"/>
                        { counterValueTwo > 0 ? (
                          <div class="flex justify-between items-center mb-4">
                          <h2 class="text-xl text-black font-semibold">Spouse/Life Partner (Early Bird)</h2>
                          <span class="text-black">{currency} {addOns}</span>
                        </div>
                        )
                        :
                        null}
                        <div class="flex justify-between items-center mb-4">
                          <h2 class="text-xl text-black font-semibold">Fees</h2>
                          <span class="text-black">{currency} 10.00</span>
                        </div>
                        <hr class="my-4"/>
                        <div class="flex justify-between items-center">
                          <h2 class="text-2xl font-semibold">Total</h2>
                          <span class="text-2xl text-black">{currency} {totalValue}</span>
                        </div>
                        <div class="flex justify-center mt-6">
                          {/* <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
                          onClick={handleSubmit}>
                          Proceed to payment
                          </button> */}
                          <Paybutton amount={totalValue} user={emailId}/>
                          
                        </div>
                      </div>

                    </>)
                    : (
                    <>
                    <div class="bg-white shadow w-full p-6">
                    The shopping cart is empty. Please select tickets.
                    </div>
                    </>
                    )
                    }
                      
                    </main>
                  </div>
              </div>
            
          </div>
              
        </div>
      </section>
    </React.Fragment>
  )
}
