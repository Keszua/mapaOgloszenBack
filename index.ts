import express, { json } from "express"
import cors from 'cors';
import 'express-async-errors';
import { handleError, ValidationError } from "./utils/errors";
import "./utils/db";
import rateLimit from 'express-rate-limit'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

app.use(rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

// Routes...
app.get('/', (req, res) => {
    throw new ValidationError('Dadam!');
});

app.use(handleError);

const port = 3001;
app.listen(port, '0.0.0.0', () => {  
    console.log(`Server is listening at http://localhost:${port}`); 
});
