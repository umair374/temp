import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
  
  const history = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password} = user;
    try {
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         email, password
        })
      })
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials or User Not Verified")
      } else {
        const result = await res.json();

        console.log("RESULT:",result.userType);
        window.alert("Login Successfull");

        window.location.reload();
        //history.push('/')
        //navigate('/login')
        switch (result.userType) {
          case "user":
            history('/user/dashboard');
            break;
          case "admin":
            history('/admin/dashboard');
            break;
          case "lawyer":
            history('/lawyer/dashboard');
            break;
          default:
            history('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
            <h5 className="mb-4">OR</h5>
            <nav>
              <Link to="/register" className="btn btn-outline-light rounded-pill pb-2 w-500 "> Register </Link>
            </nav>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleChange} required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} required />
              </div>
              {/* <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Remember me</label>
              </div> */}
              <Link to="/forgot-password" className="btn btn-link text-primary mt-2">Forgot Password?</Link>
              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
