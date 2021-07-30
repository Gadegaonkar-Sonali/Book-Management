//before MongoDB, we will temporarily use this file for db

let books = [
    {
        ISBN: "12345Book",
        title: "Pride and Prejudice",
        pubDate: "28-1-1813",
        language: "English",
        totalPages: "250",
        authors: [1, 2], //will be numbers as it will be linked to author obj
        category: ["drama", "romance", "classic"],
        publications: [1]
    }, 
    {
        ISBN: "12345Fantasy",
        title: "The Way of Kings",
        pubDate: "31-8-2010",
        language: "English",
        totalPages: "1007",
        authors: [1, 2], //will be numbers as it will be linked to author obj
        category: ["Fantasy", "fiction"],
        publications: []
    }
];

const authors = [
    {
        id: 1,
        name: "Jane Austen",
        books: ["12345Book", "123Secret"]
    },
    {
        id: 2,
        name: "Brandon Sanderson",
        books: ["12345Book"]
    }
];

const publications = [
    {
        id: 1,
        name: "PenguinPub",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "Tor Books",
        books: []
    }
];

//we cannot export JS files at all unless we write the following code
module.exports = {books, authors, publications}