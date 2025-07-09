import { Repository, IsNull } from 'typeorm'
import { AppDataSource } from '../config/database'
import { TimeEntry } from '../entity/TimeEntry'

export class TimeEntryRepository {
  private repository: Repository<TimeEntry> = AppDataSource.getRepository(TimeEntry)

  async findByCode(code: string): Promise<TimeEntry | null> {
    const entry = await this.repository.findOne({
      where: { code, endTime: IsNull() }
    })
    return entry
  }

  async save(timeEntry: TimeEntry): Promise<TimeEntry> {
    return this.repository.save(timeEntry)
  }

  async findAllByCode(code: string): Promise<TimeEntry[]> {
    try {
      console.log(`Buscando entradas para o código: ${code}`);
      const entries = await this.repository.createQueryBuilder('t')
        .where('LOWER(t.code) = LOWER(:code)', { code })
        .orderBy('t.startTime', 'ASC')
        .getMany();
      console.log('Resultado da consulta:', entries);
      return entries;
    } catch (error) {
      console.error('Erro ao buscar entradas:', error);
      throw new Error('Falha ao buscar entradas de tempo');
    }
  }
}
