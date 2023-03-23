import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Rol, RolRelations, Menu, Rolmenu, Usuario} from '../models';
import {RolmenuRepository} from './rolmenu.repository';
import {MenuRepository} from './menu.repository';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly menus: HasManyThroughRepositoryFactory<Menu, typeof Menu.prototype._id,
          Rolmenu,
          typeof Rol.prototype._id
        >;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('RolmenuRepository') protected rolmenuRepositoryGetter: Getter<RolmenuRepository>, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.menus = this.createHasManyThroughRepositoryFactoryFor('menus', menuRepositoryGetter, rolmenuRepositoryGetter,);
    this.registerInclusionResolver('menus', this.menus.inclusionResolver);
  }
}
