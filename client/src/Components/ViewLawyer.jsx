import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaStar, FaIdCard, FaPhone, FaSearch } from 'react-icons/fa';

const ViewLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('/user/view-lawyers/lawyers');
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.lawyer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Lawyers</h2>
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by lawyer name"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control"
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {filteredLawyers.length === 0 ? (
          <p>No lawyers found.</p>
        ) : (
          filteredLawyers.map((lawyer) => (
            <li key={lawyer.lawyer_id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="lawyer-info">
                  <h5>{lawyer.lawyer_name}</h5>
                  <p>
                    <FaEnvelope /> {lawyer.lawyer_email}{' '}
                    <FaStar /> {lawyer.lawyer_rating}{' '}
                    <FaIdCard /> {lawyer.lawyer_license_no}{' '}
                    <FaPhone /> {lawyer.lawyer_contact}{' '}
                    <strong>Speciality: </strong>
                    {lawyer.specialities[0].speciality_name} -{' '}
                    <strong>Description: </strong>
                    {lawyer.specialities[0].description}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewLawyer;

