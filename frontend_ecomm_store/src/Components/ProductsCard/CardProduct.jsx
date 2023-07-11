import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cardstyle.css';
import {Link} from "react-router-dom" 
import { toast } from 'react-hot-toast';
import { UseCart } from '../context/cart';
export default function CardProduct() {
  const [cart,setCart]=UseCart()
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div>
        <h3 className="ui2-heading">New <span><b>Launches</b></span></h3>
      </div>
      <div className="card-ecom">
        {shuffledProducts.slice(0,10).map((product) => (
          <div className="product-card" key={product._id}>
               <Link to={`/singleproduct/${product._id}`}>
            <img src={product.image} alt={product.name} />
            <h4 style={{height:"62px",color:"black"}}>{product.name}</h4>
            </Link>
            <p style={{textAlign:"center",color:"black"}}>{product.category}</p>
            <div>
           
              <span style={{ fontSize: '20px', color: 'black' }}>&#8377;{product.price}</span>
             
           
             <div className='divbtn'>
              <button onClick={()=>{setCart([...cart,product]) 
                     localStorage.setItem('cart',JSON.stringify([...cart,product])) 
                     toast.success("Item Added To Cart")}} type="button" className="btn1  text-white">
                <i className="icon-cart-add mr-2"></i> Add to cart
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container1 c-new" style={{ background: 'white' }}>
        <div className="section__color-wrapper promise-icons">
          <div className="mySect py-2">
            <div className="img-row text-center row justify-content-around pb-1 pb-lg-0" style={{ maxWidth: '100%', margin: 'auto' }}>
              <div className="col-3 pipe p-0">
                <div className="row myIconRow">
                  <div className="col-md-12 myIcon">
                    <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334305_small.svg?v=1682336123" />
                  </div>
                  <div className="col-md-12 myText">
                    <p className="mb-0"><b>1 year</b><br className="d-lg-none" /> Warranty</p>
                  </div>
                </div>
              </div>
              <div className="col-3 pipe p-0">
                <div className="row myIconRow">
                  <div className="col-md-12 myIcon">
                    <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334304_small.svg?v=1682336123" />
                  </div>
                  <div className="col-md-12 myText">
                    <p className="mb-0"><b>7 day</b><br className="d-lg-none" /> Replacement</p>
                  </div>
                </div>
              </div>
              <div className="col-3 pipe p-0">
                <div className="row myIconRow">
                  <div className="col-md-12 myIcon">
                    <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334303_small.svg?v=1682336123" />
                  </div>
                  <div className="col-md-12 myText">
                    <p className="mb-0"><b>Free</b><br className="d-lg-none" /> Shipping</p>
                  </div>
                </div>
              </div>
              <div className="col-3 pipe p-0">
                <div className="row myIconRow">
                  <div className="col-md-12 myIcon">
                    <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334302_small.svg?v=1682336123" />
                  </div>
                  <div className="col-md-12 myText">
                    <p className="mb-0"><b>GST</b><br className="d-lg-none" /> Billing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
