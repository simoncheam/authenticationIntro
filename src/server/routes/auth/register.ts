// DONE
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import db_users from '../../db/queries/users';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; //! add import to notes

const router = Router();

router.post('/', async (req, res) => {

    const newUser = req.body;

    try {
        //create new hash
        newUser.password = generateHash(newUser.password);

        //insert registered user into db
        const result = await db_users.insert(newUser);
        result.insertId;

        //create new TOKEN
        const token = jwt.sign(

            { userid: result.insertId, email: newUser.email },
            config.jwt_stuffs.secret,
            { expiresIn: config.jwt_stuffs.expiration }
        );

        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error occurred' })
    }
})

export default router;