import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gear, setGear] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    size: "",
    legal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "size" ? parseFloat(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("/add", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Något gick fel vid POST-förfrågan.");
      })
      .then((responseData) => {
        console.log("Data har skickats till servern:", responseData);

        setFormData({
          type: "",
          name: "",
          size: "",
          legal: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setGear(result);
      });
  }, []);

  return (
    <>
      <h1>GKK</h1>
      <h2>Tillgäng utrusning på klubben</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Size</th>
            <th>Legal</th>
          </tr>
        </thead>
        <tbody>
          {gear.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.legal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Lägg till ny utrustning</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Namn:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Storlek:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Laglig:</label>
          <input
            type="text"
            name="legal"
            value={formData.legal}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Skicka</button>
      </form>
    </>
  );
}

export default App;
