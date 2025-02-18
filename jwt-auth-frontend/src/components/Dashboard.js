
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';
// import PendingUsers from "../components/PendingUser";
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [clients, setClients] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filters, setFilters] = useState({
//     region: '',
//     industry: '',
//     status: '',
//   });
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [sortColumn, setSortColumn] = useState('client_name');
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
//   const [editingClient, setEditingClient] = useState(null); // Client being edited
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchClients();
//   }, [filters, sortColumn, sortOrder]);

//   const fetchClients = () => {
//     const query = new URLSearchParams({
//       search,
//       region: filters.region,
//       industry: filters.industry,
//       status: filters.status,
//       sortColumn,
//       sortOrder,
//     });

//     axios
//       .get(`http://localhost:5005/api/users?${query.toString()}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then((response) => {
//         setClients(response.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching clients:', err);
//       });
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSort = (column) => {
//     const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(newSortOrder);
//     setSortColumn(column);
//   };

  // const handleEditClick = (client) => {
  //   setEditingClient(client); // Set the client for editing
  // };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingClient({ ...editingClient, [name]: value });
  // };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setEditingClient({
//       ...editingClient,
//       address: {
//         ...editingClient.address,
//         [name]: value,
//       },
//     });
//   };

  // const handleEditSubmit = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5005/api/users/${editingClient._id}`,
  //       editingClient,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //     // Update client list with the new details
  //     setClients(
  //       clients.map((client) =>
  //         client._id === editingClient._id ? editingClient : client
  //       )
  //     );
  //     setEditingClient(null); // Close the editing form
  //   } catch (err) {
  //     console.error('Error updating client:', err);
  //     setError('Failed to update client. Please try again.');
  //   }
  // };

//   const handleDelete = (clientId) => {
//     axios
//       .delete(`http://localhost:5005/api/users/${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then(() => {
//         setClients(clients.filter((client) => client._id !== clientId));
//         alert('Client deleted successfully');
//       })
//       .catch((err) => {
//         console.error('Error deleting client:', err);
//       });
//   };

//   return (
//     <div className="dashboard">
//       {/* <h1 className='Dash'>Client Dashboard</h1> */}
//       <PendingUsers />
//       <h1 className='Dash'>Clients</h1>
//       <input
//         type="text"
//         placeholder="Search clients..."
//         value={search}
//         onChange={handleSearch}
//       />

//       {/* Filter Options */}
//       <select name="region" onChange={handleFilterChange} value={filters.region}>
//         <option value="">All Regions</option>
//         <option value="North America">North America</option>
//         <option value="Europe">Europe</option>
//         <option value="Asia">Asia</option>
//       </select>
//       <select
//         name="industry"
//         onChange={handleFilterChange}
//         value={filters.industry}
//       >
//         <option value="">All Industries</option>
//         <option value="Finance">Finance</option>
//         <option value="Technology">Technology</option>
//         <option value="Healthcare">Healthcare</option>
//       </select>
//       <select
//         name="status"
//         onChange={handleFilterChange}
//         value={filters.status}
//       >
//         <option value="">All Statuses</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>

//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort('client_name')}>Client Name</th>
//             <th onClick={() => handleSort('status')}>Status</th>
//             <th onClick={() => handleSort('industry')}>Industry</th>
            
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Contact Person</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client) => (
//             <tr key={client._id}>
//                 <td>
//                   <Link to={`/client/${client._id}`}>{client.client_name}</Link>
//                 </td>
              
              
//             <td>{client.status}</td>
//               <td>{client.industry}</td>
//               <td>{client.email}</td>
//               <td>{client.phone}</td>
//               <td>{client.contact_person}</td>
//               <td>
//                 <button onClick={() => handleEditClick(client)}>Edit</button>
//                 <button onClick={() => handleDelete(client._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editingClient && (
//         <div className="edit-modal">
//           <h3>Edit Client</h3>
//           <input
//             type="text"
//             name="client_name"
//             value={editingClient.client_name}
//             onChange={handleEditChange}
//             required
//           />
//           <input
//             type="text"
//             name="contact_person"
//             value={editingClient.contact_person}
//             onChange={handleEditChange}
//             required
//           />
//           <input
//             type="text"
//             name="email"
//             value={editingClient.email}
//             onChange={handleEditChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             value={editingClient.phone}
//             onChange={handleEditChange}
//             required
//           />
//           <input
//             type="text"
//             name="industry"
//             value={editingClient.industry}
//             onChange={handleEditChange}
//             required
//           />
//           <h3>Address</h3>
//           <input
//             type="text"
//             name="street"
//             value={editingClient.address?.street}
//             onChange={handleAddressChange}
//           />
//           <input
//             type="text"
//             name="city"
//             value={editingClient.address?.city}
//             onChange={handleAddressChange}
//           />
//           <input
//             type="text"
//             name="state"
//             value={editingClient.address?.state}
//             onChange={handleAddressChange}
//           />
//           <input
//             type="text"
//             name="postal_code"
//             value={editingClient.address?.postal_code}
//             onChange={handleAddressChange}
//           />
//           <input
//             type="text"
//             name="country"
//             value={editingClient.address?.country}
//             onChange={handleAddressChange}
//           />
//           <button onClick={handleEditSubmit}>Save</button>
//           <button onClick={() => setEditingClient(null)}>Cancel</button>
//           {error && <p>{error}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Select, Button, Modal, Form, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import PendingUsers from "../components/PendingUser";
import { Link } from 'react-router-dom';
import './Dashboard.css';

const { Search } = Input;
const { Option } = Select;

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ region: '', industry: '', status: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('client_name');
  const [authToken] = useState(localStorage.getItem('token') || '');
  const [editingClient, setEditingClient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClients();
  }, [filters, sortColumn, sortOrder]);

  const fetchClients = () => {
    const query = new URLSearchParams({ search, ...filters, sortColumn, sortOrder });
    axios.get(`http://localhost:5005/api/users?${query.toString()}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {
      
      const filteredClients = response.data.filter(client => client.isApproved === "approved" && client.role === "client");
      setClients(filteredClients);
    })
    .catch((err) => console.error('Error fetching clients:', err));
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (column) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

 
  const handleEditClick = (client) => {
    setEditingClient(client);
    setIsModalVisible(true);
  };
  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5005/api/users/${editingClient._id}`,
        editingClient,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setClients(
        clients.map((client) =>
          client._id === editingClient._id ? editingClient : client
        )
      );
      setIsModalVisible(false); // Close the modal
      setEditingClient(null); // Clear editing client
    } catch (err) {
      console.error('Error updating client:', err);
      message.error('Failed to update client'); // Use message.error instead of setError
    }
  };
  const handleDelete = (clientId) => {
    axios.delete(`http://localhost:5005/api/users/${clientId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then(() => {
      setClients(clients.filter(client => client._id !== clientId));
      message.success('Client deleted successfully');
    })
    .catch(err => {
      console.error('Error deleting client:', err);
      message.error('Failed to delete client');
    });
  };

  const columns = [
    { title: 'Client Name', dataIndex: 'client_name', sorter: true, render: (text, record) => <Link to={`/client/${record._id}`}>{text}</Link> },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      sorter: true,
      render: (status) => (
        <span>
          {status === 'Active' ? (
            <CheckCircleOutlined style={{ color: 'green', marginRight: 5 }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', marginRight: 5 }} />
          )}
          {status}
        </span>
      )
    },
    { title: 'Industry', dataIndex: 'industry', sorter: true },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Contact Person', dataIndex: 'contact_person' },
    { title: 'Action', render: (_, record) => (
      <Space>
        <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
        <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
      </Space>
    )},
  ];

  return (
    <div className="dashboard">
      <PendingUsers />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
  <h2 style={{ margin: '0 auto', fontSize: '24px', fontWeight: 'bold' }}>Clients</h2>
</div>
      <Space>
        <Search placeholder="Search clients..." onChange={e => setSearch(e.target.value)} enterButton />
        <Select placeholder="Region" onChange={value => handleFilterChange('region', value)}>
          <Option value="">All Regions</Option>
          <Option value="North America">North America</Option>
          <Option value="Europe">Europe</Option>
          <Option value="Asia">Asia</Option>
        </Select>
        <Select placeholder="Industry" onChange={value => handleFilterChange('industry', value)}>
          <Option value="">All Industries</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Technology">Technology</Option>
          <Option value="Healthcare">Healthcare</Option>
        </Select>
        <Select placeholder="Status" onChange={value => handleFilterChange('status', value)}>
          <Option value="">All Statuses</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={clients} rowKey="_id" onChange={(pagination, filters, sorter) => handleSort(sorter.columnKey)} />
      
      <Modal title="Edit Client" visible={isModalVisible} onOk={handleEditSubmit} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="client_name" label="Client Name" rules={[{ required: true, message: 'Client name is required' }]}> <Input /> </Form.Item>
          <Form.Item name="contact_person" label="Contact Person"> <Input /> </Form.Item>
          <Form.Item name="email" label="Email"> <Input type="email" /> </Form.Item>
          <Form.Item name="phone" label="Phone"> <Input /> </Form.Item>
          <Form.Item name="industry" label="Industry"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;