import crypto from 'crypto';
import { UserModel } from './user.model';
import argon2 from 'argon2';
import { logger } from '../../utils/logger';

//generate the salt
export function generateSalt(){
    return crypto.randomBytes(64).toString("hex");
}

//create a new user 
export async function createUser(
    input:{
        password: string;
        email: string;
    }
){
    return UserModel.create({email: input.email, password: input.password});
    
}

//hash the password using argon2
async function getHashPassword(password: string){
    return argon2.hash(password);
}


export async function findUserByEmailAndPassword({
    email,
    password
}:{
    email: string; 
    password: string;
}){
    const user =await UserModel.findOne({email});
    logger.info(user);
    const hash = await getHashPassword(password);

    if(!user || !argon2.verify(user.password, hash)){
        return null;
    }
    return user;
}