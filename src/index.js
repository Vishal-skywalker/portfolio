
import express from 'express'
import swaggerUi from 'swagger-ui-express';
import {openapiSpecification} from '../Swagger.js';
// import dotenv from 'dotenv'
// dotenv.config()
const BASE_PATH = '/'
const app = express()

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

import setBaseResponse from './Middlewares/BaseResponse.js';
app.use(setBaseResponse);

import Profile from './Routes/Profile.js';
app.use(BASE_PATH, Profile);

const port = process.env.PORT || 3000
app.listen(port, () => 
    {
        console.log('App listening at http://localhost:' + port);
    }
);