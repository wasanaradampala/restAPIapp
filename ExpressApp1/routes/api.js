var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database:'test'

});

mysqlConnection.connect((err) => {
    if (err) {
        console.log("canot connect with database");

    }
    else {
        console.log(" connected with database");
    }
});

router.get('/ninjas', function (req, res) {
    
        mysqlConnection.query("select * from employee", function (err, rows, fields) {

        if (!err) {
           
            
          //  res.render('main', { rows: rows });
           
            console.log("this is cool");
            res.send(rows);

           
        }
        else {
            res.status(404).send({ error: err });
        }


    });
   
});


router.get('/ninjas/:id', function (req, res) {
    var id = req.params.id;
    mysqlConnection.query("select * from employee where id= '"+id+"'", function (err, rows, fields) {

        if (!err) {
            res.send(rows);
        }
        else {
            res.status(404).send({ error: err });
        }


    });

});


router.post('/ninjas', function (req, res) {
   
    var employee = req.body;
    //var ename = req.body.name;
    //var epoints = req.body.points;
    console.log(req.body);

    mysqlConnection.query("insert into employee(name,points) values('" + ename + "','" + epoints + "') ", function (err, rows, fields) {

        if (!err) {
            res.send(rows);
        }
        else {
            res.status(404).send({ error: err });
        }


    });
});

router.put('/ninjas/:id', function (req, res) {
    var id = req.params.id;
    var emp = req.body;
    var name = emp.name;
    var points = emp.points;
    console.log("this");
    mysqlConnection.query("update employee set name='" + name + "' ,points='" + points + "' where id='" + id + "'", function (err,rows,fields) {


        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500).send({ error: err });
        }

    });
   
});



router.delete('/ninjas/:id', function (req, res) {
    var id = req.params.id;
    mysqlConnection.query("delete from employee where id= '" + id + "'", function (err, rows, fields) {

        if (!err) {
            res.send("delete successfully");
        }
        else {
            res.status(404).send({ error: err });
        }


    });
    res.send({ type: 'delete' })
});

module.exports = router;