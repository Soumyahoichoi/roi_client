import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Option from "./Pages/Options";
import Response from "./Pages/Response";
import SignUp from "./Pages/Signup";
// import StripeContainer from './Components/StripeContainer';
import InitiateTransaction from "./Components/InitiateTransaction";
import PaymentFailed from "./Components/paymentFail";
import PaymentSuccess from "./Components/paymentSuccess";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <div className="">
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<Option />} />
          <Route path="/contact" element={<Response />} />
          <Route path="/layout" element={<Layout />} />
          <Route
            path="/initiate-transaction"
            element={<InitiateTransaction />}
          />
          <Route
            path="/initiate-transaction/usd"
            element={<InitiateTransaction isUsd />}
          />
          {/* <Route path="/payment" element={ <StripeContainer/> } /> */}
          <Route path="/payment-successed" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
