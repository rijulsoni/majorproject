import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function OrderPlaced() {
  const [orderData, setOrderData] = useState(null);
 

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/orders/648acb14cd74fe53284f7055`);
      const data = response.data;
      setOrderData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        <section className="h-100 gradient-custom">
          <div className="contain py-5 h-100" style={{ marginLeft: 'auto' }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="card" style={{ borderRadius: '10px' }}>
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>{orderData && orderData.userName}</span>!</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt</p>
                      <p className="small text-muted mb-0">Receipt Voucher: {orderData && orderData._id}</p>
                    </div>
                    {orderData &&
                      orderData.cart.map((item) => (
                        <div className="card shadow-0 border mb-4" key={item.id}>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <img src={item.image} className="img-fluid" alt="Phone" />
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">{item.category}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{item.name}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{item.brand}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">Qty: 1</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{item.price}</p>
                              </div>
                            </div>
                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                            <div className="row d-flex align-items-center">
                              <div className="col-md-2">
                                <p className="text-muted mb-0 small">Track Order</p>
                              </div>
                              <div className="col-md-10">
                                <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "20%", borderRadius: "16px", backgroundColor: "#a8729a" }}
                                    aria-valuenow="20"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                                <div className="d-flex justify-content-around mb-1">
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> &#8377;{orderData && orderData.totalPrice}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Invoice Date: 28 Jan, 2023</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">GST 18%</span> &#8377; {orderData && (0.18 * orderData.totalPrice).toFixed(2)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">Receipt Voucher: {orderData && orderData._id}</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span> Free
                      </p>
                    </div>
                  </div>
                  <div
                    className="card-footer border-0 px-4 py-5"
                    style={{ backgroundColor: 'black', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                  >
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                      Total paid: <span className="h2 mb-0 ms-2">&#8377;{orderData && ((0.18 * orderData.totalPrice) + orderData.totalPrice).toFixed(2)}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
