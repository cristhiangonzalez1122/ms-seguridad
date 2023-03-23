import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {Rolmenu} from './rolmenu.model';

@model()
export class Menu extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  description: string;

  @hasMany(() => Rol, {through: {model: () => Rolmenu}})
  roles: Rol[];

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
