import { buildSchema } from "type-graphql";
import * as path from 'path'

export const createSchema = () => buildSchema({
  resolvers: [],
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  validate: false
})
