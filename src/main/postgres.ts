import {DataSourceOptions} from "typeorm";
import {PgClient} from "./services/pg-client";
import {log} from "./log";
import {User} from "./db/entitites/User";
import {Movie} from "./db/entitites/Movie";

const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Movie, User],
  logging: true,
  synchronize: true,
}

export const pgClient = new PgClient(log, dbConfig)
