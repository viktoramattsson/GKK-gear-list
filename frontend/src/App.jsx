import { useEffect, useState } from "react";
import "./App.css";
import AdminComponent from "./components/adminComponent";

function App() {
  const [gear, setGear] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setGear(result);
      });
  }, []);

  const handleClick = () => {
    setIsAdmin(!isAdmin);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <h1>GKK</h1>
      <h2>Tillgänglig utrustning på klubben</h2>

      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Modell</th>
            <th>Storlek</th>
            <th>Godkänd</th>
          </tr>
        </thead>
        <tbody>
          {gear.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.legal}</td>
              {isAdmin && (
                <td>
                  <img
                    src="./../public/trash.svg"
                    alt=""
                    onClick={handleDelete}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="adminContainer">
        <label htmlFor="admin"> Admin </label>
        <input type="checkbox" id="admin" onClick={handleClick} />
        {isAdmin && <AdminComponent />}
      </div>
    </>
  );
}

export default App;
