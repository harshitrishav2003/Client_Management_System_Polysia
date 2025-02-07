import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../App.css';
import Chatbot from "./Chatbot";
//commit
const ClientProfile = () => {
  const { clientId } = useParams(); // Get the clientId from the URL params
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [showChatbot, setShowChatbot] = useState(false); 
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot); // Toggle chatbot visibility
  };
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/client/${clientId}`);
        console.log(response.data); // Log the data to check its structure
        setClient(response.data);
      } catch (err) {
        setError("Failed to load client details.");
      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="client-profile-card">
        <h1>{client.client_name}</h1>
        <p><strong>Name:</strong> {client.client_name}</p>
        <p><strong>Contact Person:</strong> {client.contact_person}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Industry:</strong> {client.industry}</p>
        <p><strong>Status:</strong> {client.status}</p>
        <h3>Address:</h3>
        {client?.address ? (
          <>
            <p>{client.address.street}</p>
            <p>{client.address.city}, {client.address.state} {client.address.postal_code}</p>
            <p>{client.address.country}</p>
          </>
        ) : (
          <p>Address information is unavailable.</p>
        )}
      </div>

      {/* Floating chat button outside the card */}
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <img src="/bot.png" alt="Chat" className="chat-icon" />
      </div>

      {/* Conditional rendering of the Chatbot */}
      {showChatbot && <Chatbot />}
    </div>
  );
};

export default ClientProfile;
