import React, { useState, useEffect } from 'react';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('/admin/manage-users/users'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
  
  if (!confirmDelete) {
    return;
  }
    try {
      const response = await fetch(`/admin/manage-users/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
        // window.alert("User deleted")
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
      <h2 className="mb-4">Manage Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.user_id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Name: </strong>{user.user_name} - <strong>Email: </strong>{user.user_email}- <strong>Contact : </strong> {user.user_contact}
            </div>
            <button
              onClick={() => handleDeleteUser(user.user_id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUser;
