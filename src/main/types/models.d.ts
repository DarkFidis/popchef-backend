export interface BaseModelable {
  readonly model: any

  getModel(entity: any): any
  getAll(): Promise<any>
  getById(id: number): Promise<any>
  create(input: any): Promise<any>
}

export interface MovieModelable extends BaseModelable {
  save(movieInput: any): Promise<any>
}
