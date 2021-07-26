
//setting up express server
const express = require("express");
//give a name to your project. I named it Boko
const Boko = express();
const database = require("./database");
//our server doesn't understand JSON right away when it comes to using it as a body and not just a parameter, we need to tell it to use json
Boko.use(express.json());

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

/*  --------- Get Specific Book ---------
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

/*  --------- Get Specific Category Book ---------
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

/*  --------- Get Specific Language Book ---------
Route: /lang
Description: To get a specific book based on its language
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


/*  --------- Get ALL Authors  ---------
Route: /author
Description: To get all authors
Access: PUBLIC
Parameter: NONE
Method: GET
*/
Boko.get("/author", (req, res) => {
    return res.json({authors: database.authors})
});

/*  --------- Get Specific Author  ---------
Route: /author
Description: To get a specific author
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

/*  --------- Get Authors based on Book ISBN  ---------
Route: /author/book
Description: To get an author based on book ISBN
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

/*  --------- Get a Specific Publication API  ---------
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

/*  --------- Get Publication wrt ISBN API  ---------
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

/*  --------- Adding a New Book ---------
Route: /book/add
Description: add a new book
Access: PUBLIC
Parameter: NONE
Method: POST
*/
Boko.post("/book/add", (req, res) => {
    const {newBook} = req.body; //destructuring. This is the same as const newBook = req.body.newBook;
    database.books.push(newBook);
    return res.json({books: database.books});
});

/*  --------- Adding a New Author ---------
Route: /author/add
Description: add a new author
Access: PUBLIC
Parameter: NONE
Method: POST
*/
Boko.post("/author/add", (req, res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors});
});

/*  --------- Adding a New Publication ---------
Route: /pub/add
Description: add a new publication
Access: PUBLIC
Parameter: NONE
Method: POST
*/
Boko.post("/pub/add", (req, res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publication: database.publications});
});

/*  --------- Updating Book Title ---------
Route: /book/update/title
Description: update book title
Access: PUBLIC
Parameter: isbn
Method: PUT
*/
//you can update the book title by /book/update/title/:isbn/:title or by the below method which uses body
Boko.put("/book/update/title/:isbn", (req, res) => {
    const {newBookTitle} = req.body;
    //we can use map or forEach. Map will be a bad idea here as it duplicated into a new array/object while forEach changes in the main array/obj
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            book.title = req.body.newBookTitle;
            return; //to end the if
        }
    });
    return res.json({books: database.books});
});

/*  --------- Updating Book Author ---------
Route: /book/update/author
Description: update/add book author
Access: PUBLIC
Parameter: isbn, authorID
Method: PUT
*/
Boko.put("/book/update/author/:isbn/:authorID", (req, res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
            return book.authors.push(parseInt(req.params.authorID)); //parseInt so that the number gets stored as a num and not string
    });
    //update author database as well
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorID))
            return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books, author: database.authors});
});

/*  --------- Updating Author Name ---------
Route: author/update
Description: update author name
Access: PUBLIC
Parameter: id
Method: PUT
*/
Boko.put("/author/update/:id", (req, res) => {
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.id))
            author.name = req.body.newAuthorName;
            return;
    });
    return res.json({author: database.authors});
});


/*  --------- Updating Publication Name ---------
Route: pub/update
Description: update author name
Access: PUBLIC
Parameter: id
Method: PUT
*/
Boko.put("/pub/update/:id", (req, res) => {
    database.publications.forEach((pub) => {
        if(pub.id === parseInt(req.params.id))
            pub.name = req.body.newPublicationName;
            return;
    });
    return res.json({publication: database.publications});
});

Boko.listen(3000, () => console.log("Server running..."));