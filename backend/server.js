const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function(){
    console.log('Node listening at http://localhost:3000 ...');
});

var con = mysql.createConnection({
    host: "localhost",
    user: "quang",
    password: "tommyguns123",
    database:"users"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!");
    var sql = "SELECT * from todos";
    con.query(sql, (err, results) =>{
        if (err) throw err;
        console.log(results);
    })
  });
  //GET ALL TODO
  app.get('/', function (req, res) {
    con.query('SELECT * FROM todos', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});
  //GET TODO BY ID
  app.get('/:id', (req, res) => {
      let user_id = req.params.id;
      con.query(`SELECT * FROM todos WHERE id=?`,user_id, (err, results) =>{
          if(err) throw err;
          res.send(results);
      });
  })
  //ADD TODO
  app.post('/add-user', (req, res) => {
      console.log(req.body);
    let todo = req.body.todo;
      con.query(`INSERT INTO todos SET ?`, {todo: todo}, (err, results) =>{
          if(err) throw err;
          return res.send(results);
      })
  })
  //UPDATE TODO
  app.put('/:id', (req, res) => {
    let todo_id = req.params.id;
    let todo = req.body.todo;
    console.log(todo_id);
    con.query(`UPDATE todos SET todo=? WHERE id=?`,[todo, todo_id], (err, results) =>{
        if(err) throw err;
        res.send(results);
    });
  })
  //DELETE TODO
  app.delete('/:id', (req, res) =>{
      con.query(`DELETE FROM todos WHERE id=?`, req.params.id, (err, results) =>{
          if(err) throw err;
          res.send(results);
      })
  })
