import {Field, InputType} from "type-graphql";

@InputType()
export class MovieInput {
  @Field({ nullable: true })
  id: number

  @Field()
  description: string

  @Field()
  imgUrl: string

  @Field()
  title: string

  @Field()
  length: string

  @Field()
  releaseYear: string
}
