import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Make sure to import Link for routing

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    fetch("http://localhost:5005/api/pending-users")
      .then((response) => response.json())
      .then((data) => {
        setPendingUsers(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching pending users:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const approveUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5005/api/approve-user/${userId}`);
      alert(response.data.message);
      setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId)); // Update state with filtered users
    } catch (err) {
      console.error("Error approving user:", err);
      alert("Failed to approve user");
    }
  };

  const rejectUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5005/api/reject-user/${userId}`);
      alert(response.data.message);
      setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId)); // Update state with filtered users
    } catch (err) {
      console.error("Error rejecting user:", err);
      alert("Failed to reject user");
    }
  };

  return (
    <div>
      <h2>Pending Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Status</th>
            <th>Industry</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Contact Person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/client/${user._id}`}>{user.client_name}</Link>
              </td>
              <td>{user.status}</td>
              <td>{user.industry}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.contact_person}</td>
              <td>
                <button onClick={() => approveUser(user._id)}>Approve</button>
                <button onClick={() => rejectUser(user._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default PendingUsers;
