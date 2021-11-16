//DONE
import {Router} from 'express';
import { ReqUser } from '../../types';

// ! we want to import token check middleware here
import {tokenCheck} from '../../middlewares/tokenCheck.mw'

const router = Router();

// tokenCheck middleware added to API endpoints, in this case it's a get request
router.get('/',tokenCheck, (req: ReqUser, res)=>{ 
    try {
     
    // authorized user will get access to free pizza
    res.json({message: `Pizza Time!🍕 Congrats! Your free pizza will be sent to ${req.user.email}`})

    } catch (error) {
        res.status(500).json({message: 'Error'})
    }
});


export default router;