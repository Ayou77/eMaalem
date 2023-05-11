import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { allCountriesList } from "../../utils/allCountries";

function Register() {
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isTasker: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await newRequest.post("http://localhost:8000/api/auth/register", user)
      .then((res) => {
        const { status } = res
        if (status === 201) {
          // navigate to login page
          navigate("/login");
        }
      })
  };


  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          {/* Username */}
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
          />

          {/* Email */}
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          

          {/* Password */}
          <label htmlFor="">Password</label>
          <input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} placeholder="Enter your password" />
          {/* show password */}
          <div className="showPassword">
          <input
            type="checkbox"
            name="showPassword"
            id="showPassword"
            onClick={() => setShowPassword(!showPassword)} />
          <label htmlFor="showPassword">Show password</label>
          </div>


          {/* Phone */}
          <label htmlFor="">Phone</label>
          <input name="phone" type="tel" pattern="(\+[0-9]{1,3)?0?\s?([0-9]{3})-?[0-9]{6,7}" onChange={handleChange} placeholder="Enter your phone" />
 

          {/* <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
          
          <label htmlFor="">Country</label>
          <select name="country" onChange={handleChange}>
            {allCountriesList.map((country, index) => {
                let value = country
              if (country === "Select Country") {
                value = ""
              }
              return <option key={index} value={value}>{country}</option>
            }
              
            )}
          </select>
          
          <button type="submit" onClick={handleSubmit}>Register</button>
        </div>
        {/* <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div> */}
      </form>
    </div>
  );
}

export default Register;
