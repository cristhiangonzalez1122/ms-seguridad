import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Menu, MenuRelations, Rol, Rolmenu} from '../models';
import {RolmenuRepository} from './rolmenu.repository';
import {RolRepository} from './rol.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype._id,
  MenuRelations
> {

  public readonly roles: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype._id,
          Rolmenu,
          typeof Menu.prototype._id
        >;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('RolmenuRepository') protected rolmenuRepositoryGetter: Getter<RolmenuRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Menu, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolRepositoryGetter, rolmenuRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
