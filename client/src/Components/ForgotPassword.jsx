import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/forgot-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (res.status === 200) {
        window.alert("Password reset Instructions sent to your email.");
        navigate('/login');
      } else if (res.status === 404) {
        window.alert("User not found. Please check your email and try again.");
      } else {
        window.alert("Password reset failed. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Forgot Password</h1>
            <p className="lead text-center">Enter your email to reset the password</p>
            <nav>
              <Link to="/login" className="btn btn-outline-light rounded-pill pb-2 w-500">Login</Link>
            </nav>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={email} onChange={handleChange} required />
                <div id="emailHelp" className="form-text">We'll send password reset instructions to this email.</div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;