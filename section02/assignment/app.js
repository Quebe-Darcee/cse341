const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser({ extended: false }));

// array holding all books
const books = [{name: 'Persuasion', author: 'Jane Austen', summary: 'Awesome'}];

// home page
// app.get('/', (req, res, next) => {
//   res.send('<h1>Home Page</h1>');
// });

// displays all books
app.get('/books', (req, res, next) => {
  res.render('books/index.ejs', {
    books: books
  });
});

// display html form to create a new book (for now make the root url also show new book form)
app.get(['/', '/books/new'], (req, res, next) => {
  res.render('books/new.ejs');
});

// create a new book
app.post('/books', (req, res, next) => {
  const book = {
    name: req.body.name,
    author: req.body.author,
    summary: req.body.summary
  };
  books.push(book);
  res.redirect('/books');
});

app.listen(3000);
