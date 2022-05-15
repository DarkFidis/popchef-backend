import {Request, Response} from "express";
import {userModel} from "../db/models";

const userMw = {
  getAllUsersMw: async (_: Request, res: Response) => {
    const users = await userModel.getAll()
    res.json(users)
  }
}

export = userMw

