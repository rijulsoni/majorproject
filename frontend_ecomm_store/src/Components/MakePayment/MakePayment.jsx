import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";
import { useAuth } from '../context/auth';
import {useNavigate} from "react-router-dom"
import "./MakePayment.css"
export default function MakePayment() {
const  navigate=useNavigate()
const [auth, setAuth] = useAuth();
  const [shippingData, setShippingData] = useState([]);

  const [totalAmount, setTotalAmount] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecretkey,setClientSecret]=useState("")
  console.log(totalAmount)




  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/orders/${auth.data._id}`);
      const data = response.data;
      const calculatedAmount = ((0.18 * data.totalPrice) + data.totalPrice).toFixed(2);
      setTotalAmount(calculatedAmount);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/shipping`)
      .then((response) => response.json())
      .then((data) => {
        setShippingData(data);
      })
      .catch((error) => {
        console.error("Error fetching shipping data:", error);
      });
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (totalAmount !== null) {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/payment/create`, { totalprice: totalAmount });
          setClientSecret(response.data.clientSecret)

          // Handle the response data
        }
      } catch (error) {
        console.error(error);
        // Handle any errors
      }
    };

    createPaymentIntent();
    console.log('clientSecret is>>>',clientSecretkey)
  }, [totalAmount]);

  const confirmPayment = async (e) => {
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecretkey, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        toast.success("Payment Successfull")
        navigate("/");
      })
      .catch((err) => console.warn(err));
  };


  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h1>Payment Page</h1>
        <img
          src="https://i.pinimg.com/originals/f8/c4/22/f8c422a0a0e6793b3f9113d419c5143a.gif"
          alt="payment"
          height={250}
        />
      </div>

      <div>
        <h5>Shipping Address</h5>
        {shippingData.length > 0 ? (
          <div>
            <p>Full Name: {shippingData[0].fullName}</p>
            <p>Email: {shippingData[0].email}</p>
            <p>Address: {shippingData[0].address}</p>
            <p>City: {shippingData[0].city}</p>
            <p>State: {shippingData[0].state}</p>
            <p>Postal Code: {shippingData[0].postalCode}</p>
            <p>Country: {shippingData[0].country}</p>
            <p>Phone: {shippingData[0].mobileNumber}</p>
          </div>

        ) : (
          <p>No shipping address found.</p>
        )}
      </div>

      <div>

        <hr />
        <h4>Total Amount : {totalAmount}</h4>
       <hr />
        <div>
        <h5>Payment Method</h5>
          <p>Card Details</p>

          <form >
      <CardElement  />
      <hr/>
      {error && <div>{error}</div>}
      <div style={{textAlign:"center",margin:"20px"}}>
      <button class="pay-button" onClick={confirmPayment} type="submit" disabled={!stripe}>
  Pay
</button>
</div>

    </form>
        </div>
      </div>
    </div>
  );
}
