const express = require('express');
const { Book, Loan, Patron } = require('../models');

const router = express.Router();
const today = new Date();
const moment = require('moment');
const Sequelize = require('sequelize');


// get all books 

router.get('/all_books', function(req,res,err){
    Book.findAll().then(function(books){
        res.render("all_books", {books:books})
    })
});

//create new book page
router.get('/books_new', function(req, res, next) {
    res.render('new_book', { title: 'Express' });
  });
  
//list overdue books 
router.get('/books_overdue', (req, res) => {
    Loan.findAll({
      include: [ 
        { model: Patron },
        { model: Book },
      ],
      where: {
        returned_on : null,
        return_by: {
        $lte: today},
        }
    }).
    then((loans) => {
       res.render('overdue_books', { loans : loans });
    });
});

//List all checked out books 

router.get('/books_checked_out', (req, res) => {
    Loan.findAll({
      include: [ 
        { model: Patron },
        { model: Book },
      ],
       where: {
        returned_on : null,
      }
    })
      .then((loans) => {
         res.render('checked_books', { loans : loans });
      });
    });
  
module.exports = router;