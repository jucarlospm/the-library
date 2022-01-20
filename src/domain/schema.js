import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = `
  enum Status {
    LENT
    AVAILABLE
    UNAVAILABLE
  }
  type Book {
    _id: ID,
    title: String!,
    author: String!,
    pages: Int!,
    status: Status!
  }
  input BookQuery {
    _id: ID,
    title: String,
    author: String,
    pages: Int,
    status: Status
  }
  input BookCreate {
    title: String!,
    author: String!,
    pages: Int!,
    status: Status
  }
  type paginationBook {
    offset: Int!,
    limit: Int!,
    size: Int!,
    items: [Book]
  }
  type Mutation {
    createBook(book: BookCreate): Book,
    updateBook(_id: ID, book: BookCreate): Book,
    deleteBook(_id: ID): Book
  }
  type Query {
    Books(query: BookQuery, offset: Int, limit: Int): paginationBook,
    BookById(_id: ID): Book
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
