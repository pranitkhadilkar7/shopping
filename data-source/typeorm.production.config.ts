import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'release',
  username: 'postgres',
  password: 'password',
  entities: [],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
})

export default dataSource
