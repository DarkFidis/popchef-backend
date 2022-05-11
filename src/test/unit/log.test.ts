import { when } from 'jest-when'
import { Logger } from "winston";

describe('log unit tests', () => {
  let getLogger: jest.Mock
  beforeAll(() => {
    jest.doMock('../../main/utils/logger')
    ;({ getLogger } = require('../../main/utils/logger'))
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })
  test('should create and initialize log', () => {
    // Given
    const log = ({
      init: jest.fn(),
    } as unknown) as jest.Mocked<Logger>
    when(getLogger).calledWith('popchef-test').mockReturnValue(log)
    // When
    const result = require('../../main/log')
    // Then
    expect(getLogger).toHaveBeenCalledWith('popchef-test')
    expect(result).toHaveProperty('log', log)
  })
})
