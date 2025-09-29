import { useState } from "react";

export default function SimpleTest() {
  const [status, setStatus] = useState("Click test button");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus("Testing...");
    
    try {
      const response = await fetch("http://localhost:3000/api/test");
      const data = await response.json();
      
      setStatus("✅ CONNECTED! Backend is working");
      console.log("Backend response:", data);
      
    } catch (error) {
      setStatus("❌ FAILED! Backend not connected");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      border: "2px solid blue", 
      borderRadius: "10px",
      margin: "20px",
      maxWidth: "400px"
    }}>
      <h2>Connection Test</h2>
      
      <button 
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "gray" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Testing..." : "Test Connection"}
      </button>
      
      <div style={{ 
        marginTop: "15px",
        padding: "10px",
        backgroundColor: status.includes("✅") ? "lightgreen" : "lightcoral",
        borderRadius: "5px"
      }}>
        <strong>Status:</strong> {status}
      </div>
      
      <div style={{ marginTop: "15px", fontSize: "14px" }}>
        <div>Backend: http://localhost:3000</div>
        <div>Frontend: http://localhost:5173</div>
      </div>
    </div>
  );
}