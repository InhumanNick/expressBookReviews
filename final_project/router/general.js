const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');

    }

    if (users[username]) {
        return res.status(409).send('Username already exists');
    }

    users[username] = { password };
  return res.status(300).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

   res.send(JSON.stringify(books,null,10))

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn;
  const bookDetails = books[isbn];

  if (bookDetails) {
    res.json(isbn);
  } else {

  return res.status(300).json({message: 'Book not found'});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const bookKeys = Object.keys(books);
  const author = req.params.author;
  const booksByAuthor = bookKeys.map(key => books[key]).filter(book => book.author === author);

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {

  return res.status(300).json({message: "No books by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
    const bookKeys = Object.keys(books);
    const title = req.params.title;
    const booksByTitle = bookKeys.map(key => books[key]).filter(book => book.title === title);

    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {

      return res.status(300).json({message: "No book with that title found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
    const review = req.params.isbn;

    if (isbn.length > 0) {
        res.json(review);

    } else {
      return res.status(300).json({message: "No reviews to show"});
    }
});

module.exports.general = public_users;
