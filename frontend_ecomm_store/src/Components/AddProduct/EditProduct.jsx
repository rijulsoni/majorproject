import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";
import { toast } from "react-hot-toast";

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track the ID of the product being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (productId) => {
    setEditProductId(productId);
    toggleEditForm();
  };

  const toggleEditForm = () => {
    setIsEditing((prevState) => !prevState); // Toggle the value of isEditing
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully");
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr style={{border:"1px solid black"}}>
            <th className="heading">Name</th>
            <th className="heading">Price</th>
            <th className="heading">Category</th>
            <th className="heading">Brand</th>
            <th className="heading">Image</th>
            <th className="heading">Description</th>
            <th className="heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <img className="img1" src={product.image} alt="" />
              </td>
              <td>{product.description}</td>
              <td className="EditProduct__actions">
                {isEditing && editProductId === product._id ? (
                  <EditForm
                    product={product}
                    toggleEditForm={toggleEditForm}
                    fetchProducts={fetchProducts}
                  />
                ) : (
                  <>
                    <button onClick={() => handleEdit(product._id)}>Edit</button>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Separate component for the edit form
function EditForm({ product, toggleEditForm, fetchProducts }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);

  const handleSave = async (e) => {
    e.preventDefault();

    // Implement your save logic here
    try {
      const updatedProduct = {
        id: product._id,
        name,
        price,
        category,
        brand,
        image,
        description,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products/${product._id}`,
        updatedProduct
      );

      if (response.status === 200) {
        const { product: updatedProduct } = response.data;
        // Update the state or perform any other necessary actions

        console.log("Product updated successfully:", updatedProduct);
        // Close the edit form
        fetchProducts();
        toggleEditForm();
        toast.success("Product updated successfully");
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <form className="EditForm">
        <div className="EditForm__group">
          <label htmlFor="name1">Name:</label>
          <input
            type="text"
            id="name1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="EditForm__input"
            placeholder="Name"
            style={inputStyle}
          />
        </div>
        <div className="EditForm__group">
          <label htmlFor="price1">Price:</label>
          <input
            type="text"
            id="price1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="EditForm__input"
            placeholder="Price"
            style={inputStyle}
          />
        </div>
        <div className="EditForm__group">
          <label htmlFor="category1">Category:</label>
          <select
            id="category1"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Smartwatch">Smartwatches</option>
            <option value="Wireless Earbuds">Wireless Earbuds</option>
            <option value="Neckbands">Neckbands</option>
            <option value="Headphones">Headphones</option>
            <option value="Wireless Speakers">Wireless Speakers</option>
            <option value="Gaming Headphones">Gaming Headphones</option>
            <option value="Power Banks">Power Banks</option>
            <option value="Chargers">Chargers</option>
          </select>
        </div>
        <div className="EditForm__group">
          <label htmlFor="brand1">Brand:</label>
          <input
            type="text"
            id="brand1"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="EditForm__input"
            placeholder="Brand"
            style={inputStyle}
          />
        </div>
        <div className="EditForm__group">
          <label htmlFor="price1">Image :</label>
          <input
            type="text"
            id="price1"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="EditForm__input"
            placeholder="Image Url"
            style={inputStyle}
          />
        </div>
        <div className="EditForm__group">
          <label htmlFor="description1">Description:</label>
          <textarea
            id="description1"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleSave} type="submit" className="EditForm__button" style={buttonStyle}>
          Save
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  marginTop: "16px",
  padding: "8px 16px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditProduct;


