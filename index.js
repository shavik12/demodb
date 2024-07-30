const express = require("express");
const mysql = require("mysql");
console.log("hello from node ");
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("listening at port 3000"));
const connectt = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shavik@26",
  database: "practice_db",
});
connectt.connect((err) => {
  if (err) console.log("error occured", err);
  else console.log("yay");
});
app.get("/users", (req, res) => {
  connectt.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log("Error:", err);
      res.status(500).send("An error occurred");
    } else {
      console.log(results);
      res.json(results);
    }
  });
});
app.post("/users", (req, res) => {
  const { email, firstName , lastName, age } = req.body;
  const values = [email, firstName, lastName, age];
  const query =
    "Insert into users(email,first_name,last_name,age) values(?,?,?,?)";
  connectt.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send("done");
      console.log(results.insertId);
    }
  });
});
