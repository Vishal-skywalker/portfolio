import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDescription =
  "**Tech Stack**:\n" +
  "- **Node.js & Express**: Server-side JavaScript with Express for routing and middleware.\n" +
  "- **SOQL**: Database queries using Salesforce's SOQL.\n" +
  "- **JsForce**: Integration with Salesforce for data retrieval.\n" +
  "- **JavaScript (ES6+)**: Modern JS features like async/await.\n\n" +
  "**Required Skills**:\n" +
  "- **JavaScript & ES6+**: Proficient in modern JavaScript syntax.\n" +
  "- **Node.js & Express**: Experience with server-side development and RESTful API design.\n" +
  "- **Salesforce & SOQL**: Familiarity with Salesforce data models and querying.\n" +
  "- **Error Handling**: Ability to implement robust error handling.\n\n" +
  "This combination of technologies and skills enables the development of scalable, high-performance APIs that integrate seamlessly with Salesforce and other backend systems.";

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
      description: swaggerDescription
    },
    components: {
      schemas: {
        "error-response": {
          description: "Generic error message",
          example: { "message": "internal server error", "error_code": 500 },
          type: 'object',
          properties: {
            message: {
              type: "string",
              example: "Sample error message",
            },
            error_code: {
              type: "integer",
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