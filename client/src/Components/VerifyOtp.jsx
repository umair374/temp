import React, { useState } from "react";
import {Link, useNavigate, useParams } from 'react-router-dom';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [otp, setOtp] = useState("");

    const handleInput = (event) => {
        setOtp(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('/verify-otp', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            if (res.status === 200) {
                window.alert("Email verified. You can now login.");
                navigate('/login');
            } else {
                window.alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit2 = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('/otp-mail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            if (res.status === 200) {
                window.alert("Email Sent");
                navigate(`/verify-otp/${email}`);
            } else {
                window.alert("Invalid Mail");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                        <h1 className="display-4 fw-bolder">Hi, Friend</h1>
                        <p className="lead text-center">Enter OTP To Verify</p>
                        <h5 className="mb-4">OR</h5>
                        <nav>
                            <Link to="/login" className="btn btn-outline-light rounded-pill pb-2 w-500"> Login </Link>
                        </nav>
                    </div>

                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">Verify OTP</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <input type="text" className="form-control" id="otp" name="otp" value={otp} onChange={handleInput} required />
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">Verify</button>
                        </form>
                        <form onSubmit={handleSubmit2}>
                        <button type="submit" className="btn btn-link text-primary mt-2"> Resend OTP </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
