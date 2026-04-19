import React, { useState } from "react";
import API from "../api";

function AddLead({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");

  const handleAdd = async () => {
    if (!phone) return alert("Phone required");

    await API.post("/lead", {
      name,
      phone,
      destination
    });

    setName("");
    setPhone("");
    setDestination("");
    onAdd();
  };

  return (
    <div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <br />
      <input placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
      <br />
      <button onClick={handleAdd}>Add Lead</button>
    </div>
  );
}

export default AddLead;
