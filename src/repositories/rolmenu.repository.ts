import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Rolmenu, RolmenuRelations} from '../models';

export class RolmenuRepository extends DefaultCrudRepository<
  Rolmenu,
  typeof Rolmenu.prototype._id,
  RolmenuRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Rolmenu, dataSource);
  }
}
