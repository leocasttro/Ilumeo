import { Request, Response } from 'express'
import { TimeEntryService } from '../service/TimeEntryService'
import { TimeEntryRepository } from '../repository/TimeEntryRepository'

const timeEntryService = new TimeEntryService(new TimeEntryRepository())

export class TimeEntryController {
  async createEntry(req: Request, res: Response): Promise<void> {
    try {

      const { code, type } = req.body
      if (typeof code !== 'string' || code.length === 0) {
        res.status(400).json({ message: 'Código não pode ficar vazio' })
        return
      }

      if (!['entry', 'exit'].includes(type)) {
        res.status(400).json({ message: 'Tipo deve ser "entry" ou "exit"' })
        return
      }
      
      const timeEntry = await timeEntryService.createEntry(code, type)
      res.status(201).json(timeEntry)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno ao processar a requisição'
      res.status(400).json({ message })
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
      try {
        const { code } = req.query;

        if (!code || typeof code !== 'string') {
          res.status(400).json({ message: 'Código é obrigatório e deve ser uma string' });
          return;
        }

        const entries = await timeEntryService.getAll(code);
        res.status(200).json(entries);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro interno ao buscar entradas';
        console.error('Erro no controller:', error);
        res.status(500).json({ message });
      }
    }
}