import React, { useState } from "react";
import "./Contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    
    order:"",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="contact-form">
      <h1>Contact Us</h1>
      <form action="https://public.herotofu.com/v1/29d54530-06a4-11ee-8267-d3eb100789b4" method="post" accept-charset="UTF-8">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Your Name</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Your Email</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="order"
            value={formData.order}
            onChange={handleChange}
            required
          />
          <label htmlFor="order">Order Id / Product Name</label>
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="message">Your Query</label>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
