// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom"; // Make sure to import Link for routing

// const PendingUsers = () => {
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [loading, setLoading] = useState(true); // For loading state

//   useEffect(() => {
//     fetch("http://localhost:5005/api/pending-users")
//       .then((response) => response.json())
//       .then((data) => {
//         setPendingUsers(data);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error("Error fetching pending users:", error);
//         setLoading(false); // Set loading to false even if there's an error
//       });
//   }, []);

//   const approveUser = async (userId) => {
//     try {
//       const response = await axios.put(`http://localhost:5005/api/approve-user/${userId}`);
//       alert(response.data.message);
//       setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId)); // Update state with filtered users
//     } catch (err) {
//       console.error("Error approving user:", err);
//       alert("Failed to approve user");
//     }
//   };

//   const rejectUser = async (userId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5005/api/reject-user/${userId}`);
//       alert(response.data.message);
//       setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId)); // Update state with filtered users
//     } catch (err) {
//       console.error("Error rejecting user:", err);
//       alert("Failed to reject user");
//     }
//   };

//   return (
//     <div>
//       <h2>Pending Users</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : pendingUsers.length === 0 ? (
//         <p>No pending users</p>
//       ) : (
//         <table>
//         <thead>
//           <tr>
//             <th>Client Name</th>
//             <th>Status</th>
//             <th>Industry</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Contact Person</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingUsers.map((user) => (
//             <tr key={user._id}>
//               <td>
//                 <Link to={`/client/${user._id}`}>{user.client_name}</Link>
//               </td>
//               <td>{user.status}</td>
//               <td>{user.industry}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.contact_person}</td>
//               <td>
//                 <button onClick={() => approveUser(user._id)}>Approve</button>
//                 <button onClick={() => rejectUser(user._id)}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       )}
//     </div>
//   );
// };

// export default PendingUsers;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, message, Spin, Tag } from "antd";
import { Link } from "react-router-dom";

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5005/api/pending-users")
      .then((response) => response.json())
      .then((data) => {
        setPendingUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pending users:", error);
        setLoading(false);
      });
  }, []);

  const approveUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5005/api/approve-user/${userId}`);
      message.success(response.data.message);
      setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error approving user:", err);
      message.error("Failed to approve user");
    }
  };

  const rejectUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5005/api/reject-user/${userId}`);
      message.success(response.data.message);
      setPendingUsers((prevState) => prevState.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error rejecting user:", err);
      message.error("Failed to reject user");
    }
  };

  const handleAction = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleConfirm = (action) => {
    if (selectedUser) {
      action === "approve" ? approveUser(selectedUser._id) : rejectUser(selectedUser._id);
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Client Name",
      dataIndex: "client_name",
      render: (text, record) => <Link to={`/client/${record._id}`}>{text}</Link>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>,
    },
    {
      title: "Industry",
      dataIndex: "industry",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleAction(record)} style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleAction(record)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
  <h2 style={{ margin: '0 auto', fontSize: '24px', fontWeight: 'bold' }}>Pending Users</h2>
</div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={pendingUsers} rowKey="_id" pagination={{ pageSize: 5 }} />
      )}

      <Modal
        title="Confirm Action"
        visible={isModalVisible}
        onOk={() => handleConfirm("approve")}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="reject" type="danger" onClick={() => handleConfirm("reject")}>Reject</Button>,
          <Button key="approve" type="primary" onClick={() => handleConfirm("approve")}>
            Approve
          </Button>,
        ]}
      >
        <p>Are you sure you want to approve/reject {selectedUser?.client_name}?</p>
      </Modal>
    </div>
  );
};

export default PendingUsers;