import { DataSource } from 'typeorm'
import { TimeEntry } from './entity/TimeEntry'
import * as dotenv from 'dotenv'

dotenv.config()

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ilumeo',
  entities: [TimeEntry],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  migrations: ['src/migration/*.ts'],
  migrationsRun: process.env.NODE_ENV !== 'production'
})

export default dataSource