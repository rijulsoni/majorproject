import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Registration from "./Components/Login/Register";
import Footer from "./Components/Footer/Footer";
import Productlist from "./Components/Productlist/Productlist";
import AboutUs from "./Components/AboutUs/Aboutus";
import Contact from "./Components/Contact/Contact";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import NoPageFound from "./Components/Nopagefound/NoPageFound";
import OrderPlaced from "./Components/OrderPlaced/OrderPlaced";
import { Toaster } from "react-hot-toast";
import AddProduct from "./Components/AddProduct/AddProduct";
import EditProduct from "./Components/AddProduct/EditProduct";
import Smartwatches from "./Components/Productlist/Smartwatches/Smartwatches";
import WirelessEarbuds from "./Components/Productlist/Wireless Earbuds/WirelessEarbuds";
import Neckbands from "./Components/Productlist/Neckbands/Neckbands";
import Headphones from "./Components/Productlist/Headphones/Headphones";
import WirelessSpeakers from "./Components/Productlist/Wireless Speakers/WirelessSpeakers";
import GamingHeadphones from "./Components/Productlist/Gaming Headphones/GamingHeadphones";
import PowerBanks from "./Components/Productlist/Power Banks/PowerBanks";
import Chargers from "./Components/Productlist/Chargers/Chargers";
import ShippingForm from "./Components/Shipping/ShippingForm";
import MakePayment from "./Components/MakePayment/MakePayment";

function App() {
  return (
    <>
      <Toaster />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/product" element={<Productlist />} />
        <Route path="/shippingform" element={<ShippingForm />} />
        <Route path="/paymentpage" element={<MakePayment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:_id" element={<SingleProduct />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />

        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/smartwatches" element={<Smartwatches />} />
        <Route path="/wirelessEarbuds" element={<WirelessEarbuds />} />
        <Route path="/neckbands" element={<Neckbands />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/headphones" element={<Headphones />} />
        <Route path="/wirelessSpeakers" element={<WirelessSpeakers />} />
        <Route path="/gamingheadphones" element={<GamingHeadphones />} />
        <Route path="/powerbanks" element={<PowerBanks />} />
        <Route path="/chargers" element={<Chargers />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
