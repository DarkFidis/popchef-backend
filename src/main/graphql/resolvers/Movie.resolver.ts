import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Movie} from "../../db/entitites/Movie";
import {NotFoundError} from "../../errors/not-found-error";
import {movieModel} from "../../db/models";
import {InternalError} from "../../errors/internal-error";
import {BadRequestError} from "../../errors/bad-request-error";
import {MovieInput} from "../schema/Movie.schema";

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies() {
    const authors = await movieModel.getAll()
    if (!authors.length) {
      throw new NotFoundError('No movies in database')
    }
    return authors
  }

  @Query(() => Movie)
  async getMovieById(
    @Arg('id') id: number
  ) {
    const movie = await movieModel.getById(id)
    if (!movie) {
      throw new NotFoundError('Movie not found')
    }
    return movie
  }

  @Mutation(() => Movie)
  async importMovie(
    @Arg('input')
      {
        description,
        id,
        title,
        imgUrl,
        length,
        releaseYear
      }: MovieInput,
  ) {
    let movie: Movie
    try {
      movie = await movieModel.save({ description, id, imgUrl, length, releaseYear, title})
    } catch(err) {
      throw new InternalError(err.message)
    }
    return movie
  }

  @Mutation(() => Movie)
  async deleteMovie(
    @Arg('movieId') id: number
  ) {
    const movie = await movieModel.getById(id)
    if (!movie) {
      throw new BadRequestError('The movie you try to delete does not exists')
    }
    try {
      await movieModel.deleteById(id)
    } catch (err) {
      throw new InternalError('Error while deleting movie')
    }
    if (!movie) {
      throw new BadRequestError('The movie you try to delete does not exists')
    }
    return movie
  }
}
