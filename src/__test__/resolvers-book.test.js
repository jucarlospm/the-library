import { resolvers } from '../schema/resolvers';

const book = {
  _id: '61e79ded3edae95aebefb225',
  title: 'testBook',
  author: 'testAuthor',
  pages: 10,
  status: 'AVAILABLE',
};

const bookUpdate = {
  _id: '61e79ded3edae95aebefb225',
  title: 'testBook 2',
  author: 'testAuthor',
  pages: 5,
  status: 'LENT',
};

const idBook = '61e79ded3edae95aebefb225';

jest.mock('../repositories/BookRepository', () => () => ({
  create: (data) => book,
  find: (id) => [],
  findOne: (id) => [],
  update: (id, data) => bookUpdate,
  delete: (id) => bookUpdate,
  findById: (id) => [],
  deleteCacheData: (key) => [],
}));

describe('When create book with invalid inputs', () => {
  it('Show exception title', async () => {
    const testBook = {
      ...book,
      title: '',
    };

    try {
      await resolvers.Mutation.createBook(null, { book: testBook });
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toBe('Error: Title is required');
    }
  });

  it('Show exception author', async () => {
    const testBook = {
      ...book,
      author: '',
    };

    try {
      await resolvers.Mutation.createBook(null, { book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Author is required');
    }
  });

  it('Show exception negative page', async () => {
    const testBook = {
      ...book,
      pages: -10,
    };
    try {
      await resolvers.Mutation.createBook(null, { book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Invalid number of pages');
    }
  });

  it('Show exception status ', async () => {
    const testBook = {
      ...book,
      status: 'WRONG',
    };
    try {
      await resolvers.Mutation.createBook(null, { book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Invalid status');
    }
  });
});

describe('When create book with correct inputs', () => {
  it('Create a book', async () => {
    let data = await resolvers.Mutation.createBook(null, { book: book });
    expect(book).toEqual(data);
  });
});

describe('When update book with invalid inputs', () => {
  it('Show exception title', async () => {
    const testBook = {
      ...book,
      title: '2',
    };

    try {
      await resolvers.Mutation.updateBook(null, { _id: idBook, book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Title is required');
    }
  });

  it('Show exception author', async () => {
    const testBook = {
      ...book,
      author: '',
    };

    try {
      await resolvers.Mutation.updateBook(null, { _id: idBook, book: testBook });
    } catch (e) {
      expect(e.message).not.toBe('Error: Title is required');
      expect(e.message).toBe('Error: Author is required');
    }
  });

  it('Show exception negative page', async () => {
    const testBook = {
      ...book,
      pages: -10,
    };
    try {
      await resolvers.Mutation.updateBook(null, { _id: idBook, book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Invalid number of pages');
    }
  });

  it('Show exception status ', async () => {
    const testBook = {
      ...book,
      status: 'WRONG',
    };
    try {
      await resolvers.Mutation.updateBook(null, { _id: idBook, book: testBook });
    } catch (e) {
      expect(e.message).toBe('Error: Invalid status');
    }
  });
});

describe('When update and delete book with correct inputs', () => {
  test('Update a book', async () => {
    let data = await resolvers.Mutation.updateBook(null, { _id: idBook, book: book });
    expect(bookUpdate).toEqual(data);
  });

  test('Delete a book', async () => {
    let data = await resolvers.Mutation.deleteBook(null, { _id: idBook });
    expect(bookUpdate).toEqual(data);
  });
});