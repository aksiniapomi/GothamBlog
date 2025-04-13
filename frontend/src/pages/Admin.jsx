import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/userService';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Access denied or not admin:", err);
        setError("You are not authorized to view this page.");
      }
    };

    getUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin-only Access</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul>
        {users.map((u) => (
          <li key={u.userId}>{u.email} — {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;