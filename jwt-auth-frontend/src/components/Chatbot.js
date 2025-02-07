// import React, { useState } from "react";
// import axios from "axios";
// import "./chatbot.css"; // Import the CSS file

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input, timestamp: new Date() };

//     // Add user message to UI
//     setMessages((prevMessages) => [...prevMessages, userMessage]);

//     try {
//       // Sending message to the backend
//       const response = await axios.post("http://localhost:5001/chat", {
//         message: input,
//       });

//       // Checking the response structure and handling the reply
//       const botMessage = {
//         role: "bot",
//         content: response.data.reply || "Sorry, I couldn't understand that.",
//         timestamp: new Date(),
//       };

//       // Add bot response to UI
//       setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
//     } catch (error) {
//       console.error("Error:", error);

//       // In case of error, display a fallback message
//       const botMessage = {
//         role: "bot",
//         content: "Sorry, there was an error with the chatbot service.",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
//     }

//     setInput(""); // Clear the input field
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="header">
//         <h2>Chatbot</h2>
//       </div>
//       <div className="messages-container">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.role === "user" ? "user" : "bot"}`}
//           >
//             <div className="message-content">
//               <p className="message-text">{msg.content}</p>
//               <span className="message-time">
//                 {msg.timestamp.toLocaleTimeString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="input-field"
//         />
//         <button onClick={sendMessage} className="send-button">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from "react";
import axios from "axios";
import './chatbot.css'; // Import the CSS file for Chatbot styles

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    // Add user message to UI
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Sending message to the backend
      const response = await axios.post("http://localhost:5001/chat", {
        message: input,
      });

      // Checking the response structure and handling the reply
      const botMessage = {
        role: "bot",
        content: response.data.reply || "Sorry, I couldn't understand that.",
      };

      // Add bot response to UI
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);

      // In case of error, display a fallback message
      const botMessage = {
        role: "bot",
        content: "Sorry, there was an error with the chatbot service.",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    }

    setInput(""); // Clear the input field
  };

  return (
    <div className="chatbox-container">
  <h2>Hey! Need any help?</h2>
  <div className="messages-container">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
      >
        {msg.role === "bot" && (
          <img
            src="/polsialogo.jpeg"
            alt="Bot"
            className="bot-avatar"
          />
        )}
        <strong>{msg.role === "user" ? "You" : "Polysia"}:</strong> {msg.content}
      </div>
    ))}
  </div>
  <div className="input-container">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="chat-input"
    />
    <button onClick={sendMessage} className="send-button">
      Send
    </button>
  </div>
</div>

  );
};

export default Chatbot;
