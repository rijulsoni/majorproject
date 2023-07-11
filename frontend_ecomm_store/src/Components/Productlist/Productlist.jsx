import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./Productlist.css";
import { Link } from "react-router-dom";
import { UseCart } from "../context/cart";
import { toast } from "react-hot-toast";
export default function Productlist() {
  const [cart,setCart]=UseCart()
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredPriceRange, setFilteredPriceRange] = useState(null);

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

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const shuffledProducts = shuffleArray(products);

  const handleCategoryFilter = (category) => {
    setFilteredCategory(category);
  };

  const handlePriceRangeFilter = (priceRange) => {
    setFilteredPriceRange(priceRange);
  };

  const clearFilters = () => {
    setFilteredCategory(null);
    setFilteredPriceRange(null);
  };

  const filteredProducts = shuffledProducts.filter((product) => {
    let categoryFilter = true;
    let priceRangeFilter = true;

    if (filteredCategory && product.category !== filteredCategory) {
      categoryFilter = false;
    }

    if (filteredPriceRange) {
      const [minPrice, maxPrice] = filteredPriceRange.split("-");
      const productPrice = parseFloat(product.price);
      if (productPrice < minPrice || productPrice > maxPrice) {
        priceRangeFilter = false;
      }
    }

    return categoryFilter && priceRangeFilter;
  });

  return (
    <div className="body">
      <div className="sidebar sticky-sidebar">
        <h4>Filter by Category</h4>
         <ul>
          <li>
            <button onClick={() => handleCategoryFilter(null)}>All</button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Smartwatches")}>
              Smartwatches
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Wireless Earbuds")}>
              Wireless Earbuds
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Neckbands")}>
              Neckbands
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Wireless Speakers")}>
              Wireless Speakers
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Gaming Headphones")}>
              Gaming Headphones
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Power Banks")}>
              Power Banks
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Headphones")}>
              Headphones
            </button>
          </li>
          <li>
            <button onClick={() => handleCategoryFilter("Chargers")}>
              Chargers
            </button>
          </li>
        </ul>
        <h4>Filter by Price Range</h4>
       <ul>
          <li>
            <button onClick={() => handlePriceRangeFilter("100-500")}>&#8377;100 - &#8377;500</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("500-1000")}>&#8377;500 - &#8377;1000</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("1000-1500")}>&#8377;1000 - &#8377;1500</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("1500-2000")}>&#8377;1500 - &#8377;2000</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("2000-3000")}>&#8377;2000 - &#8377;3000</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("3000-4000")}>&#8377;3000 - &#8377;4000</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("4000-5000")}>&#8377;4000 - &#8377;5000</button>
          </li>
          <li>
            <button onClick={() => handlePriceRangeFilter("5000-6000")}>&#8377;5000 - &#8377;6000</button>
          </li>
          
        </ul>
        {(filteredCategory || filteredPriceRange) && (
          <button className="clear-filter" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <div className="contain d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-10" key={product._id}>
                <div className="card card-body">
                <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                  <Link to={`/singleproduct/${product._id}`}>
                    <div className="mr-2 mb-3 mb-lg-0">
                      <img
                        src={product.image}
                        width="200"
                        height="200"
                        alt={product.name}
                      />
                    </div>
                    <div className="media-body">
                      <h6 className="media-title font-weight-semibold">
                        <Link
                          className="productname"
                          to={`/singleproduct/${product._id}`}
                          data-abc="true"
                        >
                          {product.name}
                        </Link>
                      </h6>
                      <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="text-muted productcategory"
                            data-abc="true"
                          >
                            {product.category}
                          </Link>
                        </li>
                      </ul>
                      <p style={{ fontSize: "17px" }} className="mb-3">
                        {product.description}
                      </p>
                      <ul className="list-inline list-inline-dotted mb-0">
                        <li style={{ color: "black" }} className="list-inline-item">
                          All items from{" "}
                          <Link style={{ color: "blue" }} to="#" data-abc="true">
                            {product.brand}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Link>
                  <div
                    className="mt-3 mt-lg-0 ml-lg-3 text-center"
                    style={{ margin: "20px" }}
                  >
                    <h3 className="mb-0 font-weight-semibold">
                      &#8377; {product.price}
                    </h3>
                    <div>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="text-muted">1223 reviews</div>
                    <button onClick={()=>{setCart([...cart,product])
                      localStorage.setItem('cart',JSON.stringify([...cart,product]))
                    toast.success("Item Added To Cart")}} type="button" className="btnpro mt-4 text-white">
                      <i className="icon-cart-add mr-2"></i> Add to cart
                    </button>
                  </div>
                </div>
              </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <img
                src="https://www.bagbazaars.com/assets/img/no-product-found.png"
                alt="No products found"
                className="no-products-image"
              />
              <p style={{textAlign:"center"}}>No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
