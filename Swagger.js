import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio Server API documentaion',
      version: '1.0.0',
      contact: {
        "name": "Vishal Das",
        "url": "http://vishaldas.in",
        "email": "das.vishal8583@gmail.com"
      },
    },
  },
  apis: ['./src/Routes/*.js'], // files containing annotations as above
};
export const openapiSpecification = swaggerJsdoc(options);