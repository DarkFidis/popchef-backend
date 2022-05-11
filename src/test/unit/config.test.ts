import { IConfig } from 'config'
import { resolve } from 'path'

describe('config unit tests', () => {
  const envVarNames = [
    'BASE_URL',
    'LOG_LEVEL',
    'NODE_CONFIG_ENV',
    'NODE_ENV',
    'PORT',
    'REDIS_HOST',
    'REDIS_PORT',
  ]
  const envMapOrig: {
    [key: string]: string | undefined
  } = {}
  beforeAll(() => {
    envVarNames.forEach((name) => {
      envMapOrig[name] = process.env[name]
    })
  })
  beforeEach(() => {
    envVarNames.forEach((name) => {
      delete process.env[name]
    })
    jest.doMock('../../../package.json', () =>
      Object.assign({}, jest.requireActual('../../../package.json'), {
        version: '0.0.1-fakeversion',
      }),
    )
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    envVarNames.forEach((name) => {
      envMapOrig[name] = process.env[name]
    })
  })
  describe('custom env vars', () => {
    test.each([
      [undefined, undefined, undefined, undefined, undefined],
      ['http://mybaseurl', undefined, undefined, undefined, undefined],
      ['http://mybaseurl', 3333, undefined, undefined, undefined],
      ['http://mybaseurl', 3333, 'debug', undefined, undefined],
      ['http://mybaseurl', 3333, 'debug', 'redisHost', undefined],
      ['http://mybaseurl', 3333, 'debug', 'redisHost', 6379],
    ])(
      'should return custom config given BASE_URL=%p, PORT=%p, LOG_LEVEL=%p, REDIS_HOST=%p, REDIS_PORT=%p',
      (
        baseUrl?: string,
        port?: number,
        logLevel?: string,
        redisHost?: string,
        redisPort?: number,
      ) => {
        // Given
        if (baseUrl) {
          process.env.BASE_URL = baseUrl
        }
        if (port) {
          process.env.PORT = `${port}`
        }
        if (logLevel) {
          process.env.LOG_LEVEL = logLevel
        }
        if (redisHost) {
          process.env.REDIS_HOST = redisHost
        }
        if (redisPort) {
          process.env.REDIS_PORT = `${redisPort}`
        }
        // When
        const config = require('../../main/config')
        // Then
        expect(config).toMatchSnapshot()
      },
    )
  })
  describe('hacked config', () => {
    let nodeConfig: jest.Mocked<IConfig>
    beforeAll(() => {
      jest.resetModules()
      jest.doMock('config')
      nodeConfig = require('config')
    })
    test('should return config with defaults given no config is provided for log, server', () => {
      // Given
      nodeConfig.has.mockReturnValue(false)
      // When
      const { config } = require('../../main/config')
      // Then
      expect(config).toHaveProperty('server')
      expect(config).toMatchSnapshot()
    })
  })
  describe('NODE_CONFIG_DIR', () => {
    test('should set NODE_CONFIG_DIR env var to /config from project base dir', () => {
      // Given
      const baseDir = resolve(__dirname, '..', '..', '..')
      // When
      require('../../main/config')
      // Then
      expect(process.env).toHaveProperty('NODE_CONFIG_DIR', resolve(baseDir, 'config'))
    })
  })
})
