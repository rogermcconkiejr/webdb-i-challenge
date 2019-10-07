const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    //get the list of posts from the data base
    //send the list of posts to the client. I need SELECT * FROM table   using KNEX.
    db.select('*').from('accounts') //all KNEX commands return a promise.
    .then(accounts=>{
        res.status(200).json(accounts);
    })
    .catch(error=>{
    res.status(500).json(error);
    })
    });

    router.get('/:id', (req, res)=>{
        db.select('*')
        .from('accounts')
        .where({id:req.params.id})
        .then(accounts=>{
            res.status(200).json(accounts);
        })
        .catch(error=>{
        res.status(500).json(error);
        })
    })

    router.post('/', (req, res)=>{
        db('accounts')
        .insert(req.body, 'id')
        .then(account=>{
            res.status(200).json(account);
        })
        .catch(error=>{
        res.status(500).json(error);
        })
    })

    router.put('/:id', (req,res)=>{
        db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(account=>{
            res.status(200).json(account);
        })
        .catch(error=>{
        res.status(500).json(error);
        })
    })

    router.delete('/:id', (req,res)=>{
        db('accounts')
        .where({id: req.params.id})
        .del()
        .then(account=>{
            res.status(200).json(account);
        })
        .catch(error=>{
        res.status(500).json(error);
        })
    })
    module.exports = router;