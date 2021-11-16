import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';
import * as passport from 'passport';

import {configurePassport} from './middlewares/passport-strats.mw';

const app = express();

configurePassport(app); // !import mw function - TS side effect

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
