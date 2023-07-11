import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import { UseCart } from "../context/cart";
import { toast } from "react-hot-toast";

export default function SingleProduct() {
  const [cart,setCart]=UseCart()
  const { _id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (_id) {
      fetchProduct(_id);
    }
  }, [_id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{marginLeft:"auto",marginTop:"auto"}} className="contain d-flex align-items-center justify-content-center">
        <div className="row dd-flex justify-content-center">
          <div className="col-md-9">
            <div className="card1 px-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex flex-row align-items-center">
                    <i className="fa fa-apple fs-1"></i>
                    <span style={{marginTop:"5px"}} className="fw-bold ms-1 fs-1">{product.brand}</span>
                  </div>
                  <h1 className="fs-3 ms-1 mt-3">{product.name}</h1>
                  <div className="ms-1">
                    <span>{product.description}</span>
                  </div>
                  <div>
                  <h5 className=" ms-1 mt-3">{product.category}</h5>
                    <h1 style={{ marginTop: "5px" }} className="fs-1 ms-1 mt-3">
                      Price: &#8377;{product.price}
                    </h1>
                  </div>
                  <div>
                    <button className="button" onClick={()=>{setCart([...cart,product])
                    localStorage.setItem('cart',JSON.stringify([...cart,product]))
                    toast.success("Item Added To Cart")}} >
                      <span style={{ color: "whitesmoke" }}>Add To Cart</span>
                      <i className="ms-2 fa fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="container1 c-new " style={{background:"white"}}>
    <div className="section__color-wrapper promise-icons">
        <div className="mySect py-2">
            <div className="img-row text-center row justify-content-around pb-1 pb-lg-0" style={{maxWidth: "100%",margin:"auto"}}>
                
                    <div className="col-3 pipe p-0">
                        <div className="row myIconRow">
                            <div className="col-md-12 myIcon">
                                <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334305_small.svg?v=1682336123"/>
                            </div>
                            <div className="col-md-12 myText">
                                <p className="mb-0"><b>1 year </b><br className="d-lg-none"/> Warranty</p>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-3 pipe p-0">
                        <div className="row myIconRow">
                            <div className="col-md-12 myIcon">
                                <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334304_small.svg?v=1682336123"/>
                            </div>
                            <div className="col-md-12 myText">
                                <p className="mb-0"><b>7 day</b><br className="d-lg-none"/> Replacement</p>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-3 pipe p-0">
                        <div className="row myIconRow">
                            <div className="col-md-12 myIcon">
                                <img className="img" alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334303_small.svg?v=1682336123"/>
                            </div>
                            <div className="col-md-12 myText">
                                <p className="mb-0"><b>Free</b><br className="d-lg-none"/> Shipping</p>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-3 pipe p-0">
                        <div className="row myIconRow">
                            <div className="col-md-12 myIcon">
                                <img className="img"alt="" loading="lazy" src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334302_small.svg?v=1682336123"/>
                            </div>
                            <div className="col-md-12 myText">
                                <p className="mb-0"><b>GST</b><br className="d-lg-none"/> Billing</p>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
</div>
    </div>
  );
}
