const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const booksHandler = require('./handler');

// eslint-disable-next-line no-unused-expressions
(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes(booksHandler));
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
})();
