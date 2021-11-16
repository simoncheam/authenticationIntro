//DONE
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import * as passport from 'passport';
import { Router } from 'express';
import { ReqUser } from '../../types';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {

    try {

        const token = jwt.sign(

            { userid: req.user.id, email: req.user.email },
            config.jwt_stuffs.secret,
            { expiresIn: config.jwt_stuffs.expiration }
        );

        res.json(token);
        console.log('success!');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'oh shit!' })
    }
})

export default router;
