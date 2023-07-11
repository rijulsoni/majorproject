import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Components/context/auth';
import { CartProvider } from './Components/context/cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51NIt6KSCaxNQvXKq7t1hB12Cr8gNVA5glEewwjn3zEB9DotBIRGhTC6HJ1lJGWZg2ZmGAUZZufYFFqeBzpqiyoHL00JR8plX3e');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
     <BrowserRouter> 
     <Elements stripe={stripePromise}>
    <App />
  </Elements> 
    
 

    </BrowserRouter>
     </CartProvider>
     </AuthProvider>
    

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
