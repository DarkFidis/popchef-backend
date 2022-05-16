import {BaseModel} from "./baseModel";
import {Movie} from "../entitites/Movie";
import {MovieModelable} from "../../types/models";

export class MovieModel extends BaseModel implements MovieModelable {
  constructor() {
    super(Movie);
  }

  public async save(movieInput: any) {
    if(!movieInput.id) {
      return this.create(movieInput)
    }
    return this.update(movieInput)
  }
}
