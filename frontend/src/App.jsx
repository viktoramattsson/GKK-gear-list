import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gear, setGear] = useState([]);

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
    </>
  );
}

export default App;
