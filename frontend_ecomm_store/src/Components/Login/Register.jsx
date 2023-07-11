import React, { useState } from "react";
import "./Register.css";
import { useNavigate} from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";

export default function Registration() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = data;
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchdata = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/register`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchdata.json();
        console.log(dataRes);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/profile")
        }
       
      } else {
        toast("Password and Confirm Password not Matched ");
      }
    } else {
      toast("Please Enter Required Fields");
    }

   
  };

  return (
    <div>
      <div className=" mt-5  border border-2 border-primary"></div>
      <div className=" container shadow px-4">
        <div className="mb-3 mt-md-4">
          <h1 className="fw-bold mb-2 text-center text-uppercase">Store4you</h1>
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3" controlId="Name">
                <label >Name</label>
                <input
                  style={{ width: "95%" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3" controlId="formBasicEmail">
                <label >Email address</label>
                <input
                  style={{ width: "95%" }}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3" controlId="formBasicPassword">
                <label>Password</label>
                <div style={{ display: "flex" }}>
                  <input
                    style={{ width: "95%" }}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BiShow size={24} /> : <BiHide size={24} />}
                  </span>
                </div>
              </div>

              <div className="mb-3" controlId="formBasicConfirmPassword">
                <label>Confirm Password</label>
                <div style={{ display: "flex" }}>
                  <input
                    style={{ width: "95%" }}
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <BiShow size={24} />
                    ) : (
                      <BiHide size={24} />
                    )}
                  </span>
                </div>
              </div>

              <div className="d-grid">
                <button className="btn2 btn-primary" type="submit">
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-3 mb-3">
              <p className="mb-5 text-center">
                Already have an account?
                <a href="/profile" className="text-primary fw-bold">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
