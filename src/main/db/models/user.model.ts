import {BaseModel} from "./baseModel";
import {User} from "../entitites/User";

export class UserModel extends BaseModel {
  constructor() {
    super(User);
  }

  public async save(userInput: any) {
    if(!userInput.id) {
      return this.create(userInput)
    }
    return this.update(userInput)
  }
}
