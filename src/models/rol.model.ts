import {Entity, model, property, hasMany} from '@loopback/repository';
import {Menu} from './menu.model';
import {Rolmenu} from './rolmenu.model';
import {Usuario} from './usuario.model';

@model()
export class Rol extends Entity {
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

  @hasMany(() => Menu, {through: {model: () => Rolmenu}})
  menus: Menu[];

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
