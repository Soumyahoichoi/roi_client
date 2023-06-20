
import './App.css';
import { Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Option from './Pages/Options';
import Response from './Pages/Response';
import SignUp from './Pages/Signup';
import Layout from './Pages/Layout';
// import StripeContainer from './Components/StripeContainer';
import PageNotFound from './Pages/PageNotFound';
import PaymentSuccess from './Components/paymentSuccess';
import PaymentFailed from './Components/paymentFail';

function App() {
  return (
    <div className=''> 
    <div className=''>
        <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={ <Option/> } />
        <Route path="/contact" element={ <Response/> } />
        <Route path="/layout" element={ <Layout/> } />
        {/* <Route path="/payment" element={ <StripeContainer/> } /> */}
        <Route path="/payment-successed" element={<PaymentSuccess/>} />
        <Route path="/payment-failed" element={<PaymentFailed/>} />
        <Route path="*" element={ <PageNotFound/> } />
      </Routes>
    </div>
    </div>
  );
}

export default App;
