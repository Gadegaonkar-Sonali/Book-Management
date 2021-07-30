require("dotenv").config(); //should always be on line number 1
//setting up express server and mongoose
const express = require("express");
const mongoose = require("mongoose");
//give a name to your project. I named it Boko
const Boko = express();
const database = require("./database");
//our server doesn't understand JSON right away when it comes to using it as a body and not just a parameter, we need to tell it to use json
Boko.use(express.json());
//establishing database connection
mongoose.connect(
    process.env.MONGO_URL, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }
).then(() => console.log("Connection Established Successfully.")); //a promise


/*   --------- Display All Books API  ---------
Route: /
Description: To access all books
Access: PUBLIC (as we didn't put any password)
Parameter: NONE
Method: GET
*/
Boko.get("/", (req, res) => {
     res.json({books: database.books});
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
         res.json({
                error: `ISBN ${req.params.isbn} not found.`,
        });
     res.json({book: getSpecificBook});
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
         res.json(
            {error: `Category ${req.params.category} NOT found.`}
        );
     res.json({book: getSpecificBook});
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
         res.json(
            {error: `Language ${req.params.language} NOT found.`}
        );
     res.json({book: getSpecificBook});
});


/*  --------- Get ALL Authors  ---------
Route: /author
Description: To get all authors
Access: PUBLIC
Parameter: NONE
Method: GET
*/
Boko.get("/author", (req, res) => {
     res.json({authors: database.authors})
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
         res.json(
            {error: `Author ${req.params.name} NOT found.`}
        );
     res.json({author: getSpecificAuthor});
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
         res.json({error: `Author for ISBN ${req.params.isbn} NOT found.`});
     res.json({author: getSpecificAuthor});
});

/*  --------- Get all Publications API  ---------
Route: /pub
Description: get all publications
Access: PUBLIC
Parameter: NONE
Method: GET
*/
Boko.get("/pub", (req, res) => {
     res.json({publications: database.publications});
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
         res.json(
            {error: `Publication ${req.params.name} NOT found`}
        );
     res.json({publication: getSpecificPublication});
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
         res.json(
            {error: `Publication with ISBN ${req.params.isbn} NOT found.`}
        );
     res.json({publication: getSpecificPublication});
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
     res.json({books: database.books});
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
     res.json({authors: database.authors});
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
     res.json({publication: database.publications});
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
            ; //to end the if
        }
    });
     res.json({books: database.books});
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
             book.authors.push(parseInt(req.params.authorID)); //parseInt so that the number gets stored as a num and not string
    });
    //update author database as well
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorID))
             author.books.push(req.params.isbn);
    });

     res.json({books: database.books, author: database.authors});
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
            ;
    });
     res.json({author: database.authors});
});


/*  --------- Updating Publication Name ---------
Route: pub/update
Description: update publication name
Access: PUBLIC
Parameter: id
Method: PUT
*/
Boko.put("/pub/update/:id", (req, res) => {
    database.publications.forEach((pub) => {
        if(pub.id === parseInt(req.params.id))
            pub.name = req.body.newPublicationName;
            ;
    });
     res.json({publication: database.publications});
});

/*  --------- Adding Publications ---------
Route: pub/update/book
Description: adding publication
Access: PUBLIC
Parameter: isbn
Method: PUT
*/
Boko.put("/pub/update/book/:isbn", (req, res) => {
    database.publications.forEach((pub_data) => {
        if(pub_data.id === req.body.pub_ID)
             pub_data.books.push(req.params.isbn); 
    });
    //updating isbn in books object
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            book.publications = req.body.pub_ID;
            ;
        }
    });
     res.json(
        {
            message: "Successfully Updated Publications and Books.",
            books: database.books,
            publications: database.publications
        }
    );
});

/*  --------- Deleting a Book ---------
Route: /book/delete
Description: deleting a book
Access: PUBLIC
Parameter: isbn
Method: DELETE
*/
Boko.delete("/book/delete/:isbn", (req, res) => {
    //forEach will be quite lenghty. Here we will hence use map;
     //we cannot change books database as a whole directly as it is a constant. Hence convert it to let for the below code to work
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    ); //don't use curly braces in filter
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/*  --------- Deleting Author from books ---------
Route: /book/author/delete
Description: deleting a book's author
Access: PUBLIC
Parameter: isbn, author id
Method: DELETE
*/
Boko.delete("/book/author/delete/:isbn/:authorID", (req, res) => {
    //we are not doing anything to the whole database
    //we are only changing one property
    //Hence we use forEach
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            const newAuthorList = book.authors.filter(
                //we don't need to do author.id as author by itself is id
                //why? as author is an element inside of authors array(not obj) in books
                (author) => author !== parseInt(req.params.authorID)
            ); 
            book.authors = newAuthorList;
            return;
        }   
    });
    //editing in authors obj
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorID))
        {
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );
            author.books = newBooksList;
            return;
        }
    });
    return res.json({books: database.books, authors: database.authors});
});

/*  --------- Deleting an Author ---------
Route: /author/delete
Description: deleting an author
Access: PUBLIC
Parameter: authorID
Method: DELETE
*/
Boko.delete("/author/delete/:authorID", (req, res) => {
    const UpdatedAuthorDatabase = database.authors.filter(
        (author) => author.id !== parseInt(req.params.authorID)
    );
    database.authors = UpdatedAuthorDatabase;
    return res.json({authors: database.authors});
});

/*  --------- Deleting a Publication ---------
Route: /pub/delete
Description: deleting a publication
Access: PUBLIC
Parameter: pubID
Method: DELETE
*/
Boko.delete("/pub/delete/:pubID", (req, res) => {
    const UpdatedPublicationDatabase = database.publications.filter(
        (pub) => pub.id !== parseInt(req.params.pubID)
    );
    database.publications = UpdatedPublicationDatabase;
    return res.json({publications: database.publications});
});

/*  --------- Deleting a Book from Publications ---------
Route: /pub/book/delete
Description: deleting a book from publications
Access: PUBLIC
Parameter: pubID, isbn
Method: DELETE
*/
Boko.delete("/pub/book/delete/:pubID/:isbn",(req, res) => {
    database.publications.forEach((pub) => {
        if(pub.id === parseInt(req.params.pubID))
        {
            const updatedPublicationDatabase = pub.books.filter(
                (book) => book !== req.params.isbn
            );
            pub.books = updatedPublicationDatabase;
            return;
        }
    });
    //editing in books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            const updatedBookDatabase = book.publications.filter(
                (pub) => pub !== parseInt(req.params.pubID)
            );
            book.publications = updatedBookDatabase;
            return;
        }
    });

    return res.json({
                        books: database.books,
                        publications: database.publications
                     });
});

Boko.listen(3000, () => console.log("Server running..."));