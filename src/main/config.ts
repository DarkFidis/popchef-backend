import { resolve } from 'path'

process.env.NODE_CONFIG_DIR = resolve(__dirname, '..', '..', 'config')

import nodeConfig from 'config'

import { version } from '../../package.json'
import { Config } from './types/config'

const env = process.env.NODE_CONFIG_ENV || process.env.NODE_ENV || 'development'
const log = nodeConfig.has('log') ? nodeConfig.get<Config['log']>('log') : { level: 'info' }
const server = nodeConfig.has('server')
  ? nodeConfig.get<Config['server']>('server')
  : { listen: {} }

export const config: Config = {
  env,
  log,
  name: 'popchef-test',
  server,
  version,
}
