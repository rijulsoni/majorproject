import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { UseCart } from '../context/cart';
import { useAuth } from '../context/auth';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
export default function Cart() {
  
 
 
  


  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = UseCart();
 // State variable to store the order ID

  const removeCartItem = (pid) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalprice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = () => {
    const orderData = {
      cart: cart,
      totalPrice: totalprice(),
      userId: auth.data._id,
      userName: auth.data.name,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/orders`, orderData)
      .then((response) => {
        setCart([]);
        console.log(response.data);
     
        localStorage.removeItem('cart');
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div>
      <div
        style={{
          margin: 'auto',
          maxWidth: '950px',
          width: '90%',
          boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          borderRadius: '1rem',
          border: 'transparent',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '4vh 5vh',
            borderBottomLeftRadius: '1rem',
            borderTopLeftRadius: '1rem',
          }}
        >
          <div style={{ marginBottom: '5vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: '1' }}>
                <h4>
                  <b>
                    {cart?.length
                      ? `You have ${cart.length} items in shopping cart ${auth?.token ? '' : 'please login to checkout'}`
                      : 'Your Cart is Empty'}
                  </b>
                </h4>
              </div>
              <div style={{ alignSelf: 'center', textAlign: 'right', color: 'rgb(153, 153, 153)' }}>
                {cart.length} items
              </div>
            </div>
          </div>

          {/* First item */}
          {cart?.map((p) => (
            <div style={{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }} key={p._id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '0 0 3.5rem', padding: '0 1vh' }}>
                  <img style={{ width: '120px ', height: '100%' }} src={p.image} alt="Shirt" />
                </div>
                <div style={{ flex: '1', padding: '0 1vh' }}>
                  <div style={{ color: 'rgb(153, 153, 153)' }}>{p.name}</div>
                  <div style={{ fontWeight: 'bold' }}>{p.category}</div>
                  <hr />
                  <div style={{ color: '#2f234f' }}>{p.description}</div>
                </div>
                <div style={{ flex: '0 0 auto', marginLeft: 'auto' }}>
                  &#8377; {p.price}
                  <span
                    style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
                    onClick={() => removeCartItem(p._id)}
                    className="close"
                  >
                    &#10005;
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '4.5rem' }}>
            <Link to="/">
              <span style={{ color: 'rgb(153, 153, 153)' }}>Back to shop</span>
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ddd',
            border: '1px solid rgba(0,0,0,.1)',
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            padding: '4vh',
            color: 'rgb(65, 65, 65)',
          }}
        >
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ paddingLeft: '0' }}>{cart.length} Items</div>
            <div style={{ textAlign: 'right' }}>&#8377; {totalprice()}</div>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ paddingLeft: '0' }}>18% GST</div>
            <div style={{ textAlign: 'right' }}>{(0.18 * totalprice()).toFixed(2)}</div>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ paddingLeft: '0' }}>Shipping Charges</div>
            <div style={{ textAlign: 'right' }}>Free Delivery</div>
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>TOTAL PRICE</div>
              <div style={{ textAlign: 'right' }}>&#8377; {((totalprice()) + (0.18 * totalprice())).toFixed(2)}</div>
            </div>
          </div>

          {cart.length > 0 && (
            <Link to={`/shippingform`} style={{ textDecoration: 'none' }}>
              
              <button
                onClick={placeOrder}
                style={{
                  backgroundColor: '#000',
                  borderColor: '#000',
                  color: 'white',
                  width: '100%',
                  fontSize: '0.7rem',
                  marginTop: '4vh',
                  padding: '1vh',
                  borderRadius: '0',
                }}
              >
                Place Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
