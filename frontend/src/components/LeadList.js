import React, { useEffect, useState } from "react";
import API from "../api.js";

function LeadList({ onSelect, refresh }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  const fetchLeads = async () => {
    const res = await API.get("/lead");
    setLeads(res.data);
  };

  return (
    <div>
      {leads.map((lead) => (
        <div
          key={lead._id}
          className="lead-card"
          onClick={() => onSelect(lead)}
        >
          <strong>{lead.name || "Unknown"}</strong>
          <br />
          {lead.destination || "No destination"}
          <br />
          <small>Status: {lead.status}</small>
        </div>
      ))}
    </div>
  );
}

export default LeadList;
