var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Patron = require("../models").Patron;
var Loan = require("../models").Loan;
var moment = require('moment');
const datetime = moment().format("YYYY-MM-DD");
const return_by = moment().add(7, 'days').format("YYYY-MM-DD"); 



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// router.get('all_books', function(req, res, next) {
//   Book.findAll().then(function (books) {
//     res.render('all_books', { books: books,title: 'Allbooks' });
//   })
// });

router.get('books/all_loans', (req, res) => {
  Loan.findAll({
    include: [ 
      { model: Patron },
      { model: Book },
    ],
  }).then((loans) => { 
    res.json(loans)
    //res.render('all_loans', { loans: loans }); 
  });
});



router.get('/books/return_book', function(req, res, next) {
  res.render('return_book', { title: 'Express' });
});

router.get('/new_book', function(req, res, next) {
  res.render('new_book', { title: 'Express' });
});





router.get('/checked_loans', function(req, res, next) {
  res.render('checked_loans', { title: 'Express' });
});



router.get('/patron_detail', function(req, res, next) {
  res.render('patron_detail', { title: 'Express' });
});



// router.post('/books', function(req, res, next) {
//   Book.create(req.body).then(function() {
//     res.redirect("all_books");
//   });
// ;});






router.post('/loan', function (req,res,next) {
  var query = req.body
  Loan.create(query).then(function () {
    res.redirect("all_loans");
  })
})

// router.post('/loan', function(req, res, next){
//   Loan.create(req.body).then(function(loan){
//     res.redirect('all_loans')
//   }).catch(function(err){
//       if(err.name === "SequelizeValidationError"){
//           res.render("new_loan",
//                      {loan: Loan.build(req.body),
//                       errors: err.errors
//           });
//       } else{
//         throw err;
//       }
//     }).catch(function(err){
//       console.log(err);
//     });
// })


module.exports = router;
