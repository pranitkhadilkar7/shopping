import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'shopping',
  username: 'postgres',
  password: 'password',
  entities: [],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
