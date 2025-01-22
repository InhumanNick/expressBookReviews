const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  if (typeof username === 'string' && username.trim().length >= 3) {
    return true;
    
  } else {

    return false;
  };
}

const authenticatedUser = (username,password)=>{
  if (users[username]) {
    return users[username].password === password;
    
    const token = jwt.sign({ username }, SECRET_KEY, {expiresIn: '1h'})

    res.json({ message: 'Login successful', token});

  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Assuming 'reviews' is an object where keys are ISBNs and values are arrays of review objects
let reviews = {
    '1234567890': [
        { username: 'JohnDoe', review: 'Great book!' }
    ]
};

regd_users.post('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.query;
    const username = req.session.username; // Assuming username is stored in session

    if (!review) {
        return res.status(400).send('Review is required');
    }

    if (!username) {
        return res.status(401).send('User not logged in');
    }

    // Check if there are existing reviews for the ISBN
    if (!reviews[isbn]) {
        reviews[isbn] = [];
    }

    // Find if the user has already reviewed this book
    const userReviewIndex = reviews[isbn].findIndex(r => r.username === username);

    if (userReviewIndex !== -1) {
        // Modify the existing review
        reviews[isbn][userReviewIndex].review = review;
        res.send('Review updated successfully');
    } else {
        // Add a new review
        reviews[isbn].push({ username, review });
        res.send('Review added successfully');
    }
});

regd_users.delete("/auth/review/:isbn", (req,res) => {
     const isbn = req.params.isbn;
     const username = req.session.username;

     if (!username) {
        return res.status(401).send('User not logged in');

     }

     if (!reviews[isbn]) {
        return res.status(404).send('No reviews found for this book');

     }

     const userReviewIndex = revies[isbn].findIndex(r => r.username === username);

     if (userReviewIndex !== -1) {
        
        reviews[isbn].splice(userReviewIndex, 1);
        res.send( 'Review deleted successfully');
     } else {
        res.status(404).send('Review not found for this user');
     }
});

app.use((req, res, next) => {
    req.session = { username: 'JohnDoe' };
    next();
});

// Example of session setup (for demonstration purposes)
app.use((req, res, next) => {
    req.session = { username: 'JohnDoe' }; // Mock session data
    next();
});
  return res.status(300).json({message: "Thank you for the review"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
