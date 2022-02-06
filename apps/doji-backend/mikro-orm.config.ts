import { environment } from './src/environments/environment'

export default {
  type: 'postgresql',
  entities: ['./src/entities'],
  entitiesTs: ['./src/entities'],
  ...environment.database,
}
