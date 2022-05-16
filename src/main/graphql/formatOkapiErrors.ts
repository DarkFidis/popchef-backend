import { ApolloError } from 'apollo-server-express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { ErrorStatusCode } from "../errors/http-error-codes";
import { ArgumentValidationError } from "type-graphql";

export const gqlErrorFormatter = (err: GraphQLError): GraphQLFormattedError<Record<string, any>> => {
  if (!err.originalError) {
    return new Error('Expected an error')
  }
  const errorProperties = err.extensions?.exception
  if(err.originalError instanceof ArgumentValidationError) {
    if(errorProperties) {
      const error = errorProperties.validationErrors[0]
      const { constraints, property } = error
      const key = Object.keys(constraints)[0]
      const errorMessages = constraints[key]
      return new ApolloError(errorMessages, 'BAD_REQUEST', { statusCode : ErrorStatusCode.BAD_REQUEST, property })
    }
  }
  const { message } = err
  const { _code, _statusCode } = errorProperties
  return new ApolloError(message, _code, { statusCode: _statusCode })
}
