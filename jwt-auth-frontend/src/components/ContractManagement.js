
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../App.css";

// const ClientProfile = () => {
//   const { clientId } = useParams(); // Get the clientId from the URL params
//   const [client, setClient] = useState(null);
//   const [projects, setProjects] = useState([]); // State to store projects
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false); // Toggle form visibility
//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     budget: "",
//     client_id: clientId,
//   });

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5005/api/client/${clientId}`);
//         setClient(response.data);
//       } catch (err) {
//         setError("Failed to load client details.");
//       }
//     };

//     const fetchClientProjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5005/api/projects/${clientId}`);
//         // Make sure team_members is always an array
//         const updatedProjects = response.data.map((project) => ({
//           ...project,
//           team_members: Array.isArray(project.team_members) ? project.team_members : [],
//         }));
//         setProjects(updatedProjects);
//       } catch (err) {
//         setError("Failed to load projects.");
//       }
//     };

//     fetchClientDetails();
//     fetchClientProjects();
//   }, [clientId]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5005/api/projects", formData);
//       setProjects([...projects, response.data]); // Add new project to the list
//       setShowForm(false); // Hide form after submission
//       console.log(response.data); // Handle the response data (e.g., display success message)
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!client) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>Projects for {client.client_name}</h1>

//       {/* Display Projects in Table Format */}
//       <h2>Projects</h2>
//       {projects.length === 0 ? (
//         <p>No projects found for this client.</p>
//       ) : (
//         <table className="project-table">
//           <thead>
//             <tr>
//               <th>Project Name</th>
//               <th>Description</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Budget</th>
//               <th>Team Members</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project) => (
//               <tr key={project._id}>
//                 <td>{project.project_name}</td>
//                 <td>{project.description}</td>
//                 <td>{new Date(project.start_date).toLocaleDateString()}</td>
//                 <td>{new Date(project.end_date).toLocaleDateString()}</td>
//                 <td>{project.budget}</td>
//                 <td>{(project.team_members || []).join(", ")}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="client-profile-card">
//         {/* Button to Show/Hide Form */}
//         <button onClick={() => setShowForm(!showForm)}>
//           {showForm ? "Cancel" : "Add New Project"}
//         </button>

//         {/* Project Creation Form */}
//         {showForm && (
//           <div className="project-form">
//           <h2>Create a New Project</h2>
//           <form onSubmit={handleFormSubmit}>
//             <div>
//               <label>Project Name</label>
//               <input
//                 type="text"
//                 name="project_name"
//                 value={formData.project_name}
//                 onChange={handleFormChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//                 className="description-input"
//               />
//             </div>
//             <div>
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleFormChange}
//                 className="date-input"
//               />
//             </div>
//             <div>
//               <label>End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleFormChange}
//                 className="date-input"
//               />
//             </div>
//             <div>
//               <label>Budget</label>
//               <input
//                 type="number"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div>
//               <button type="submit">Create Project</button>
//             </div>
//           </form>
//         </div>
        
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, Table, Modal, DatePicker, message, Typography } from "antd";
import "antd/dist/reset.css"; // Ensures Ant Design's default styles are loaded
import moment from 'moment';

const { Title } = Typography;

const ClientProfile = () => {
  const { clientId } = useParams(); // Get the clientId from the URL params
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]); // State to store projects
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    budget: "",
    client_id: clientId,
  });
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/client/${clientId}`);
        setClient(response.data);
      } catch (err) {
        setError("Failed to load client details.");
      }
    };

    const fetchClientProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/projects/${clientId}`);
        // Make sure team_members is always an array
        const updatedProjects = response.data.map((project) => ({
          ...project,
          team_members: Array.isArray(project.team_members) ? project.team_members : [],
        }));
        setProjects(updatedProjects);
      } catch (err) {
        setError("Failed to load projects.");
      }
    };

    fetchClientDetails();
    fetchClientProjects();
  }, [clientId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5005/api/projects", { ...formData, ...values });
      setProjects([...projects, response.data]); // Add new project to the list
      setShowForm(false); // Hide form after submission
      message.success("Project created successfully!");
      setIsModalVisible(true); // Show the confirmation modal
    } catch (error) {
      message.error("Error submitting form.");
    }
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
  ];

  if (error) {
    return <div>{error}</div>;
  }

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title level={1} style={{ textAlign: "center" }}>
        Projects for {client.client_name}
      </Title>

      {/* Display Projects in Table Format */}
      {projects.length === 0 ? (
        <p>No projects found for this client.</p>
      ) : (
        <Table columns={columns} dataSource={projects} rowKey="_id" />
      )}

      {/* Button to Show/Hide Form */}
      <Button
        type="primary"
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: "20px" }}
      >
        {showForm ? "Cancel" : "Add New Project"}
      </Button>

      {/* Project Creation Form using Ant Design Modal */}
      <Modal
        title="Create a New Project"
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
      >
        <Form
          initialValues={formData}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[{ required: true, message: "Please input the project name!" }]}
          >
            <Input
              value={formData.project_name}
              onChange={handleFormChange}
              name="project_name"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input the project description!" }]}
          >
            <Input.TextArea
              value={formData.description}
              onChange={handleFormChange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[{ required: true, message: "Please select the start date!" }]}
          >
            <DatePicker
              value={formData.start_date ? moment(formData.start_date) : null}
              onChange={(date) => setFormData({ ...formData, start_date: date })}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="end_date"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker
              value={formData.end_date ? moment(formData.end_date) : null}
              onChange={(date) => setFormData({ ...formData, end_date: date })}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: "Please input the budget!" }]}
          >
            <Input
              type="number"
              value={formData.budget}
              onChange={handleFormChange}
              name="budget"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        title="Project Submitted"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="ok" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>
        ]}
      >
        <p>We will review your project soon and get back to you.</p>
      </Modal>
    </div>
  );
};

export default ClientProfile;
