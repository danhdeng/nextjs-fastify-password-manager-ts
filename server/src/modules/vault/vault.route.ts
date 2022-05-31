import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { updateVaultHandler } from "./vault.controller";

export default function vaultRoutes(
     app: FastifyInstance,
     _: FastifyPluginOptions,
    done: (err?: FastifyError) => void
) {
    app.put(
        "/",
        {
            onRequest:[app.authenticate]
        }, 
        updateVaultHandler);
    done();
}
