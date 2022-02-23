import { environment } from './src/environments/environment'

export default {
  type: 'postgresql',
  entities: ['./src/entities', '../../libs/api/src/lib/entities'],
  entitiesTs: ['./src/entities', '../../libs/api/src/lib/entities'],
  ...environment.database,
}
