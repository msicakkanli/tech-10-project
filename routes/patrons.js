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
     //res.json(patrons)
     res.render('patron_detail', { patrons: patrons });
    })
   
  });

//***  POST **** 
// create new patron

router.post('/new_patron', function(req, res, next) {
    Patron.create(req.body).then(function() {
      res.redirect("all_patrons");
    }).catch(function(err){
        if(err.name === "SequelizeValidationError"){
            res.render("new_patron",
                       {patron: Patron.build(req.body),
                        errors: err.errors
            });
        } else{
          throw err;
        }
      }).catch(function(err){
        res.send(err);
      });
});

//update patron detail
router.post('/patron_detail/:id', function(req, res, next) {
  const body = req.body
  console.log(body);
  Patron.findOne({
    where: {
      id : req.params.id
    }
  }).then(function(patron){
    return patron.update(body)
  }).then(function () {
    res.redirect('../all_patrons');
  })
});
module.exports = router;