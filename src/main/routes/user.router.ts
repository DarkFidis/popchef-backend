import express from "express";

import { toExpressMw } from '../utils/helper'
import { getAllUsersMw } from '../middlewares/user'

const userRouter = express.Router()

userRouter.get('/', toExpressMw(getAllUsersMw))

export { userRouter }
