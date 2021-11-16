import * as passport from 'passport';
import * as PassportJWT from 'passport-jwt';
import * as LocalStrategy from "passport-local";
import * as bcrypt from "bcrypt";
import { Application } from 'express';
import { Payload, Users } from "../types";
import db_users from "../db/queries/users";
import config from "../config";

export function configurePassport(app: Application) {

    // put strategies in function

    passport.serializeUser((user: Users, done) => {

        if (user?.password) delete user.password;
        done(null, user);

    });

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    // clarification on mw application between local strat and passportJWT strat?
    // local = email and pw (infrequent)
    //jwt = the major auth process

    passport.use(
        new LocalStrategy.Strategy({

            usernameField: "email"

        },
            async (email, password, done) => {

                //add authentication input validation


                try {

                    if (!email || !password) return done("Missing one or more fields", false);

                    const [user] = await db_users.getUserBy('email', email);

                    if (!user) return done({ message: "Invalid credentials" }, false);

                    const is_match = await bcrypt.compare(password, user?.password);

                    if (!is_match) {
                        done({ message: "Invalid credentials" }, false);

                    } else {
                        delete user.password; // Q: clarify process rationale...deleting pw twice? also above for extra safety?
                        done(null, user);
                    }
                } catch (error) {
                    console.log(error);
                    done(error, false);
                }


            })

    );


    passport.use(new PassportJWT.Strategy({

        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_stuffs.secret

    }, (payload: Payload, done) => {

        try {
            done(null, payload);
        } catch (error) {
            done(error)

        }
    }))






    app.use(passport.initialize())
}

