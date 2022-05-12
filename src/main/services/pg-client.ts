import { staticImplements } from "../utils/helper";

import { ServiceBase } from "./service-base";
import { Logger } from "winston";
import {PgClientable, StaticPgClientable} from "../types/pg";
import {DataSource, DataSourceOptions, EntityTarget} from "typeorm";

@staticImplements<StaticPgClientable>()
export class PgClient extends ServiceBase<DataSourceOptions> implements PgClientable {
  protected _connection: DataSource

  constructor(log: Logger, config: DataSourceOptions) {
    super('pg-client', log, config)
    this._connection = new DataSource(this.config)
  }

  public get connection() {
    return this._connection
  }

  public async run() {
    try {
      await this._connection.initialize()
      this._log.info('Connected to database')
    } catch (err) {
      this._log.error(err)
      return false
    }
    return true
  }

  public async end() {
    try {
      await this._connection.destroy()
      this._log.info('Disconnected from database')
    } catch (err) {
      this._log.error(err)
      return false
    }
    return true
  }

  public getModel<T>(entity: EntityTarget<T>) {
    return this._connection.getRepository(entity)
  }
}
