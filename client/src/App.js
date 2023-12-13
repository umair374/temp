import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import Private from './Private';
import VerifyOtp from './Components/VerifyOtp';
import VerifyOtp2 from './Components/VerifyOtp2';
import ForgotPassword from './Components/ForgotPassword';
import AdminDashboard from './Components/AdminDashboard';
import LawyerDashboard from './Components/LawyerDashboard';
import ManageUser from './Components/ManageUser';
import ManageLawyer from './Components/ManageLawyer';
import NavigationBar from './Components/NavigationBar';
import ViewLawyer from './Components/ViewLawyer';

function App() {

  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);
  const [userType, setUserType] = useState('');

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (res.status === 200) {
        const result = await res.json();
        setUserType(result.userType);
        setauth(true)
        setauth1(false)
      }

      if (res.status === 401) {
        setauth(false)
        setauth1(true)
      }
    } catch (error) {
      console.log(error)
      setauth(false)
      setauth1(true)
      setUserType("");
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <div>

      <div>

        <nav>

          {auth1 ? (
            <>
              <Link to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                <i className="fa fa-sign-in me-2" /> Login </Link>
              <Link to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                <i className="fa fa-user-plus me-2" /> Register </Link>
              <Link to="/verify-otp" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                <i className="fa fa-check-circle me-2" /> verify Account </Link>
            </>
          )
            : (

              <div>
                <NavigationBar userType={userType} />
              </div>
            )}
        </nav>

      </div>

      <div>
        <Routes>
          <Route path="/user/dashboard" element={<Private component={Dashboard} auth={auth} userType={userType} />} />
          <Route path="/user/view-lawyer" element={<Private component={ViewLawyer} auth={auth} userType={userType}  />}/>
          <Route path="/admin/dashboard" element={<Private component={AdminDashboard} auth={auth} userType={userType} />} />
          <Route path="/lawyer/dashboard" element={<Private component={LawyerDashboard} auth={auth} userType={userType} />} />
          <Route path="/admin/manage-user" element={<Private component={ManageUser} auth={auth} userType={userType} />} />
          <Route path="/admin/manage-lawyer" element={<Private component={ManageLawyer} auth={auth} userType={userType}  />}/> 

          <Route path="/logout" element={<Private component={Logout} auth={auth} userType={""} />} />
          <Route path="/login" element={<Private component={Login} auth={auth1} userType={""} />} />
          <Route path="/register" element={<Private component={Register} auth={auth1} userType={""} />} />



          <Route path="/verify-otp/:email" element={<VerifyOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp2 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
