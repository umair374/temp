import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// const bcryptjs = require('bcryptjs');

const ManageLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [newLawyer, setNewLawyer] = useState({
    lawyer_name: '',
    lawyer_email: '',
    lawyer_contact: '',
    lawyer_address: '',
    lawyer_license_no: '',
    lawyer_cnic_no: '',
    lawyer_password: '',
    lawyer_rating: '',
    speciality_name: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateName = () => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(newLawyer.lawyer_name);
  }

  const validateSpeciality = () => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(newLawyer.speciality_name);
  }

  const validateAddress = () => {
    const regex = /^[a-zA-Z0-9\s#&',.\-/]+$/;
    return regex.test(newLawyer.lawyer_address);
  }

  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(newLawyer.lawyer_password);
  }

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setNewLawyer({ ...newLawyer, [name]: value });
  }

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('/admin/manage-lawyers/lawyers');
        const data = await response.json();
        setLawyers(data);
      } catch (error) {
        setError('Error fetching lawyers');
        console.error('Error fetching lawyers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleDeleteLawyer = async (lawyerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lawyer?");
  
  if (!confirmDelete) {
    return;
  }
    try {
      const response = await fetch(`/admin/manage-lawyers/lawyers/${lawyerId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        setLawyers((prevLawyers) => prevLawyers.filter((lawyer) => lawyer.lawyer_id !== lawyerId));
        window.alert("Lawyer Deleted")
      } else {
        console.error('Failed to delete lawyer');
      }
    } catch (error) {
      console.error('Error deleting lawyer:', error);
    }
  };

  const handleAddLawyer = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!validateSpeciality()) {
      errors.speciality_name = "Please enter a valid speciality (only alphabets and spaces allowed).";
    }
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
    // const hashedPassword = await bcryptjs.hash(newLawyer.lawyer_password, 10);
    // newLawyer.lawyer_password=hashedPassword;

    try {
      const response = await fetch('/admin/manage-lawyers/lawyers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLawyer),
      });

      if (response.status === 201) {
        window.alert("Credientals Sent to Lawyer email");
        const addedLawyer = await response.json();
        setLawyers((prevLawyers) => [...prevLawyers, addedLawyer]);
        setNewLawyer({
          lawyer_name: '',
          lawyer_email: '',
          lawyer_contact: '',
          lawyer_address: '',
          lawyer_license_no: '',
          lawyer_cnic_no: '',
          lawyer_password: '',
          lawyer_rating: '',
          speciality_name: '',
          description: '',
        });
      } else if (response.status === 400 || !response) {
        window.alert("Already Used Details")
        setValidationErrors({});
      }
    } catch (error) {
      console.error('Error adding lawyer:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Lawyers</h2>
      <ul className="list-group">
        {lawyers.map((lawyer) => (
          <li key={lawyer.lawyer_id} className="list-group-item d-flex justify-content-between align-items-center">
            <div >
              <div>
                <strong>Name: </strong>{lawyer.lawyer_name} - <strong>Email: </strong>{lawyer.lawyer_email} - <strong>Rating: </strong>{lawyer.lawyer_rating} - <strong>License : </strong> {lawyer.lawyer_license_no}
                - <strong>Contact : </strong> {lawyer.lawyer_contact} - <strong>Speciality : </strong> {lawyer.specialities[0].speciality_name}
              </div>
              {lawyer.specialities && lawyer.specialities.length > 0 && (
                <div>
                  
                </div>
              )}
            </div>
            <div >
              <button
                onClick={() => handleDeleteLawyer(lawyer.lawyer_id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Add Lawyer</h1>
            <p className="lead text-center">Enter Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <nav>
              <Link to="/admin/manage-user" className="btn btn-outline-light rounded-pill pb-2 w-500"> Manage User </Link>
            </nav>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Registration</h1>
            <form onSubmit={handleAddLawyer} method="POST">

              <div className="mb-3">
                <label htmlFor="lawyer_name" className="form-label">Lawyer Name:</label>
                <input type="text" className="form-control" id="lawyer_name" name="lawyer_name" value={newLawyer.lawyer_name} onChange={handleInput} required />
                {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="lawyer_email" className="form-label">Lawyer Email:</label>
                <input type="email" className="form-control" id="lawyer_email" name="lawyer_email" placeholder="abc@gmail.com" value={newLawyer.lawyer_email} onChange={handleInput} required />
              </div>

              <div className="mb-3">
                <label htmlFor="lawyer_contact" className="form-label">Lawyer Contact:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="lawyer_contact"
                  name="lawyer_contact"
                  value={newLawyer.lawyer_contact}
                  onChange={handleInput}
                  pattern="[0-9]{4}-[0-9]{7}"
                  placeholder="****-*******"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lawyer_address" className="form-label">Lawyer Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lawyer_address"
                  name="lawyer_address"
                  value={newLawyer.lawyer_address}
                  onChange={handleInput}
                  required
                />
                {validationErrors.address && <div className="text-danger">{validationErrors.address}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="lawyer_license_no" className="form-label">Lawyer License Number:</label>
                <input
                  type="license"
                  className="form-control"
                  id="lawyer_license_no"
                  name="lawyer_license_no"
                  pattern="[a-zA-z]{2}-[0-9]{4}/[0-9]{1}"
                  placeholder="PK-1234/18"
                  value={newLawyer.lawyer_license_no}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lawyer_cnic_no" className="form-label">Lawyer CNIC Number:</label>
                <input
                  type="cnic"
                  className="form-control"
                  id="lawyer_cnic_no"
                  name="lawyer_cnic_no"
                  value={newLawyer.lawyer_cnic_no}
                  pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                  placeholder="12345-1234567-1"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lawyer_password" className="form-label">Lawyer Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="lawyer_password"
                  name="lawyer_password"
                  value={newLawyer.lawyer_password}
                  onChange={handleInput}
                  required
                />
                {validationErrors.password && (<div className="text-danger">{validationErrors.password}</div>)}
              </div>
              <div className="mb-3">
                <label htmlFor="lawyer_rating" className="form-label">Lawyer Rating:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="lawyer_rating"
                  name="lawyer_rating"
                  value={newLawyer.lawyer_rating}
                  pattern="[0-5]{1}"
                  placeholder="5"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="speciality_name" className="form-label">Speciality Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="speciality_name"
                  name="speciality_name"
                  value={newLawyer.speciality_name}
                  onChange={handleInput}
                  required
                />
                {validationErrors.speciality_name && <div className="text-danger">{validationErrors.speciality_name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Speciality Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={newLawyer.description}
                  onChange={handleInput}
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLawyer;
