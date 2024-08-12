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
    components: {
      schemas: {
        "error-response" : {
          description: "Generic error message",
          example: {"message": "internal server error", "error_code": 500},
          type: 'object',
          properties: {
            message: {
              type: "string",
              example: "Sample error message",
            },
            error_code: {
              type :"integer",
              example: 500
            }
          }
        }
      }
    },
  },
  apis: ['./src/Routes/*/*.yaml'], // files containing annotations as above
};
export const openapiSpecification = swaggerJsdoc(options);