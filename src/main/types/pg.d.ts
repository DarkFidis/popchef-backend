import { Serviceable } from "./service";
import { Logger } from "winston";
import {DataSourceOptions, EntityTarget, Repository} from "typeorm";

export interface StaticPgClientable {
  new (log: Logger, config: DataSourceOptions): PgClientable
}

export interface PgClientable extends Serviceable<DataSourceOptions> {
  readonly connection: any
  run(): Promise<boolean>
  end(): Promise<boolean>
  getModel<T>(entity: EntityTarget<T>): Repository<T>
}

export interface PgConfig {
  url: string
}
