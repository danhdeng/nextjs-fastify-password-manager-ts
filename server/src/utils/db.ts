import mongoose from "mongoose";

import {DB_CONNECTION_STRING} from "../constants";

import {logger} from "./logger";

export async function connectToDb(){
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
    } catch (error) {
        logger.error(error, "Error connecting to database");
        process.exit(1);
    }
}

export async function disconnectFromDb(){
    await mongoose.connection.close();
    logger.info("Disconnecting from database");
    return;
}

export default {connectToDb, disconnectFromDb}
