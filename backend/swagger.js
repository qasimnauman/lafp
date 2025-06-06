import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: `localhost:${process.env.PORT || 5000}`, // Just host:port, no protocol
  basePath: '/api/v1',
  schemes: ['http'], // optional: ['http', 'https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/*.js']; // or ['./routes/*.js']

const generateSwagger = async () => {
  try {
    await swaggerAutogen()(outputFile, endpointsFiles, doc);
    console.log('Swagger file generated successfully!');
  } catch (error) {
    console.error('Error generating swagger:', error);
  }
};

generateSwagger();
