
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; // Ensure axios is installed: `npm install axios`
// import './Dashboard.css'; // Custom CSS for the dashboard

// const Dashboard = () => {
//   const [clients, setClients] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filters, setFilters] = useState({
//     region: '',
//     industry: '',
//     status: ''
//   });
//   const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
//   const [sortColumn, setSortColumn] = useState('client_name'); // Default column to sort
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token') || ''); // Get the token from localStorage

//   // Fetch clients from backend when the component mounts or filters/sort change
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
//       sortOrder
//     });

//     axios
//       .get(`http://localhost:5005/api/users?${query.toString()}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`, // Pass token in Authorization header
//         },
//       })
//       .then((response) => {
//         setClients(response.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching clients:', err);
//         // Handle error (e.g., logout if token is invalid)
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

//   const handleEdit = (clientId) => {
//     // Redirect to the client edit page (implement the edit page separately)
//     window.location.href = `/edit-client/${clientId}`;
//   };

//   const handleDelete = (clientId) => {
//     // Make API call to delete client
//     axios
//       .delete(`http://localhost:5005/api/users/${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then((response) => {
//         // Remove deleted client from the list
//         setClients(clients.filter((client) => client._id !== clientId));
//         alert('Client deleted successfully');
//       })
//       .catch((err) => {
//         console.error('Error deleting client:', err);
//         alert('Failed to delete client');
//       });
//   };

//   const exportData = (format) => {
//     // Logic to export as excel, pdf, csv
//     alert(`Exporting data as ${format}`);
//   };

//   return (
//     <div className="dashboard">
//       <h1>Client Dashboard</h1>

//       {/* Search Bar */}
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

//       <select name="industry" onChange={handleFilterChange} value={filters.industry}>
//         <option value="">All Industries</option>
//         <option value="Finance">Finance</option>
//         <option value="Technology">Technology</option>
//         <option value="Healthcare">Healthcare</option>
//       </select>

//       <select name="status" onChange={handleFilterChange} value={filters.status}>
//         <option value="">All Statuses</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>

//       {/* Export Buttons */}
//       <button onClick={() => exportData('excel')}>Export as Excel</button>
//       <button onClick={() => exportData('pdf')}>Export as PDF</button>
//       <button onClick={() => exportData('csv')}>Export as CSV</button>

//       {/* Client Data Table */}
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort('client_name')}>Client Name</th>
//             <th onClick={() => handleSort('industry')}>Industry</th>
//             <th onClick={() => handleSort('status')}>Status</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Contact Person</th>
//             <th>Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
        // <tbody>
        //   {clients.length > 0 ? (
        //     clients.map((client) => (
        //       <tr key={client._id}>
                // <td>
                //   <Link to={`/client/${client._id}`}>{client.client_name}</Link>
                // </td>
        //         <td>{client.industry}</td>
        //         <td>{client.status}</td>
        //         <td>{client.email}</td>
        //         <td>{client.phone}</td>
        //         <td>{client.contact_person}</td>
        //         <td>
        //           {`${client.address.street}, ${client.address.city}, ${client.address.state}, ${client.address.postal_code}, ${client.address.country}`}
        //         </td>
        //         <td>
        //           <button onClick={() => handleEdit(client._id)}>Edit</button>
        //           <button onClick={() => handleDelete(client._id)}>Delete</button>
        //         </td>
        //       </tr>
        //     ))
        //   ) : (
        //     <tr>
        //       <td colSpan="6">No clients found</td>
        //     </tr>
        //   )}
        // </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import PendingUsers from "../components/PendingUser";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    industry: '',
    status: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('client_name');
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const [editingClient, setEditingClient] = useState(null); // Client being edited
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, [filters, sortColumn, sortOrder]);

  const fetchClients = () => {
    const query = new URLSearchParams({
      search,
      region: filters.region,
      industry: filters.industry,
      status: filters.status,
      sortColumn,
      sortOrder,
    });

    axios
      .get(`http://localhost:5005/api/users?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((err) => {
        console.error('Error fetching clients:', err);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);
  };

  const handleEditClick = (client) => {
    setEditingClient(client); // Set the client for editing
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingClient({ ...editingClient, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditingClient({
      ...editingClient,
      address: {
        ...editingClient.address,
        [name]: value,
      },
    });
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
      // Update client list with the new details
      setClients(
        clients.map((client) =>
          client._id === editingClient._id ? editingClient : client
        )
      );
      setEditingClient(null); // Close the editing form
    } catch (err) {
      console.error('Error updating client:', err);
      setError('Failed to update client. Please try again.');
    }
  };

  const handleDelete = (clientId) => {
    axios
      .delete(`http://localhost:5005/api/users/${clientId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        setClients(clients.filter((client) => client._id !== clientId));
        alert('Client deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting client:', err);
      });
  };

  return (
    <div className="dashboard">
      {/* <h1 className='Dash'>Client Dashboard</h1> */}
      <PendingUsers />
      <h1 className='Dash'>Clients</h1>
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={handleSearch}
      />

      {/* Filter Options */}
      <select name="region" onChange={handleFilterChange} value={filters.region}>
        <option value="">All Regions</option>
        <option value="North America">North America</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
      </select>
      <select
        name="industry"
        onChange={handleFilterChange}
        value={filters.industry}
      >
        <option value="">All Industries</option>
        <option value="Finance">Finance</option>
        <option value="Technology">Technology</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      <select
        name="status"
        onChange={handleFilterChange}
        value={filters.status}
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('client_name')}>Client Name</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('industry')}>Industry</th>
            
            <th>Email</th>
            <th>Phone</th>
            <th>Contact Person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
                <td>
                  <Link to={`/client/${client._id}`}>{client.client_name}</Link>
                </td>
              
              
            <td>{client.status}</td>
              <td>{client.industry}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.contact_person}</td>
              <td>
                <button onClick={() => handleEditClick(client)}>Edit</button>
                <button onClick={() => handleDelete(client._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingClient && (
        <div className="edit-modal">
          <h3>Edit Client</h3>
          <input
            type="text"
            name="client_name"
            value={editingClient.client_name}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="contact_person"
            value={editingClient.contact_person}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="email"
            value={editingClient.email}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="phone"
            value={editingClient.phone}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="industry"
            value={editingClient.industry}
            onChange={handleEditChange}
            required
          />
          <h3>Address</h3>
          <input
            type="text"
            name="street"
            value={editingClient.address?.street}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="city"
            value={editingClient.address?.city}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="state"
            value={editingClient.address?.state}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="postal_code"
            value={editingClient.address?.postal_code}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="country"
            value={editingClient.address?.country}
            onChange={handleAddressChange}
          />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={() => setEditingClient(null)}>Cancel</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
