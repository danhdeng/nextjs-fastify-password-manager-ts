import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import {registerUserHandler, loginHandler} from "./user.controller"

export default function userRoutes(
    app: FastifyInstance,
_: FastifyPluginOptions,
    done: (err?: FastifyError) => void
) {
    app.post("/", registerUserHandler);
    app.post("/login", loginHandler);
    done();
}
