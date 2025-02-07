
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
//     status: "Ongoing", // Default value
//     budget: "",
//     team_members: [], // Initialize as an array
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

//     // If the name is team_members, split the input string into an array
//     if (name === "team_members") {
//       setFormData({
//         ...formData,
//         [name]: value.split(",").map((member) => member.trim()), // Split string by comma and trim spaces
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
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
//     <div >
//      <h1 style={{ textAlign: "center" }}>Projects for {client.client_name}</h1>


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
//               <th>Status</th>
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
//                 <td>{project.status}</td>
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

//       {/* Button to Show/Hide Form */}
//       <button onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Cancel" : "Add New Project"}
//       </button>

//       {/* Project Creation Form */}
//       {showForm && (
//         <div className="project-form">
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
//               />
//             </div>
//             <div>
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div>
//               <label>End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div>
//               <label>Status</label>
//               <select name="status" value={formData.status} onChange={handleFormChange}>
//                 <option value="Ongoing">Ongoing</option>
//                 <option value="Completed">Completed</option>
//                 <option value="On Hold">On Hold</option>
//               </select>
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
//               <label>Team Members</label>
//               <input
//                 type="text"
//                 name="team_members"
//                 value={formData.team_members.join(", ")} // Display as a comma-separated string
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div>
//               <button type="submit">Create Project</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ClientProfile;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/api/projects", formData);
      setProjects([...projects, response.data]); // Add new project to the list
      setShowForm(false); // Hide form after submission
      console.log(response.data); // Handle the response data (e.g., display success message)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Projects for {client.client_name}</h1>

      {/* Display Projects in Table Format */}
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found for this client.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Budget</th>
              <th>Team Members</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.project_name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.start_date).toLocaleDateString()}</td>
                <td>{new Date(project.end_date).toLocaleDateString()}</td>
                <td>{project.budget}</td>
                <td>{(project.team_members || []).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="client-profile-card">
        {/* Button to Show/Hide Form */}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Project"}
        </button>

        {/* Project Creation Form */}
        {showForm && (
          <div className="project-form">
          <h2>Create a New Project</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Project Name</label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="description-input"
              />
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleFormChange}
                className="date-input"
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleFormChange}
                className="date-input"
              />
            </div>
            <div>
              <label>Budget</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <button type="submit">Create Project</button>
            </div>
          </form>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
