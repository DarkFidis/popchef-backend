import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  description: string

  @Column()
  @Field()
  length: string

  @Column()
  @Field()
  releaseYear: string

  @Column()
  @Field()
  imgUrl: string
}
