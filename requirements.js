/*
Requirements for Book Management:
1. Books - we need ID to identify books. We call it ISBN (International Standard Book Number)
    , Title of the book, publication date, author name, total pages, language, genre/category
    author and category will be an array as there can be multiple entries here
2. Authors - ID, name, books[]
3. Publications - id, name, books[]

APIs that we will need:
✔1. Books
   ✔ to get all books 
   ✔ to get specific books
   ✔ to get list of books from a specific category
   ✔ to get specific language books
✔2. Authors
   ✔ to get all authors
   ✔ to get specific authors
   ✔ to get list of authors based on books
✔3. Publications
   ✔ to get all publications
   ✔ to get a specific publication
   ✔ to get a list of publication based on a book

4.      B O O K S
 POST
   ✔ to add a new book
 PUT
   ✔ to update book title
   ✔ to update author name
 DELETE
   ✔ to delete a book (reflects for authors obj as well)
   ✔ to delete an author

5.      A U T H O R S
 POST
   ✔ to add a new author
 PUT
   ✔ to update author name
 DELETE
   ✔ to delete an author

6.   P U B L I C A T I O N S
 POST
   ✔ to add a new publication
 PUT
   ✔ to update publication name
   ✔ update/add books to publication
 DELETE
   ✔ to delete a publication
   ✔ to delete a book from publication
*/


/*
    📒📒📓📓📔📔 THINGS I TOOK A NOTE OF SO FAR 📔📔📓📓📒📒
    1. Installtion of nodemon
    2. npx nodemon index
    3. includes method for array of strings
    4. POSTMAN
    5. .gitignore
*/