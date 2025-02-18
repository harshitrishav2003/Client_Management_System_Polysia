// src/NotificationForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select, Input, Form, message, Modal, Typography } from "antd";

const { Title } = Typography;

const NotificationForm = () => {
  const [clients, setClients] = useState([]); // State to store clients
  const [selectedClients, setSelectedClients] = useState([]); // Selected clients for notification
  const [notificationMessage, setNotificationMessage] = useState(""); // Notification message
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  // Fetching clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/clients"); // Update with your API URL
        setClients(response.data);
      } catch (err) {
        message.error("Failed to fetch clients.");
      }
    };

    fetchClients();
  }, []);

  // Handle the form submission
  const handleSubmit = async () => {
    try {
      // If 'all' is selected, send the notification to all clients
      const clientsToNotify = selectedClients.includes("all") ? clients.map(client => client._id) : selectedClients;
  
      // Sending the notification to the selected clients
      await axios.post("http://localhost:5005/api/send-notification", {
        clients: clientsToNotify,
        message: notificationMessage,
      });
      message.success("Notification sent successfully!");
      setIsModalVisible(false); // Close modal after sending notification
    } catch (err) {
      message.error("Failed to send notification.");
    }
  };
  

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "20px" }}
      >
        Send Notification
      </Button>

      <Modal
        title="Send Notification"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Select Clients">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select clients"
              onChange={(value) => setSelectedClients(value)}
            >
              <Select.Option value="all">All Clients</Select.Option>
              {clients.map((client) => (
                <Select.Option key={client._id} value={client._id}>
                  {client.client_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Message">
            <Input.TextArea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              rows={4}
              placeholder="Enter notification message"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Send Notification
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NotificationForm;
