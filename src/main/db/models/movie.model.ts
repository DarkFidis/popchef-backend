import {BaseModel} from "./baseModel";
import {Movie} from "../entitites/Movie";

export class MovieModel extends BaseModel {
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
