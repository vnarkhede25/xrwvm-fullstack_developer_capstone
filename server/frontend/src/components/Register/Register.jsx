import React, { useState } from "react";
import "./Register.css";

function RegisterPanel() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration form submitted");
  };

  return (
    <div className="register_container">
      <h1 className="header">Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input className="input_field" type="text" name="userName"
              placeholder="Username" value={formData.userName}
              onChange={handleChange} required />
          </div>

          <div className="input">
            <input className="input_field" type="text" name="firstName"
              placeholder="First Name" value={formData.firstName}
              onChange={handleChange} required />
          </div>

          <div className="input">
            <input className="input_field" type="text" name="lastName"
              placeholder="Last Name" value={formData.lastName}
              onChange={handleChange} required />
          </div>

          <div className="input">
            <input className="input_field" type="email" name="email"
              placeholder="Email" value={formData.email}
              onChange={handleChange} required />
          </div>

          <div className="input">
            <input className="input_field" type="password" name="password"
              placeholder="Password" value={formData.password}
              onChange={handleChange} required />
          </div>
        </div>

        <div className="submit_panel">
          <button className="submit" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPanel;
