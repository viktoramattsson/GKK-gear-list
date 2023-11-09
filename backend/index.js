const express = require("express"),
  path = require("path");

const app = express(),
  port = process.env.PORT || 3000;

const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM gear", []);
  response.json(rows);
});

app.post("/add", async (request, response) => {
  let sql =
    "INSERT INTO gear (type, name, size, legal) VALUES ($1, $2, $3, $4)";
  let params = [
    request.body.type,
    request.body.name,
    request.body.size,
    request.body.legal,
  ];
  try {
    client.query(sql, params, (error, results, fields) => {
      if (error) throw error;

      response.json(results);
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/delete", async (request, response) => {
  let sql = "DELETE FROM gear WHERE id =$1";
  let params = [request.body.id];
  try {
    const result = await client.query(sql, params);
    response.json(result.rows);
  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
  }
});

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
