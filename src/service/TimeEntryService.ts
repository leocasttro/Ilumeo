import { TimeEntryRepository } from '../repository/TimeEntryRepository'
import { TimeEntry } from '../entity/TimeEntry'

export class TimeEntryService {
  constructor(private timeEntryRepository: TimeEntryRepository) {}

  async createEntry(code: string, type: 'entry' | 'exit'): Promise<TimeEntry> {
    const existingEntry = await this.timeEntryRepository.findByCode(code)

    if (type === 'entry') {
      if (existingEntry) {
        console.warn('Entrada em aberto encontrada:', existingEntry)
        throw new Error('Já existe uma entrada em aberto para este código')
      }
      const timeEntry = new TimeEntry()
      timeEntry.code = code
      timeEntry.startTime = new Date()
      timeEntry.type = type
      return this.timeEntryRepository.save(timeEntry)
    }

    if (type === 'exit') {
      if (!existingEntry) {
        console.warn('Nenhuma entrada encontrada para código:', code)
        throw new Error('Nenhuma entrada em aberto para este código')
      }
      existingEntry.endTime = new Date()
      existingEntry.type = type
      return this.timeEntryRepository.save(existingEntry)
    }

    throw new Error('Tipo inválido')
  }

  async getAll(code: string): Promise<TimeEntry[]> {
    const registers = await this.timeEntryRepository.findAllByCode(code)
    console.log(registers)
    return registers
  }
}