import { FastifyInstance } from "fastify";
import { createServer } from "./utils/createServer";
import { connectToDb, disconnectFromDb } from "./utils/db";
import { logger } from "./utils/logger";

function gracefulShutdown(signal:string, app:FastifyInstance){
    process.on(signal, async() =>{
        logger.info(`receving signal: ${signal}`);
        app.close();
        await disconnectFromDb();
        logger.info(`the work is done here`);
        process.exit(0);
    });
}

async function main(){
    const app=createServer();
    try {
        const url = await app.listen(4000, "0.0.0.0");
        logger.info(`Server listening on ${url}`);
        await connectToDb();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }

    const signals=["SIGTERM","SIGINT"];
    for(let i=0; i<signals.length; i++){
        gracefulShutdown(signals[i], app);
    }
}

main();