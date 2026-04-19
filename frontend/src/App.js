import React, { useState } from "react";
import LeadList from "./components/LeadList";
import LeadDetail from "./components/LeadDetail";
import AddLead from "./components/AddLead";
import "./styles.css";

function App() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      
      <div className="sidebar">
        <h2>Leads</h2>
        <AddLead onAdd={() => setRefresh(!refresh)} />
        <LeadList onSelect={setSelectedLead} refresh={refresh} />
      </div>

      <div className="main">
        {selectedLead ? (
          <LeadDetail lead={selectedLead} />
        ) : (
          <h3>Select a lead</h3>
        )}
      </div>

    </div>
  );
}

export default App;
