import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.sql_stuffs)

export const Query = <T = any>(query:string, values?:any)=> {

    return new Promise<T>((resolve, reject)=>{
        pool.query(query, values, (err, results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    });
}

