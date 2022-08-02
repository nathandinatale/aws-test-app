require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;


const mysql = require('mysql');

console.log(process.env);

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'music',
  port: process.env.DB_PORT,
});



connection.connect(function(err){
  if(err){
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

let albums = "";

connection.query('SELECT * from album', (err, rows, fields) => {
  if (err) throw err
  console.log(rows)
  albums = rows
})

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/albums", (req,res) => {
  connection.query('SELECT * from album', (err, rows, fields) => {
    if (err) throw err
    albums = rows
    res.send(albums);
  });
});

app.post("/albums/save", (req,res) => {
  const {albumName, artist, year} = req.body;
  const album = {albumName, artist, year}
  connection.query("INSERT INTO album set ?", album, function(err, rows){
    if (err)
       console.log("Error inserting: %s ", err);
    res.redirect('/albums')
  });
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
