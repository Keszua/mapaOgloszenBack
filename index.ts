import express, { json } from "express"
import cors from 'cors';
import 'express-async-errors';
import { handleError, ValidationError } from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());


// Routes...
app.get('/', (req, res) => {
    throw new ValidationError('Dadam!');
});

app.use(handleError);

const port = 3001;
app.listen(port, '0.0.0.0', () => {  
    console.log(`Server is listening at http://localhost:${port}`); 
});
