import {
  json as jsonBodyParserFactory,
  raw as rawBodyParserFactory,
  urlencoded as urlencodedBodyParserFactory,
} from 'body-parser'
import cookieParserFactory from 'cookie-parser'
import corsFactory from 'cors'
import { ApolloServer } from "apollo-server-express";

import { helloWorldMw } from './middlewares/hello-world'
import { RegisterApp } from './types/web-server'
import { toExpressMw } from './utils/helper'
import {userRouter} from "./routes/user.router";
import {gqlErrorFormatter} from "./graphql/formatOkapiErrors";
import {createSchema} from "./graphql/createSchema";

const jsonBodyParserMw = jsonBodyParserFactory()
const urlencodedBodyParserMw = urlencodedBodyParserFactory({ extended: false })
const rawBodyParserMw = rawBodyParserFactory({ limit: '10mb', type: '*/*' })
const cookieParserMw = cookieParserFactory()
const corsMw = corsFactory({ origin: ['http://localhost:4000']})

const registerGqlServer: RegisterApp = async (app) => {
  const schema = await createSchema()
  const apolloServer = new ApolloServer({
    formatError: gqlErrorFormatter,
    schema,
    context: ({ req, res }: any) => ({ req, res })
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({ app })
}

export const registerApp: RegisterApp = async (app) => {
  app.use(cookieParserMw, jsonBodyParserMw, urlencodedBodyParserMw, rawBodyParserMw, corsMw)
  app.use('/api/users', userRouter)
  app.get('/hello', toExpressMw(helloWorldMw))
  await registerGqlServer(app)
}
