import dataSource from '../ormconfig'

export const AppDataSource = dataSource

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.warn('Erro ao conectar ao banco de dados:', error)
    process.exit(1)
  }
}