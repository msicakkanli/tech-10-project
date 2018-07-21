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
      //res.json(patrons)  
      res.render('all_patrons', { patrons: patrons , title: 'AllPatrons' });
    })
});

// Get patron details 
router.get("/patron_detail/:id", function(req, res, next) {
    Patron.findOne({
      include: [ 
        { model: Loan,
         include: [Book]},
      ],
      where: {
        id : req.params.id
      }
    }).then(function (patrons) {
     // res.json(patrons)
      res.render('patron_detail', { patrons :patrons, title: 'PatronDetail' });
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