import React, { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //submit button
  function handleSubmit(e) {
    e.preventDefault();

    setFormErrors(validation(userData));
    setIsSubmitted(true);
  }

  //input validtion
  function validation(data) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.username) errors.username = "Username is required";

    if (!data.email) errors.email = "Email is required";
    else if (!regex.test(data.email))
      errors.email = "Please enter a vlid email";
    if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 8)
      errors.password = "Password must be 8 characters long";

    if (!data.confirmPassword) errors.confirmPassword = "Re-enter to confirm";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords not mached";

    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  }

  return (
    <div className="App">
      <div className="container">
        {/* <pre>{JSON.stringify(userData, undefined, 2)}</pre> */}

        {Object.values(formErrors).length === 0 && isSubmitted && (
          <div className="success">Signup successfull</div>
        )}
        <form className="form">
          <h1>Login Form</h1>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <small>{formErrors.username}</small>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleChange}
            />
            <small>{formErrors.email}</small>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
            />
            <small>{formErrors.password}</small>
          </div>
          <div className="field">
            <label> confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              onChange={handleChange}
            />
            <small>{formErrors.confirmPassword}</small>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
