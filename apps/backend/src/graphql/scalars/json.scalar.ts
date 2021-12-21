import { Scalar, CustomScalar } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@Scalar('JSON', () => Object)
export class JsonScalar
  implements CustomScalar<string, Record<string, unknown>>
{
  name = GraphQLJSON.name;
  description = GraphQLJSON.description;

  serialize = GraphQLJSON.serialize;
  parseValue = GraphQLJSON.parseValue;
  parseLiteral = GraphQLJSON.parseLiteral;
}
