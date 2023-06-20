import React,{useState} from 'react';
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./style.css";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
  const [success,setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error,paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
  
    if(!error){
      try{
        const {id} = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment',{
          amount: 1000,
          id
        });
        if(response.data.success){
          console.log('Successful payment');
          setSuccess(true);
        }
      }catch(error){
        console.log('Error',error);
      }
    }else{
      console.log(error.message);
    }
  }

  return (
    <div className='py-60 px-15 mx-auto max-w-lg shadow-lg '>
    {!success ? 
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement/>
          </div>
        </fieldset>
        <button>Pay</button>
      </form>
      :
      // <div>
      //   <h2>Payment Successful</h2>
      // </div>
              <div class="w-md mx-auto bg-white  rounded-lg overflow-hidden my-2 flex justify-center">
                  <div class="px-6 py-4 flex-initial">
                    <h3 class="font-bold text-4xl mb-1 text-gray-900">
                    Payment Successful
                    </h3>
                    <h5 class="text-2xl text-gray-600 mb-2 text-center">Thank You</h5>
                  </div>
              </div>
    }


    </div>
  )
}
