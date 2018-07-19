const express = require('express');
const { Book, Loan, Patron } = require('../models');

const router = express.Router();
const Sequelize = require('sequelize');


  
//go to create new patron 

router.get('/new_patron', function(req, res, next) {
    res.render('new_patron', { title: 'Express' });
});

//List all patrons
router.get('/all_patrons', function(req, res, next) {
    Patron.findAll().then(function (patrons) {
      res.render('all_patrons', { patrons: patrons , title: 'AllPatrons' });
    })
});

module.exports = router;