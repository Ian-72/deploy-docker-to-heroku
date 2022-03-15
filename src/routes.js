const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: handler.postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.putBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBookByIdHandler,
  },
];

module.exports = routes;
