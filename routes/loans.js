const express = require('express');
const { Book, Loan, Patron } = require('../models');

const router = express.Router();
const moment = require('moment');
const Sequelize = require('sequelize');
const datetime = moment().format("YYYY-MM-DD");
const return_by = moment().add(7, 'days').format("YYYY-MM-DD"); 

//go to new loan page
//first get al book, patron and loan data after that exclude loan books to
//avaible book list

router.get('/new_loan', function(req, res, next) {
    //get all data 
    const allBooks = Book.findAll();
    const allPatrons = Patron.findAll();
    const allLoanBooks = Loan.findAll();
    
    Promise.all([allBooks, allPatrons, allLoanBooks],
    )
    //split object to book, patron, loan
      .then(function(data){
        const books = data[0];
        const patrons = data[1];
        const loans = data[2];
        const loanBooks = [];
        const avaibleBooks = []
        //find out loan books and exclude to avaible books 
        for (var key in loans) {
           loanBooks.push(loans[key].book_id)
        }
        for (var i=0 ; i< loanBooks.length; i++) {
        for (var key in books) {
          if (books[key].id == loanBooks[i] ) {
            delete books[key]
          }
        }
      }
        for (var key in books) {
          avaibleBooks.push([books[key].id , books[key].title] )
        }
        console.log(avaibleBooks);
         res.render('new_loan', { avaibleBooks: avaibleBooks, patrons: patrons, datetime: datetime, return_by: return_by , loans:loans })
      }
    )
});
  
//all loan books 
router.get('/all_loans', (req, res) => {
    Loan.findAll({
      include: [ 
        { model: Patron },
        { model: Book },
      ],
    }).then((loans) => { 
      res.render('all_loans', { loans: loans , loanstatus : "Loans" }); 
    });
});
// list overdue books 
router.get('/loan_overdue', (req, res) => {
    Loan.findAll({
      include: [ 
        { model: Patron },
        { model: Book },
      ],
      where: {
        returned_on : null,
        return_by: {
          $lte: datetime},
      }
    }).then((loans) => { 
      res.render('all_loans', { loans: loans , loanstatus : "Overdue Loans" }); 
    });
});

//all checkout books
router.get('/loan_checked_out', (req, res) => {
    Loan.findAll({
      include: [ 
        { model: Patron },
        { model: Book },
      ],
      where: {
        returned_on : null,
      }
    }).then((loans) => { 
      res.render('all_loans', { loans: loans , loanstatus : "Checked Out Books" }); 
    });
});


module.exports = router;