const express = require('express');
const router = express.Router();
const todo = require('../models/Todo.js')


router.get('/', function(req, res){
    todo.find((err, item) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(item);
        }
    })
})

router.get('/edit/:id', function(req, res){
    let id = req.params.id;
    todo.findById(id, (err, item) => {
        if(item){
            res.json(item);
        }
        else{
            res.status(400).send("todo not exist");
        }
    })
})

router.post('/delete:id', function(req, res){
    todo.deleteOne({ _id: req.params.id }, function (err) {
        if(err)
            console.log(err);
        else
            console.log("ok, i am deleted");
    })
})


router.post('/add', function(req, res){
    let item = new todo(req.body);
    item.save().then(item => {
        console.log(item);
        res.json(item);
    })
    .catch(err => {
        res.status(400).send("todo add false")
    })
})

router.post('/update/:id', function(req, res){
    let id = req.params.id;
    todo.findById(id, function(err, item){
        if(!item){
            res.status(404).send("data is not found");
        }
        else{
            // console.log(item);
            item.description = req.body.description; 
            item.responsible = req.body.responsible; 
            item.priority = req.body.priority;
            item.status = req.body.status;
            item.preStatus = req.body.preStatus;
            item.startDate = req.body.startDate;
            item.endDate = req.body.endDate;
            item.completed = req.body.completed;
            item.save().then(item => {
                console.log("update");
                console.log(item);
                res.json(item)
                // res.status(200).json("todo is updated successfully")
            })
            .catch(err => {
                res.status(400).send("updated false");
            })
        }
    })
})

module.exports = router;