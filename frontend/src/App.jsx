import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <>
      <h1>GKK</h1>
      <h2>Tillgäng utrusning på klubben</h2>
    </>
  );
}

export default App;
