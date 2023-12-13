import React from "react"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Register = (props) => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cnic: "",
    contact: "",
    address: ""
  });

  const [validationErrors, setValidationErrors] = useState({});
  const validateName = () => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(user.name);
  }

  const validateAddress = () => {
    const regex = /^[a-zA-Z0-9\s#&',.\-/]+$/;
    return regex.test(user.address);
  }

  const validatePassword = () => {
   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(user.password);
  }

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!validateName()) {
      errors.name = "Please enter a valid name (only alphabets and spaces allowed).";
    }
    if (!validateAddress()) {
      errors.address = "Please enter a valid address.Valid Char{#,&,',.,-,/}";
    }
    if (!validatePassword()) {
      errors.password = "8 Characters having numbers and words";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const { name, email, password, cnic, contact, address } = user;
    try {
      const res = await fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, cnic, address, contact, password
        })
      })
      if (res.status === 400 || !res) {
        window.alert("Already Used Details")
        setValidationErrors({});
      } else {
        window.alert("Registered Successfully,Verify OTP");
        navigate(`/verify-otp/${email}`);
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hi, Friend</h1>
            <p className="lead text-center">Enter Your Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <nav>
              <Link to="/login" className="btn btn-outline-light rounded-pill pb-2 w-500"> Login </Link>
            </nav>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Registration</h1>
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full name</label>
                <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInput} required />
                {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="abc@gmail.com" name="email" value={user.email} onChange={handleInput} required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="cnic" className="form-label">CNIC</label>
                <input type="cnic" className="form-control" id="cnic" name="cnic" pattern="[0-9]{13}" placeholder="*************" value={user.cnic} onChange={handleInput} required />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Full address</label>
                <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleInput} required />
                {validationErrors.address && <div className="text-danger">{validationErrors.address}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input type="tel" className="form-control" id="contact" pattern="[0-9]{4}-[0-9]{7}" placeholder="****-*******" name="contact" value={user.contact} onChange={handleInput} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInput} required />
                {validationErrors.password && (<div className="text-danger">{validationErrors.password}</div>)}
              </div>
              {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">I Agree Terms and Conditions</label>
              </div> */}
              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;
