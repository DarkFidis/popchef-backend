import { buildSchema } from "type-graphql";
import * as path from 'path'
import {MovieResolver} from "./resolvers/Movie.resolver";

export const createSchema = () => buildSchema({
  resolvers: [MovieResolver],
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  validate: false
})
