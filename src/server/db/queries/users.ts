import { Query } from '../index';
import { Users } from '../../types';
import { MysqlResponse, UsersTable } from '../models';

const find = (column: string, value: string) =>
    Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [column, value])


const insert = (newUser: { email: string, password: string }) =>
    Query<MysqlResponse>('INSERT INTO users SET ?', [newUser]);


const register = (newUser: Users) => Query("INSERT INTO users SET ?", [newUser]);


const getUserBy = (column_name: string, value: string | number) => 
    Query<Users[]>("SELECT * FROM users WHERE ??=?", [column_name, value])

export default {
    find,
    insert,
    register,
    getUserBy
}