import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import { toast } from "react-hot-toast";
import { BiCategory } from "react-icons/bi";
import EditProduct from "./EditProduct";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a product object with the form data
    const productData = {
      name,
      price,
      brand,
      category,
      image,
      description,
    };

    try {
      // Make a POST request to the API to create the product
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        // Product created successfully
        const data = await response.json();
        console.log(data);
        // Reset the form fields
        setName("");
        setPrice(0);
        setBrand("");
        setCategory("");
        setCategory("");
        setImage("");
        setDescription("");
        toast.success("Product added successfully");
      } else {
        // Error creating product
        console.error("Error creating product");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (<>
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
       
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
           
            <option value="">Select Category  </option>
            <option value="Smartwatches">Smartwatches</option>
            <option value="Wireless Earbuds">Wireless Earbuds</option>
            <option value="Neckbands">Neckbands</option>
            <option value="Headphones">Headphones</option>
            <option value="Wireless Speakers">Wireless Speakers</option>
            <option value="Gaming Headphones">Gaming Headphones</option>
            <option value="Power Banks">Power Banks</option>
            <option value="Chargers">Chargers</option>
          </select>
         
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
      
    </div>
    <div className="product-list">
    <h3 style={{color:"#2f234f",marginLeft:"79px",fontSize:"35px",fontFamily:"unset"}}>Product List:</h3>
    <EditProduct/>
  </div>
  </>
  );
}

export default AddProduct;
