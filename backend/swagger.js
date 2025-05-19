import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: `localhost:${process.env.PORT || 5000}`,
  basePath: '/api/v1'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);

export { doc, outputFile, routes };