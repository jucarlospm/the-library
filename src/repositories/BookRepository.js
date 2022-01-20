import mongo from '../helpers/mongoHelper';
import redis from '../helpers/redisHelper';
import Book from '../Models/Book';

module.exports = class BookRepository {
  constructor() {
    this.mongo = mongo;
    this.redis = redis;
    this.Book = Book;
    this.mongo.connect();
    this.redis.connect();
  }

  async find(query = null) {
    try {
      return await this.Book.find(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    try {
      return await this.Book.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBooks(query = null, offset = 0, limit = 10) {
    try {
      return await this.Book.find(query).skip(offset).limit(parseInt(limit));
    } catch (error) {
      throw new Error(error);
    }
  }

  async count() {
    try {
      return await this.Book.countDocuments({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data) {
    const newBook = new this.Book(data);
    await newBook.save();
    return newBook;
  }

  async update(id, data) {
    return this.Book.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.Book.findByIdAndDelete(id);
  }

  async getCacheData(key) {
    try {
      return await this.redis.getCacheData(`book:${key}`);
    } catch (error) {
      throw new Error(error);
    } finally {
      await this.redis.quit();
    }
  }

  async setCacheData(key, data) {
    try {
      await this.redis.setCacheData(`book:${key}`, data);
    } catch (error) {
      throw new Error(error);
    } finally {
      await this.redis.quit();
    }
  }

  async deleteCacheData(key) {
    try {
      await this.redis.deleteCacheData(`book:${key}`);
    } catch (error) {
      throw new Error(error);
    } finally {
      await this.redis.quit();
    }
  }
};
