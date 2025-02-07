import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    contact_person: '',
    email: '',
    phone: '',
    industry: '',
    status: 'Active',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/register', formData);
      navigate('/client-login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-container">
    <form onSubmit={handleSubmit} className="register-card">
      <h2>Client Registration</h2>
  
      {/* Client Details */}
      <div className="wrapper">
        <label htmlFor="client_name">Client Name</label>
        <input
          type="text"
          id="client_name"
          name="client_name"
          placeholder="Client Name"
          value={formData.client_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="contact_person">Contact Person</label>
        <input
          type="text"
          id="contact_person"
          name="contact_person"
          placeholder="Contact Person"
          value={formData.contact_person}
          onChange={handleChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          id="industry"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
      </div>
  
      {/* Address Section */}
      <h3>Address</h3>
      <div className="wrapper">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="State"
          value={formData.address.state}
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          id="postal_code"
          name="postal_code"
          placeholder="Postal Code"
          value={formData.address.postal_code}
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="wrapper">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          value={formData.address.country}
          onChange={handleAddressChange}
          required
        />
      </div>
  
      {/* Password */}
      <div className="wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
  
      {/* Submit Button */}
      <button type="submit" className="register-btn">Register</button>
  
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </form>
  </div>
  
  
  );
};

export default ClientRegister;
