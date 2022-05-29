# server app setup 
------------------------------------------------------------------------------------------------------------------------
# create a src folder and certs folder
mkdir src certs

# initialize a package.json file
pnpm init

# add typescript library

pnpm add typescript

# create a tsconfig.json file
npx tsc --init

# add requried packages

pnpm add fastify pino mongoose @typegoose/typegoose argon2 zod fastify-zod @fastify/jwt crypto-js @fastify/cors @fastify/cookie lodash

# add devdependencies packages

pnpm add  ts-node-dev pino-pretty @types/crypto-js @types/lodash -D

_________________________________________________________________________________________________________________________


# Client app setup
-------------------------------------------------------------------------------------------------------------------------
# create a nextjs app
pnpm create next-app client -- --ts

# add requried packages
pnpm add  @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 crypto-js react-query axios react-hook-form

# add devdependencies packages
pnpm add @types/crypto-js -D


