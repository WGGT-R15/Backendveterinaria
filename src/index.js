require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const conn = require("express-myconnection");
const cors = require('cors')

const route = require("./routes/index");
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5001;
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "node-tutorial",
};



app.use(conn(mysql, dbConfig, "single"));
app.use(express.json());

app.get("/getAll", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM `medicamentos`", (err, result) => {
      if (err) return res.send(err);

      res.send(result);
    });
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
