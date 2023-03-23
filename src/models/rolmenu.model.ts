import {Entity, model, property} from '@loopback/repository';

@model()
export class Rolmenu extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  save: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  edit: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  list: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  delete: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  download: boolean;


  constructor(data?: Partial<Rolmenu>) {
    super(data);
  }
}

export interface RolmenuRelations {
  // describe navigational properties here
}

export type RolmenuWithRelations = Rolmenu & RolmenuRelations;
