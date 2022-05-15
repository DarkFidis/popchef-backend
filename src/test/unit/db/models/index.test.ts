import {when} from "jest-when";

describe('Models index', () => {
  let UserModel
  beforeAll(() => {
    jest.mock('../../../../main/db/models/user.model')
    ;({ UserModel } = require('../../../../main/db/models/user.model'))
  })
  test('Should export all models', () => {
    // When
    const userModelMock = jest.fn()
    when(UserModel).calledWith().mockReturnValue(userModelMock)
    const result = require('../../../../main/db/models')
    // Then
    expect(result).toEqual({ userModel: userModelMock })
  })
})
