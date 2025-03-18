import React, { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

const steps = [
  { 
    title: "Requesting Data", 
    description: "Fetching coffee types...", 
    details: "We'll use the Fetch API to request a list of available coffee types from our backend.",
    fetchData: fetchCoffees 
  },
  { 
    title: "Sending Data with a Request", 
    description: "Ordering a coffee...", 
    details: "Enter your coffee type and size to place an order using a POST request.",
    fetchData: sendOrder, 
    inputFields: ["coffee", "size"]
  },
  { 
    title: "Uploading Files", 
    description: "Uploading a coffee shop logo...", 
    details: "Select a file to simulate uploading a coffee shop logo using FormData.",
    fetchData: uploadLogo, 
    inputFields: ["file"]
  },
  { 
    title: "Authorized Requests", 
    description: "Fetching VIP orders...", 
    details: "Enter your token to fetch exclusive VIP coffee orders.",
    fetchData: fetchVIPOrders, 
    inputFields: ["token"]
  },
  { 
    title: "Saving Data Locally", 
    description: "Saving your favorite coffee...", 
    details: "Enter your favorite coffee type and save it locally. To check: Open Dev tools (use ctrl + shift + i), open Application, expand Storage, click Local Storage",
    fetchData: saveFavorite, 
    inputFields: ["favoriteCoffee"]
  },
  { 
    title: "Handling Promise States", 
    description: "Demonstrating loading and error handling...", 
    details: "We'll show how to handle pending, fulfilled, and rejected promise states.",
    fetchData: handlePromiseStates
  }
];

function fetchCoffees(setOutput) {
  setOutput({ loading: "Fetching coffee types..." });
  fetch(`${API_URL}/coffees`)
    .then(response => response.json())
    .then(data => setOutput({ data }))
    .catch(error => setOutput({ error: `Error: ${error.message}` }));
}

function sendOrder(setOutput, inputs) {
  setOutput({ loading: "Placing order..." });
  fetch(`${API_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coffee: inputs.coffee, size: inputs.size })
  })
    .then(response => response.json())
    .then(data => setOutput({ data }))
    .catch(error => setOutput({ error: `Error: ${error.message}` }));
}

function uploadLogo(setOutput, inputs) {
  const formData = new FormData();
  formData.append("file", inputs.file);

  setOutput({ loading: "Uploading file..." });
  fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => setOutput({ data, imageUrl: URL.createObjectURL(inputs.file) }))
    .catch(error => setOutput({ error: `Error: ${error.message}` }));
}

function fetchVIPOrders(setOutput, inputs) {
  setOutput({ loading: "Fetching VIP orders..." });
  fetch(`${API_URL}/vip-orders`, {
    headers: { Authorization: `Bearer ${inputs.token}` }
  })
    .then(response => response.json())
    .then(data => {
      data.helloThere = "Brewed by Shelian Gladis, 22501A0544 ☕"; 
      setOutput({ data });
    })
    .catch(error => setOutput({ error: `Error: ${error.message}` }));
}

function saveFavorite(setOutput, inputs) {
  const { favoriteCoffee } = inputs;

  if (favoriteCoffee) {
    localStorage.setItem("favoriteCoffee", favoriteCoffee);
    setOutput({ data: `Saved locally: ${favoriteCoffee}` });
  } else {
    setOutput({ error: "Please enter a favorite coffee before saving!" });
  }
}


function handlePromiseStates(setOutput) {
  setOutput({ loading: "Loading..." });
  fetch(`${API_URL}/coffees`)
    .then(response => response.json())
    .then(data => setTimeout(() => setOutput({ data }), 2000))
    .catch(error => setOutput({ error: `Error: ${error.message}` }));
}

export default function CoffeeAPIAdventure() {
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState({});
  const [inputs, setInputs] = useState({});

  return (
    <div className="coffee-container">
      <h1 className="coffee-title">☕ Incorporating Data: {steps[step].title}</h1>
      <p className="coffee-short-description">{steps[step].details}</p>
      <p className="coffee-description">{steps[step].description}</p>
      
      {steps[step].inputFields && steps[step].inputFields.map((field) => (
        <input
          key={field}
          type={field === "file" ? "file" : "text"}
          placeholder={`Enter ${field}`}
          onChange={(e) => setInputs({ ...inputs, [field]: field === "file" ? e.target.files[0] : e.target.value })}
          className="coffee-input enhanced-input"
        />
      ))}
      
      <button className="coffee-button" onClick={() => steps[step].fetchData(setOutput, inputs)}>
        Run Example
      </button>
      
      <div className="coffee-output">
        {output.loading && <p>⏳ {output.loading}</p>}
        {output.error && <p>❌ {output.error}</p>}
        {output.data && <pre>{JSON.stringify(output.data, null, 2)}</pre>}
        {output.imageUrl && <img src={output.imageUrl} alt="Uploaded" className="uploaded-image" />}
      </div>
      
      <div className="coffee-nav">
        <button disabled={step === 0} className="coffee-button" onClick={() => { setStep(step - 1); setOutput({}); setInputs({}); }}>
          ◀️ Previous
        </button>
        <button disabled={step === steps.length - 1} className="coffee-button" onClick={() => { setStep(step + 1); setOutput({}); setInputs({}); }}>
          Next ▶️
        </button>
      </div>
    </div>
  );
}