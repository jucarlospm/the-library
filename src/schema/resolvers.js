import logger from '@condor-labs/logger';
import BookRepository from '../repositories/BookRepository';
import { checkBook, checkBookTitle } from '../filters/bookFilter';

const bookRepository = new BookRepository();

export const resolvers = {
  Query: {
    Books: async (_, { query = null, offset = 0, limit = 10 }) => {
      try {
        const items = await bookRepository.findBooks(query, offset, limit);
        const size = await bookRepository.count();

        return {
          offset: offset,
          limit: limit,
          size: size,
          items: items,
        };
      } catch (error) {
        logger.err(error);
        throw new Error(error);
      }
    },
    BookById: async (_, { _id }) => {
      const results = await bookRepository.getCacheData(_id);
      if (results[0] == null) {
        const book = await bookRepository.findById(_id);
        await bookRepository.setCacheData(_id, book);
        return book;
      } else {
        return JSON.parse(results);
      }
    },
  },
  Mutation: {
    createBook: async (_, { book }) => {
      try {
        book = checkBook(book);
        const findBook = await bookRepository.find({ title: { $regex : new RegExp(book.title, "i") } });
        if (findBook.length > 0) {
          throw new Error('This title already exists in the library');
        }
        return await bookRepository.create(book);
      } catch (error) {
        throw new Error(error);
      }
    },
    updateBook: async (_, { _id, book }) => {
      try {
        book = checkBook(book);
        let findBook = await bookRepository.find({ title: { $regex : new RegExp(book.title, "i") } });
        if (findBook.length > 0) {
          throw new Error('This title already exists in the library');
        }

        findBook = await bookRepository.findById(_id);
        if (findBook === null) {
          throw new Error('This book does not exist in the library');
        }

        await bookRepository.deleteCacheData(_id);
        return await bookRepository.update(_id, book);
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteBook: async (_, { _id }) => {
      try {
        await bookRepository.deleteCacheData(_id);
        return bookRepository.delete(_id);
      } catch (error) {
        logger.err(error);
        throw new Error(error);
      }
    },
  },
};
