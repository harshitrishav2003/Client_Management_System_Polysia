
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProjectsPage = () => {
//   const [pendingProjects, setPendingProjects] = useState([]);
//   const [approvedProjects, setApprovedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editProject, setEditProject] = useState(null);
//   const [formData, setFormData] = useState({
//     project_name: '',
//     description: '',
//     start_date: '',
//     end_date: '',
//     status: 'Pending',
//     budget: '',
//     team_members: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:5005/api/projects");
//         const allProjects = response.data;

//         setPendingProjects(allProjects.filter(project => !project.isApproved));
//         setApprovedProjects(allProjects.filter(project => project.isApproved));

//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch projects. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleViewDetails = (projectId) => {
//     navigate(`/project/${projectId}`);
//   };

//   const handleApprove = async (projectId) => {
//     try {
//       await axios.put(`http://localhost:5005/api/projects/${projectId}/approve`);
//       alert("Project approved successfully");
//       setPendingProjects(prev => prev.filter(project => project._id !== projectId));
//       const approvedProject = pendingProjects.find(project => project._id === projectId);
//       setApprovedProjects(prev => [...prev, { ...approvedProject, isApproved: true }]);
//     } catch (err) {
//       console.error("Error approving project:", err);
//       alert("Failed to approve project");
//     }
//   };

//   const handleReject = async (projectId) => {
//     try {
//       await axios.put(`http://localhost:5005/api/projects/${projectId}/reject`);
//       alert("Project rejected successfully");
//       setPendingProjects(prev => prev.filter(project => project._id !== projectId));
//     } catch (err) {
//       console.error("Error rejecting project:", err);
//       alert("Failed to reject project");
//     }
//   };

//   const handleStatusChange = async (projectId, status) => {
//     try {
//       await axios.put(`http://localhost:5005/api/projects/${projectId}`, { status });
//       alert("Project status updated successfully");
//       setApprovedProjects(prevProjects =>
//         prevProjects.map(project =>
//           project._id === projectId ? { ...project, status: status } : project
//         )
//       );
//     } catch (err) {
//       console.error("Error updating project status:", err);
//       alert("Failed to update project status");
//     }
//   };

//   const handleEdit = (project) => {
//     setEditProject(project);
//     setFormData({
//       project_name: project.project_name,
//       description: project.description,
//       start_date: project.start_date,
//       end_date: project.end_date,
//       status: project.status,
//       budget: project.budget,
//       team_members: project.team_members.join(', '), // Assuming team_members is an array of names
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmitEdit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedProject = {
//         ...formData,
//         team_members: formData.team_members.split(',').map(member => member.trim()), // Convert to an array
//       };
//       await axios.put(`http://localhost:5005/api/projects/${editProject._id}`, updatedProject);
//       alert("Project updated successfully");
//       setApprovedProjects(prev =>
//         prev.map(project =>
//           project._id === editProject._id ? { ...project, ...updatedProject } : project
//         )
//       );
//       setEditProject(null);
//       setFormData({ project_name: '', description: '', start_date: '', end_date: '', status: 'Pending', budget: '', team_members: '' });
//     } catch (err) {
//       console.error("Error updating project:", err);
//       alert("Failed to update project");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div style={pageStyle}>
//       <h2>Pending Projects</h2>
//       {pendingProjects.length === 0 ? (
//         <p>No pending projects found.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th>Project ID</th>
//               <th>Project Name</th>
//               <th>Client</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingProjects.map((project) => (
//               <tr key={project._id}>
//                 <td>{project._id}</td>
//                 <td>{project.project_name}</td>
//                 <td>{project.client_id.client_name}</td>
//                 <td>
//                   <button onClick={() => handleApprove(project._id)} style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
//                     Approve
//                   </button>
//                   <button onClick={() => handleReject(project._id)} style={{ ...buttonStyle, backgroundColor: "#dc3545" }}>
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <h2>Approved Projects</h2>
//       {approvedProjects.length === 0 ? (
//         <p>No approved projects found.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th>Project ID</th>
//               <th>Project Name</th>
//               <th>Client</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {approvedProjects.map((project) => (
//               <tr key={project._id}>
//                 <td>{project._id}</td>
//                 <td>{project.project_name}</td>
//                 <td>{project.client_id.client_name}</td>
//                 <td>
//                   <select
//                     value={project.status}
//                     onChange={(e) => handleStatusChange(project._id, e.target.value)}
//                     style={selectStyle}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Ongoing">Ongoing</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button onClick={() => handleViewDetails(project._id)} style={buttonStyle}>
//                     View Details
//                   </button>
//                   <button onClick={() => handleEdit(project)} style={{ ...buttonStyle, backgroundColor: "#ffc107" }}>
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Edit Project Form */}
//       {editProject && (
//         <div style={editFormStyle}>
//           <h3>Edit Project</h3>
//           <form onSubmit={handleSubmitEdit}>
//             <label>
//               Project Name:
//               <input
//                 type="text"
//                 name="project_name"
//                 value={formData.project_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Description:
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Start Date:
//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               End Date:
//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Status:
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Ongoing">Ongoing</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </label>
//             <label>
//               Budget:
//               <input
//                 type="number"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Team Members (comma separated):
//               <input
//                 type="text"
//                 name="team_members"
//                 value={formData.team_members}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <button type="submit" style={{ ...buttonStyle, backgroundColor: "#007bff" }}>
//               Update Project
//             </button>
//             <button type="button" onClick={() => setEditProject(null)} style={buttonStyle}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// const pageStyle = {
//   padding: "20px",
//   fontFamily: "Arial, sans-serif",
// };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   border: "1px solid #ccc",
// };

// const buttonStyle = {
//   padding: "10px 20px",
//   margin: "10px 5px",
//   border: "none",
//   borderRadius: "4px",
//   backgroundColor: "#739ea7",
//   color: "white",
//   cursor: "pointer",
//   fontSize: "14px",
// };

// const selectStyle = {
//   padding: "5px 10px",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
//   backgroundColor: "#fff",
// };

// const editFormStyle = {
//   padding: "20px",
//   border: "1px solid #ccc",
//   marginTop: "20px",
//   borderRadius: "4px",
//   backgroundColor: "#f8f9fa",
// };

// export default ProjectsPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Table,
  Select,
  Modal,
  Input,
  Form,
  Typography,
  message,
  Spin,
  Card,
  Space,
  Alert,
} from "antd";
import { EditOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title } = Typography;
const { Option } = Select;

const ProjectsPage = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/projects");
        const allProjects = response.data;
        setPendingProjects(allProjects.filter((project) => !project.isApproved));
        setApprovedProjects(allProjects.filter((project) => project.isApproved));
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleViewDetails = (projectId) => navigate(`/project/${projectId}`);

  const handleApprove = async (projectId) => {
    try {
      await axios.put(`http://localhost:5005/api/projects/${projectId}/approve`);
      message.success("Project approved successfully");
      setPendingProjects((prev) => prev.filter((project) => project._id !== projectId));
      const approvedProject = pendingProjects.find((project) => project._id === projectId);
      setApprovedProjects((prev) => [...prev, { ...approvedProject, isApproved: true }]);
    } catch (err) {
      message.error("Failed to approve project");
    }
  };

  const handleReject = async (projectId) => {
    try {
      await axios.put(`http://localhost:5005/api/projects/${projectId}/reject`);
      message.success("Project rejected successfully");
      setPendingProjects((prev) => prev.filter((project) => project._id !== projectId));
    } catch (err) {
      message.error("Failed to reject project");
    }
  };

  const handleStatusChange = async (projectId, status) => {
    try {
      await axios.put(`http://localhost:5005/api/projects/${projectId}`, { status });
      message.success("Project status updated successfully");
      setApprovedProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? { ...project, status } : project
        )
      );
    } catch (err) {
      message.error("Failed to update project status");
    }
  };

  const handleEdit = (project) => {
    setEditProject(project);
    form.setFieldsValue({ ...project, team_members: project.team_members.join(", ") });
  };

  const handleEditSubmit = async () => {
    try {
      const updatedProject = {
        ...form.getFieldsValue(),
        team_members: form.getFieldValue("team_members").split(", "),
      };
      await axios.put(`http://localhost:5005/api/projects/${editProject._id}`, updatedProject);
      message.success("Project updated successfully");
      setApprovedProjects((prev) =>
        prev.map((p) => (p._id === editProject._id ? updatedProject : p))
      );
      setEditProject(null);
    } catch (err) {
      message.error("Failed to update project");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Projects Management
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <>
          {/* Pending Projects Section */}
          <Card title="Pending Projects" bordered={false} style={{ marginBottom: "20px" }}>
            <Table
              dataSource={pendingProjects}
              rowKey="_id"
              columns={[
                { title: "Project ID", dataIndex: "_id" },
                { title: "Project Name", dataIndex: "project_name" },
                { title: "Client", dataIndex: ["client_id", "client_name"] },
                { title: "Description", dataIndex: "description" },
                {
                  title: "Actions",
                  render: (_, project) => (
                    <Space>
                      <Button type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(project._id)}>
                        Approve
                      </Button>
                      <Button danger icon={<CloseOutlined />} onClick={() => handleReject(project._id)}>
                        Reject
                      </Button>
                    </Space>
                  ),
                },
              ]}
            />
          </Card>

          {/* Approved Projects Section */}
          <Card title="Approved Projects" bordered={false}>
            <Table
              dataSource={approvedProjects}
              rowKey="_id"
              columns={[
                { title: "Project ID", dataIndex: "_id" },
                { title: "Project Name", dataIndex: "project_name" },
                { title: "Client", dataIndex: ["client_id", "client_name"] },
                {
                  title: "Status",
                  render: (_, project) => (
                    <Select
                      defaultValue={project.status}
                      onChange={(value) => handleStatusChange(project._id, value)}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Ongoing">Ongoing</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  ),
                },
                {
                  title: "Actions",
                  render: (_, project) => (
                    <Space>
                      <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(project._id)}>
                        View
                      </Button>
                      <Button icon={<EditOutlined />} onClick={() => handleEdit(project)}>
                        Edit
                      </Button>
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Project"
        open={!!editProject}
        onCancel={() => setEditProject(null)}
        onOk={handleEditSubmit}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="project_name" label="Project Name" rules={[{ required: true, message: "Please enter a project name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="team_members" label="Team Members">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
