//Global.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {openapiSpecification} from '../Swagger.js';
import dotenv from 'dotenv';
import { Connection } from 'jsforce';
import jwt from 'jsonwebtoken';
import fs from 'fs';

dotenv.config();
const BASE_PATH = '/api/v1/';
const app = express();

global.conn = new Connection();

const claim = {
  iss: process.env.ISSUER,
  aud: 'https://login.salesforce.com',
  sub: 'portfolioorg@vishaldas.in',
  exp: Math.floor(Date.now() / 1000) + 3 * 60
};

const key = fs.readFileSync('etc/secrets/private.key', 'utf8');

const bearerToken = jwt.sign(claim, key, { algorithm: 'RS256'});
const userInfo = await conn.authorize({
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  assertion: bearerToken
});

app.use(express.json());

import setBaseResponse from './Middlewares/BaseResponse.js';
app.use(setBaseResponse);

import Profile from './Routes/Profile/Profile.js';
app.use(BASE_PATH, Profile);

app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const port = process.env.PORT || 3000
app.listen(port, () => 
    {
        console.log('App listening at http://localhost:' + port);
    }
);