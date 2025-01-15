const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body
  if (isValid(username)) {
    return res.status(400).json({message: "Username already taken"})
  } else {
        users.push({username: username, password: password})
      return res.status(201).json({message: "User Created"});
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    }, 1000)
    })
    promise.then(() => {
        return res.status(200).json({message: books});
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const id = req.params.isbn
  if (!books[id]) {
    return res.status(400).json({message: "Not a valid isbn"})
  }
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    }, 1000)
    })
    promise.then(() => {
        return res.status(200).json({message: books[id]});
    })
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  const booksByAuthor = Object.values(books).filter(book => book.author.includes(author))
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    }, 1000)
    })
    promise.then(() => {
        return res.status(200).json({message: booksByAuthor ? booksByAuthor : "No Books Found"});
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()))
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    }, 1000)
    })
    promise.then(() => {
        return res.status(200).json({message: booksByTitle ? booksByTitle : "No Books Found"});
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const id = req.params.isbn
  if (!books[id]) {
    return res.status(400).json({message: "Not a valid isbn"})
  }
  const reviews = books[id].reviews
  let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise resolved")
    }, 1000)
})
promise.then(() => {
    return res.status(200).json({message: reviews});
})
});

module.exports.general = public_users;
