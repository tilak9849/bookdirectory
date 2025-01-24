const books = require('../data/books.json');
const fs = require("fs");
const path = require("path");
exports.getAllBooks = (req,res)=>{
    res.json(books)
}

exports.getBookById = (req,res)=>{
    const book = books.find((b)=> b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send("Book not found")
        res.json(book)
}

exports.addBook = (req, res) => {
    const newBook = {
        id: books.length + 1, // Generate an ID
        title: req.body.title,
        author: req.body.author,
    };

    books.push(newBook); 
    const filePath = path.join(__dirname, "../data/books.json");
    fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).send("An error occurred while saving the book.");
        }

        res.status(201).json(newBook);
    });
};

exports.updateBook = (req,res)=>{
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send("Book not found");

    book.title = req.body.title || book.title,
    book.author = req.body.author || book.author

    res.json(book)
}

exports.deleteBook = (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send("Book not found");
    const deletedBook = books.splice(bookIndex, 1);
    const filePath = path.join(__dirname, "../data/books.json");
    fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file =:", err);
            return res.status(500).send("An error occurred while deleting the book.");
        }
        res.json(deletedBook); 
    });
};