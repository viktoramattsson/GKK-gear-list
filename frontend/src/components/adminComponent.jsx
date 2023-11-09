import { useState } from "react";
import "./../App.css";

function AdminComponent() {
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
  return (
    <>
      <h2>Lägg till ny utrustning</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Typ:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Modell:</label>
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
          <label>Godkänd:</label>
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

export default AdminComponent;
