//Global.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from '../Swagger.js';
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

const key = process.env.KEY_PATH || fs.readFileSync('etc/secrets/private.key', 'utf8');

const bearerToken = jwt.sign(claim, key, { algorithm: 'RS256' });
const userInfo = await conn.authorize({
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  assertion: bearerToken
});

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/', (req, res) => { res.redirect('/docs'); });

import setBaseResponse from './Middlewares/BaseResponse.js';
app.use(setBaseResponse);

import Profile from './Routes/01_Profile/Profile.js';
app.use(BASE_PATH, Profile);

import Education from './Routes/02_Education/Education.js';
app.use(BASE_PATH, Education);

import Projects from './Routes/03_Projects/Projects.js';
app.use(BASE_PATH, Projects);


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('App listening at http://localhost:' + port);
}
);