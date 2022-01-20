export const checkBook = (book) => {
  if (!book.title) {
    throw new Error('Title is required');
  }

  if (!book.author) {
    throw new Error('Title is required');
  }

  if (book.pages <= 0) {
    throw new Error('Invalid number of pages');
  }

  if (!book.status) {
    book.status = 'AVAILABLE';
  }

  return book;
};
