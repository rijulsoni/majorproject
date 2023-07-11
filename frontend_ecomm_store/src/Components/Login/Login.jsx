import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import "./Login.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../context/auth";
function Login() {
  const [auth,setAuth]=useAuth()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
   
  });

  const [loggedInUser, setLoggedInUser] = useState(null); // State to store the logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password  } = data;
    if (email && password ) {
      try {
        // Make the login request and handle the response
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
          // Login successful
          const { name } = responseData.data;
          toast.success(`Welcome, ${name}`);
       
          toast.success(responseData.message);
          setAuth(responseData)

        localStorage.setItem("auth",JSON.stringify(responseData))
          setLoggedInUser(responseData.data); // Set the logged-in user
          setTimeout(() => {
            navigate("/");
          }, 1000);
        
        } else {
          // Login failed
          toast.error(responseData.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error logging in");
      }
    }
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  return (<>
 
    <div className="my-5">
    
      <div style={{ border: "5px solid black", borderRadius: "10px" }} className="container">
       
       <div className="row g-0">
<div className="col-md-6 d-flex align-items-start">
  <img
    src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Party_Animal_4.png?v=1685942349"
    alt="login form"
    className="rounded-start w-100 h-100 mt-0"
  />
</div>
<div className="col-md-6">
  <div className="card-body d-flex flex-column">
    <div className="d-flex flex-row mt-2">
      <i className="far fa-user fa-3x me-3" style={{ color: "black" }} />
      <span className="h2 fw-bold mb-0">Store4you</span>
     
    </div>
    <h5
      className="fw-bold my-4 pb-3"
      style={{ letterSpacing: "1px", fontSize: "17px",fontWeight:"bold" }}
    >
      Sign into your account
    </h5>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
      autoComplete="true"
          style={{ width: "90%" }}
          type="email"
          className="form-control form-control-lg"
          id="email"
          name="email"
          value={data.email}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div style={{ display: "flex" }}>
          <input autoComplete="true"
            style={{ width: "90%" }}
            type={showPassword ? "text" : "password"}
            className="form-control form-control-lg"
            id="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            style={{ cursor: "pointer",marginTop:"-38px" }}
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow size={24} /> : <BiHide size={24} />}
          </span>
        </div>
      </div>
      <button className="btn1s btn-dark mb-4 px-5" type="submit">
        Login
      </button>
    </form>
   
    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
      Don't have an account? <a href="/register" style={{ color: "#393f81" }}>Register here</a>
    </p>
    <div className="d-flex flex-row justify-content-start">
      <a href="#!" className="small text-muted me-1">Terms of use.</a>
      <a href="#!" className="small text-muted">Privacy policy</a>
    </div>
  </div>
</div>
</div>
      </div>
    </div>
    </>
  );
}

export default Login;
