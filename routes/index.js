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


router.get("/book_detail/:id", function(req, res, next) {
  Book.findById(req.params.id).then(function (book) {
    res.render('book_detail', { book:book, title: 'BookDetail' });
  })
 
});

router.get('/checked_books', function(req, res, next) {
  Loan.findAll({
    include: [ 
      { model: Book }
    ]
  }).then((loans) => { 
    res.render('checked_books', { loans:loans , title: 'Express' });
  });
  
});

router.get('/overdue_books', function(req, res, next) {
  Loan.findAll({
    include: [ 
      { model: Book }
    ],
    where: {
      returned_on : null,
      return_by: {
        $lte: datetime},
    }
  }).then((loans) => { 
    res.render('overdue_books', { loans: loans ,title: 'Express' });
  });
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




router.post('/new_patron', function(req, res, next) {
  Patron.create(req.body).then(function() {
    res.redirect("all_patrons");
  });
;});

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
