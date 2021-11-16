//DONE
import * as express from 'express';
import pizzaRouter from './pizza';

const router = express.Router();

router.use('/pizza', pizzaRouter)

export default router;
