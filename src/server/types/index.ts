import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {UsersTable} from '../db/models';

export interface ReqUser extends Request {

    user?: UsersTable | JwtPayload;
}

export interface Payload extends UsersTable {
    userid?: number;
    role?:number;
}


export interface Users {
    id?: number;
    name?: string; 
    email?: string;
    password?: string;
    created_at?: Date;
}