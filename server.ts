import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './app-config';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';



const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS - restrict to frontend origin specified in environment variable
app.use(cors({ origin: config.corsOrigin, credentials: true }));

// health check route
app.get('/', (req, res) => res.json({ message: 'API is running' }));

app.use('/accounts', accountsController);

app.use('/api-docs', swaggerDocs);

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));