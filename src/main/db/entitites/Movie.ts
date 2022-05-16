import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  length: string

  @Column()
  releaseYear: string

  @Column()
  imgUrl: string
}
