import React, { useEffect, useState } from "react";
import API from "../api";

function LeadDetail({ lead }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState(lead.status);

  useEffect(() => {
    fetchMessages();
  }, [lead]);

  const fetchMessages = async () => {
    const res = await API.get(`/messages/${lead.phone}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!text) return;

    await API.post("/send-message", {
      phone: lead.phone,
      message: text
    });

    setText("");
    fetchMessages();
  };

  const updateStatus = async () => {
    await API.put(`/lead/${lead._id}`, { status });
    alert("Status updated");
  };

  return (
    <div>
      <h2>{lead.name || "Unknown"}</h2>
      <p>{lead.phone}</p>
      <p>{lead.destination}</p>

      {/* STATUS */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="quoted">Quoted</option>
        <option value="converted">Converted</option>
      </select>
      <button onClick={updateStatus}>Update</button>

      {/* CHAT */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="input-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default LeadDetail;
