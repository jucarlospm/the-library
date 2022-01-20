import { resolvers } from "../schema/resolvers";

const book =  {
    "_id": "61e79ded3edae95aebefb225",
    "title": "testBook",
    "author": "testAuthor",
    "pages": 10,
    "status": "AVAILABLE"
};

const bookUpdate =  {
    "_id": "61e79ded3edae95aebefb225",
    "title": "testBook 2",
    "author": "testAuthor",
    "pages": 5,
    "status": "LENT"
};

const idBook = "61e79ded3edae95aebefb225";

jest.mock('../repositories/BookRepository', () => () => ({
    create:(data) => book,
    find:(id) => [],
    update:(id, data) => bookUpdate,
    delete:(id) => bookUpdate,
    findById:(id) => [],
    deleteCacheData:(key) => []
}));

test("Create a book", async() => {
    let data = await resolvers.Mutation.createBook(null, {book: book});
    expect(book).toEqual(data);
});

test("Update a book", async() => {
    let data = await resolvers.Mutation.updateBook(null, {_id: idBook, book: book});
    expect(bookUpdate).toEqual(data);
});

test("Delete a book", async() => {
    let data = await resolvers.Mutation.deleteBook(null, {_id: idBook});
    expect(bookUpdate).toEqual(data);
});