
//setting up express server
const express = require("express");
//give a name to your project. I named it Boko
const Boko = express();
const database = require("./database");

/*   --------- Display All Books API  ---------
Route: /
Description: To access all books
Access: PUBLIC (as we didn't put any password)
Parameter: NONE
Method: GET
*/
Boko.get("/", (req, res) => {
    return res.json({books: database.books});
});

/*  --------- Get Specific Book API  ---------
Route: /is
Description: To get a specific book based on its ISBN
Access: PUBLIC
Parameter: isbn
Method: GET
*/
Boko.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn //make sure to match /:isbn with req isbn and not ISBN
    );
//to check if the book is present or not, check the array lenght
    if(getSpecificBook.length === 0)
        return res.json({
                error: `ISBN ${req.params.isbn} not found.`,
        });
    return res.json({book: getSpecificBook});
});

/*  --------- Get Specific Category Book API  ---------
Route: /c
Description: To get a specific book based on its category
Access: PUBLIC
Parameter: category
Method: GET
*/
Boko.get("/c/:category", (req, res) => {
    //category is an array of strings
    const getSpecificBook = database.books.filter(
            (book) => book.category.includes(req.params.category)
        );
    if(getSpecificBook.length === 0)
        return res.json(
            {error: `Category ${req.params.category} NOT found.`}
        );
    return res.json({book: getSpecificBook});
});

/*  --------- Get Specific Language Book API  ---------
Route: /lang
Description: To get a specific book based on its category
Access: PUBLIC
Parameter: language
Method: GET
*/
Boko.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if(getSpecificBook.length === 0)
        return res.json(
            {error: `Language ${req.params.language} NOT found.`}
        );
    return res.json({book: getSpecificBook});
});


/*  --------- Get ALL Authors API  ---------
Route: /author
Description: To get a specific book based on its category
Access: PUBLIC
Parameter: NONE
Method: GET
*/
Boko.get("/author", (req, res) => {
    return res.json({authors: database.authors})
});

/*  --------- Get Specific Author API  ---------
Route: /author
Description: To get a specific book based on its category
Access: PUBLIC
Parameter: name
Method: GET
*/
Boko.get("/author/:name", (req, res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.name === req.params.name
    );
    if(getSpecificAuthor.length === 0)
        return res.json(
            {error: `Author ${req.params.name} NOT found.`}
        );
    return res.json({author: getSpecificAuthor});
});

/*  --------- Get Authors based on Books API  ---------
Route: /author/book
Description: To get a specific book based on its category
Access: PUBLIC
Parameter: isbn
Method: GET
*/
Boko.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0)
        return res.json({error: `Author for ISBN ${req.params.isbn} NOT found.`});
    return res.json({author: getSpecificAuthor});
});

/*  --------- Get all Publications API  ---------
Route: /pub
Description: get all publications
Access: PUBLIC
Parameter: NONE
Method: GET
*/
Boko.get("/pub", (req, res) => {
    return res.json({publications: database.publications});
});

/*  --------- Get all Publications API  ---------
Route: /pub
Description: get a specific publication
Access: PUBLIC
Parameter: name
Method: GET
*/
Boko.get("/pub/:name", (req, res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.name === req.params.name
    );
    if(getSpecificPublication.length === 0)
        return res.json(
            {error: `Publication ${req.params.name} NOT found`}
        );
    return res.json({publication: getSpecificPublication});
});

/*  --------- Get all Publications API  ---------
Route: /pub/books
Description: get publication based on its ISBN
Access: PUBLIC
Parameter: isbn
Method: GET
*/
Boko.get("/pub/books/:isbn", (req, res) => {
    const getSpecificPublication = database.publications.filter(
        (pub) => pub.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0)
        return res.json(
            {error: `Publication with ISBN ${req.params.isbn} NOT found.`}
        );
    return res.json({publication: getSpecificPublication});
});

Boko.listen(3000, () => console.log("Server running..."));