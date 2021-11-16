

import * as jwt from 'jsonwebtoken';
import {jwt_stuffs} from '../config'



// Q: Do we need this function now?  A: not with passport!

export const create_token = (payload: {[key:string]: string | number }) => {
    const token = jwt.sign(payload, jwt_stuffs.signature, {expiresIn: jwt_stuffs.expiration})
    return token;
}

export const verify_token = (token: string)=> {
    const is_valid = jwt.verify(token, jwt_stuffs.signature);
    return is_valid;
}

// : Do we need this function now?
export const decoded_token = (token: string)=> {
    const decoded = jwt.decode(token);
    return decoded;
}