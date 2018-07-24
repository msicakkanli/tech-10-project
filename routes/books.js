const express = require('express');
const { Book, Loan, Patron } = require('../models');

const router = express.Router();
const today = new Date();
const moment = require('moment');
const Sequelize = require('sequelize');
const datetime = moment().format("YYYY-MM-DD");

// ***** GET *****
// get all books 

router.get('/all_books', function(req,res,err){
    Book.findAll().then(function(books){
        res.render("all_books", {books:books, title:"Books"})
    })
});

//create new book page
router.get('/books_new', function(req, res, next) {
    res.render('new_book', { title: 'Books' });
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
      //res.json(loans)
       res.render('overdue_books', { loans : loans , title:"Books Overdue" });
    });
});

//List all checked out books 

router.get('/checked_books', (req, res) => {
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
       // res.json(loans)
        res.render('overdue_books', { loans : loans , title:"Books Checked Out"});
      });
});

//get book detail 

router.get("/book_detail/:id", function(req, res, next) {
  Book.findOne({
    include: [ 
      { model: Loan ,
        include: [Patron, Book]},
    ],
    where: {
      id : req.params.id
    }
  }).then(function (books) {
   
    res.render('book_detail', { books :books, title: 'BookDetail' });
  })
 
});

router.get("/return_book/:id", function (req,res,next) {
  Loan.findOne({
    include: [ 
      {model: Patron},
      {model: Book}
    ],
    where: {
      id : req.params.id
    }
  }).then(function (loan) {
   // res.json(loan)
   res.render('return_book', { loan :loan, datetime:datetime, title: 'BookDetail' });
  })
})

// *** POST *** 
router.post('/return_book/:id', function(req, res, next) {
    const body = req.body.returned_on
    Loan.findOne({
      where: {
        id : req.params.id
      }
    }).then(function(loan){
      return loan.update({returned_on : body})
    }).then(function () {
      res.redirect('../all_loans');
    })
});



// create new book 

router.post('/books', function(req, res, next){
  Book.create(req.body).then(function(){
    res.redirect('all_books')
  }).catch(function(err){
      if(err.name === "SequelizeValidationError"){
          res.render("new_book",
                     {loan: Book.build(req.body),
                      errors: err.errors
          });
      } else{
        throw err;
      }
    }).catch(function(err){
      console.log(err);
    });
})

//update book detail 
router.post('/book_detail/:id', function(req, res, next) {
  const body = req.body
  console.log(body);
  Book.findOne({
    where: {
      id : req.params.id
    }
  }).then(function(book){
    return book.update(body)
  }).then(function () {
    res.redirect('../all_books');
  })
});

  
module.exports = router;