// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser } from '../services/userService';
import './styles/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const all = await fetchAllUsers();
        setUsers(all);
      } catch (err) {
        console.error('Access denied or not admin:', err);
        setError('You are not authorized to view this page.');
      }
    })();
  }, []);

  const handleRemove = async (id) => {
    if (!window.confirm('Ready to delete the user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.UserId !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
      alert('Could not delete user.');
    }
  };

  return (
    <div className="admin-page">
      <h2 className="page-heading">Admin Dashboard - Manage Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-wrapper">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Username</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.UserId}>
                <td>{u.UserId}</td>
                <td>{u.Email}</td>
                <td>{u.Username}</td>
                <td>{u.Role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(u.UserId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;