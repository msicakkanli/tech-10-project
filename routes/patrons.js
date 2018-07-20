const express = require('express');
const { Book, Loan, Patron } = require('../models');

const router = express.Router();
const Sequelize = require('sequelize');


// *** GET **** 
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

//***  POST **** 
// create new patron

router.post('/new_patron', function(req, res, next) {
    Patron.create(req.body).then(function() {
      res.redirect("all_patrons");
    });
});
module.exports = router;