import {DataSourceOptions} from "typeorm";
import {PgClient} from "./services/pg-client";
import {log} from "./log";

const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['main/db/entities/*.js'],
  logging: true,
  synchronize: true,
}

export const pgClient = new PgClient(log, dbConfig)
