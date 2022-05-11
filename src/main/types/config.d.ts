import { LoggerConfig } from './logger'

export interface Config {
  env: string
  log: LoggerConfig
  name: string
  version: string
  server: any
}
