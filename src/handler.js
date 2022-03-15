const { nanoid } = require('nanoid');
const books = require('./books');

const booksHandler = {
  postBookHandler: ({ payload }, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = payload;

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    const bookId = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();

    books.push({
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt: insertedAt,
    });

    if (books.filter((book) => book.id === bookId).length > 0) {
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId,
        },
      }).code(201);
    }

    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    }).code(500);
  },

  getBooksHandler: ({ query }) => {
    const { name, reading, finished } = query;

    const book = [];

    // query nama
    if (name) {
      const queryNameLower = name.toLowerCase();
      books.forEach((x) => {
        const bookNameLower = x.name.toLowerCase();
        if (bookNameLower.includes(queryNameLower)) {
          book.push({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          });
        }
      });

      return {
        status: 'success',
        data: {
          books: book,
        },
      };
    }

    // query reading
    if (reading) {
      books.forEach((x) => {
        if (x.reading === Boolean(reading)) {
          book.push({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          });
        }
      });

      return {
        status: 'success',
        data: {
          books: book,
        },
      };
    }

    // query finished
    if (finished) {
      books.forEach((x) => {
        if (x.finished === Boolean(Number(finished))) {
          book.push({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          });
        }
      });
      return {
        status: 'success',
        data: {
          books: book,
        },
      };
    }

    // tidak ada query
    books.forEach((x) => {
      book.push({
        id: x.id,
        name: x.name,
        publisher: x.publisher,
      });
    });

    return {
      status: 'success',
      data: {
        books: book,
      },
    };
  },

  getBookByIdHandler: ({ params }, h) => {
    const { bookId } = params;
    const book = books.filter((i) => i.id === bookId)[0];

    if (book) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }

    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  },

  putBookByIdHandler: ({ params, payload }, h) => {
    const { bookId } = params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = payload;
    const bookIndex = books.findIndex((i) => i.id === bookId);
    const newUpdatedAt = new Date().toISOString();

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    if (bookIndex !== -1) {
      books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt: newUpdatedAt,
      };

      return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
      };
    }

    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  },

  deleteBookByIdHandler: ({ params }, h) => {
    const { bookId } = params;
    const bookIndex = books.findIndex((i) => i.id === bookId);

    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      return {
        status: 'success',
        message: 'Buku berhasil dihapus',
      };
    }

    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  },
};

module.exports = booksHandler;
