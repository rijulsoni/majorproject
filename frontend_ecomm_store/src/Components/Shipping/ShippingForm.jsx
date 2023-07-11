

import React, { useState } from 'react';
import './ShippingForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function ShippingForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [submitted, setSubmitted] = useState(false); // Submitted state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading

      // Create an object with the form data
      const formData = {
        fullName,
        email,
        address,
        city,
        state,
        postalCode,
        country,
        mobileNumber,
      };

      // Send a POST request to the server with the form data
      const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/shipping`, formData);

      // Handle the response as needed
      toast.success("Address is Stored");
      console.log(response.data);

      setSubmitted(true); // Set submitted to true after successful submission
      setLoading(false); // Stop loading
    } catch (error) {
      console.error(error);
      // Handle the error
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Shipping Address</h1>
      <div className="container">
        <form style={{ marginTop: "10px", marginBottom: "10px" }} className="shipping-form" onSubmit={handleSubmit}>
         

          <div  className="form-row">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          pattern="[0-9]{10}"
        />
      </div>

          <div style={{ textAlign: "center" }}>
            {!submitted ? (
              <button className="buttonform" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            ) :  <Link style={{fontSize:"20px",fontWeight:"bold"}} to="/paymentpage" >Make Payment</Link>}
           
          </div>
        </form>
      </div>
    </>
  );
}

export default ShippingForm;
