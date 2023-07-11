import React from "react";
import Slider from "../Slider/Slider";
import Products from "../Products/Products";

import CardProduct from "../ProductsCard/CardProduct"



export default function Home() {
  return (
    <div>
      <Slider />
    
      <div>
       
        <Products/>
   
<CardProduct/>
      </div>
  


      
      
    </div>
  );
}
