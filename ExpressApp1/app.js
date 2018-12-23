'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var mssql = require('mssql');

var app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

/*
app.get('/user', function (req, res) {
    res.sendFile(__dirname +'/public/Page1.html');
});
*/
var dbconfig = {
    server: "LAPTOP-ML0R963B\\SQLEXPRESS",
    database: "emp",
    user: "sa",
    password: "sql",
    port: 1433
};

var conn = new mssql.ConnectionPool(dbconfig);
var request = new mssql.Request(conn);

 conn.connect(function (err) {
     if (err) {
         console.log(err);
         return;
     }
     else {

         console.log("database connected");
     }
 });

/*
CREATE PROCEDURE GetALL AS
BEGIN
select * from employee;
END

EXEC GetALL;
*/

app.get('/api/ninjas', function (req, res) {

    request.query("EXEC GetALL", function (err, rows, fields) {

        if (!err) {

            res.send(rows.recordset);


        }
        else {
            res.status(404).send({ error: err });
        }


    });

});

app.get('/api/user', function (req, res) {

    request.query("select * from Persons", function (err, rows, fields) {

        if (!err) {

            res.send(rows.recordset);


        }
        else {
            res.status(404).send({ error: err });
        }


    });

});


app.get('/api/ninjas/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    request.query("EXEC getEmployee '"+id+"'", function (err, rows, fields) {

        if (!err) {
            res.send(rows.recordset);
        }
        else {
            res.status(404).send({ error: err });
        }


    });

});


app.post('/api/ninjas', function (req, res) {

    
    var ename = req.body.name;
    var epoints = req.body.points;


    request.query("insert into employee(name,points) values('" + ename + "','" + epoints + "') ", function (err, rows, fields) {

        if (!err) {

            res.send(rows.recordset);

        }
        else {
            res.status(404).send({ error: err });
        }


    });
});

app.put('/api/ninjas/:id', function (req, res) {
  
    var id = req.params.id;
  
    var name = req.body.name
    var points = req.body.points;
    
    
    request.query("update employee set name='" + name + "' ,points='" + points + "' where id='" + id + "'", function (err, rows, fields) {


        if (!err) {
            res.send(rows.recordset);
        }
        else {
            res.status(500).send({ error: err });
        }

    });

});



app.delete('/api/ninjas/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    request.query("delete from employee where id= '" + id + "'", function (err, rows) {

        if (!err) {
           
            res.send(rows.recordset);
        }
        else {
            res.status(404).send({ error: err });
        }


    });
   
});


app.listen(process.env.PORT || 3000, function () {
    console.log("connected to server");
});
