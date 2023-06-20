import axios from "axios";
import React, { useRef } from "react";

export default function Paybutton({ amount, user }) {
  const formRef = useRef(null);
  const handleCheckout = () => {
    formRef.current.submit();
    return;
    axios
      .post("https://riekolpayment.vercel.app/create-checkout-session", {
        amount: amount,
        user: user,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        onClick={handleCheckout}
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
      >
        Checkout
      </div>
      <form
        style={{ display: "none" }}
        ref={formRef}
        method="POST"
        name="customerData"
        action="https://localhost:4242/ccavRequestHandler"
      >
        <table width="40%" height="100" border="1" align="center">
          <caption>
            <font size="4" color="blue">
              <b>Integration Kit</b>
            </font>
          </caption>
        </table>
        <table width="40%" height="100" border="1" align="center">
          <tr>
            <td>Parameter Name:</td>
            <td>Parameter Value:</td>
          </tr>
          <tr>
            <td colspan="2">Compulsory information</td>
          </tr>
          <tr>
            <td>Merchant Id</td>
            <td>
              <input
                type="text"
                name="merchant_id"
                id="merchant_id"
                value="2"
              />{" "}
            </td>
          </tr>
          <tr>
            <td>Order Id</td>
            <td>
              <input type="text" name="order_id" value="21234124" />
            </td>
          </tr>
          <tr>
            <td>Currency</td>
            <td>
              <input type="text" name="currency" value="INR" />
            </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>
              <input type="text" name="amount" value="1.00" />
            </td>
          </tr>
          <tr>
            <td>Redirect URL</td>
            <td>
              <input
                type="text"
                name="redirect_url"
                value="http://127.0.0.1:3001/ccavResponseHandler"
              />
            </td>
          </tr>
          <tr>
            <td>Cancel URL</td>
            <td>
              <input
                type="text"
                name="cancel_url"
                value="http://127.0.0.1:3001/ccavResponseHandler"
              />
            </td>
          </tr>
          <tr>
            <td>Language</td>
            <td>
              <input type="text" name="language" id="language" value="EN" />
            </td>
          </tr>
          <tr>
            <td colspan="2">Billing information(optional):</td>
          </tr>
          <tr>
            <td>Billing Name</td>
            <td>
              <input type="text" name="billing_name" value="Peter" />
            </td>
          </tr>
          <tr>
            <td>Billing Address:</td>
            <td>
              <input type="text" name="billing_address" value="Santacruz" />
            </td>
          </tr>
          <tr>
            <td>Billing City:</td>
            <td>
              <input type="text" name="billing_city" value="Mumbai" />
            </td>
          </tr>
          <tr>
            <td>Billing State:</td>
            <td>
              <input type="text" name="billing_state" value="MH" />
            </td>
          </tr>
          <tr>
            <td>Billing Zip:</td>
            <td>
              <input type="text" name="billing_zip" value="400054" />
            </td>
          </tr>
          <tr>
            <td>Billing Country:</td>
            <td>
              <input type="text" name="billing_country" value="India" />
            </td>
          </tr>
          <tr>
            <td>Billing Tel:</td>
            <td>
              <input type="text" name="billing_tel" value="9876543210" />
            </td>
          </tr>
          <tr>
            <td>Billing Email:</td>
            <td>
              <input
                type="text"
                name="billing_email"
                value="testing@domain.com"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">Shipping information(optional):</td>
          </tr>
          <tr>
            <td>Shipping Name</td>
            <td>
              <input type="text" name="delivery_name" value="Sam" />
            </td>
          </tr>
          <tr>
            <td>Shipping Address:</td>
            <td>
              <input type="text" name="delivery_address" value="Vile Parle" />
            </td>
          </tr>
          <tr>
            <td>Shipping City:</td>
            <td>
              <input type="text" name="delivery_city" value="Mumbai" />
            </td>
          </tr>
          <tr>
            <td>Shipping State:</td>
            <td>
              <input type="text" name="delivery_state" value="Maharashtra" />
            </td>
          </tr>
          <tr>
            <td>Shipping Zip:</td>
            <td>
              <input type="text" name="delivery_zip" value="400038" />
            </td>
          </tr>
          <tr>
            <td>Shipping Country:</td>
            <td>
              <input type="text" name="delivery_country" value="India" />
            </td>
          </tr>
          <tr>
            <td>Shipping Tel:</td>
            <td>
              <input type="text" name="delivery_tel" value="0123456789" />
            </td>
          </tr>
          <tr>
            <td>Merchant Param1</td>
            <td>
              <input
                type="text"
                name="merchant_param1"
                value="additional Info."
              />
            </td>
          </tr>
          <tr>
            <td>Merchant Param2</td>
            <td>
              <input
                type="text"
                name="merchant_param2"
                value="additional Info."
              />
            </td>
          </tr>
          <tr>
            <td>Merchant Param3</td>
            <td>
              <input
                type="text"
                name="merchant_param3"
                value="additional Info."
              />
            </td>
          </tr>
          <tr>
            <td>Merchant Param4</td>
            <td>
              <input
                type="text"
                name="merchant_param4"
                value="additional Info."
              />
            </td>
          </tr>
          <tr>
            <td>Merchant Param5</td>
            <td>
              <input
                type="text"
                name="merchant_param5"
                value="additional Info."
              />
            </td>
          </tr>
          <tr>
            <td>Promo Code:</td>
            <td>
              <input type="text" name="promo_code" value="" />
            </td>
          </tr>
          <tr>
            <td>Customer Id:</td>
            <td>
              <input type="text" name="customer_identifier" value="" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      </form>
    </>
  );
}
