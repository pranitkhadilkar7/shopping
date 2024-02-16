import { dataSourceOptions } from '../../data-source/typeorm.dev.config'

export const databaseConfig = () => {
  if (process.env.NODE_ENV === 'dev') {
    return dataSourceOptions
  }
  return {}
}
