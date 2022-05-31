import crypto from 'crypto';
import { UserModel } from './user.model';
import argon2 from 'argon2';

//generate the salt
export function generateSalt(){
    return crypto.randomBytes(64).toString("hex");
}

//create a new user 
export async function createUser(
    input:{
        hashedPassword: string;
        email: string;
    }
){
    return UserModel.create({email: input.email, password: input.hashedPassword});
    
}

//hash the password using argon2
async function getHashPassword(password: string){
    return argon2.hash(password);
}


export async function findUserByEmailAndPassword({
    email,
    hashedPassword
}:{
    email: string; 
    hashedPassword: string;
}){
    const user = UserModel.findOne({email});

    const hash = await getHashPassword(hashedPassword);

    if(!user || !argon2.verify(user.password, hash)){
        return null;
    }
    return user;
}