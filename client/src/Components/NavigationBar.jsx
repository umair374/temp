import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ userType }) => {
  return (
    <nav>
      {userType === 'user' && (
        <>
          <Link to="/user/dashboard" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-wrench me-2" /> Dashboard
          </Link>
          <Link to="/user/view-lawyer" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-briefcase me-2" /> View Lawyer
          </Link>
        </>
      )}
      {userType === 'admin' && (
        <>
          <Link to="/admin/dashboard" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-wrench me-2" /> Dashboard
          </Link>
          <Link to="/admin/manage-user" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-users me-2" /> Manage User
          </Link>
          <Link to="/admin/manage-lawyer" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-briefcase me-2" /> Manage Lawyer
          </Link>
        </>
      )}
      {userType === 'lawyer' && (
        <>
          <Link to="/lawyer/dashboard" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
            <i className="fa fa-wrench me-2" /> Dashboard
          </Link>
        </>
      )}
      <Link to="/logout" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
        <i className="fa fa-sign-out me-2" /> Logout
      </Link>
    </nav>
  );
};

export default NavigationBar;
