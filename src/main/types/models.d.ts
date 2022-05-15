export interface BaseModelable {
  readonly model: any

  getModel(entity: any): any
}
