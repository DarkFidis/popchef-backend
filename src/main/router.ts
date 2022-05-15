import {
  json as jsonBodyParserFactory,
  raw as rawBodyParserFactory,
  urlencoded as urlencodedBodyParserFactory,
} from 'body-parser'
import cookieParserFactory from 'cookie-parser'
import corsFactory from 'cors'

import { helloWorldMw } from './middlewares/hello-world'
import { RegisterApp } from './types/web-server'
import { toExpressMw } from './utils/helper'
import {userRouter} from "./routes/user.router";

const jsonBodyParserMw = jsonBodyParserFactory()
const urlencodedBodyParserMw = urlencodedBodyParserFactory({ extended: false })
const rawBodyParserMw = rawBodyParserFactory({ limit: '10mb', type: '*/*' })
const cookieParserMw = cookieParserFactory()
const corsMw = corsFactory({ origin: ['http://localhost:4000']})

export const registerApp: RegisterApp = (app) => {
  app.use(cookieParserMw, jsonBodyParserMw, urlencodedBodyParserMw, rawBodyParserMw, corsMw)
  app.use('/api/users', userRouter)
  app.get('/hello', toExpressMw(helloWorldMw))
}
