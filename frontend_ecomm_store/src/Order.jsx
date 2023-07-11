import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Order = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      {/* Display other order details here */}
    </div>
  );
};

export default Order;
