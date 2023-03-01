import express, { json, Router } from "express"
import cors from 'cors';
import 'express-async-errors';
import { handleError } from "./utils/errors";
import "./utils/db";
import rateLimit from 'express-rate-limit'
import { adRouter } from "./routers/ad.router";
import { config } from "./config/config";

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
const router = Router();

router.use('/ad', adRouter);

app.use(config.prefixPath, router);

app.use(handleError);

const port = 3001;
app.listen(port, '0.0.0.0', () => {  
    console.log(`Server is listening at http://localhost:${port}`); 
});
