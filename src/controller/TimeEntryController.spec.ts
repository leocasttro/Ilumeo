import request from 'supertest';
import { app } from '../index';
import { TimeEntryService } from '../service/TimeEntryService';

jest.mock('../service/TimeEntryService');

describe('Teste de TimeEntryController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Criar registro de ponto', async () => {
    const mockTimeEntry = {
      id: 1,
      code: 'USER123',
      startTime: new Date('2025-07-08T12:00:00Z'),
      type: 'entry',
    };

    (TimeEntryService.prototype.createEntry as jest.Mock).mockResolvedValue(mockTimeEntry);

    const response = await request(app)
      .post('/api/time-entry')
      .send({
        code: 'USER123',
        type: 'entry',
      });

    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.type).toBe('entry');
    expect(TimeEntryService.prototype.createEntry).toHaveBeenCalledWith('USER123', 'entry');
  });

    it('Criar saida de ponto', async () => {
    const mockTimeEntry = {
      id: 1,
      code: 'USER123',
      startTime: new Date('2025-07-08T12:00:00Z'),
      type: 'exit',
    };

    (TimeEntryService.prototype.createEntry as jest.Mock).mockResolvedValue(mockTimeEntry);

    const response = await request(app)
      .post('/api/time-entry')
      .send({
        code: 'USER123',
        type: 'exit',
      });

    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.type).toBe('exit');
    expect(TimeEntryService.prototype.createEntry).toHaveBeenCalledWith('USER123', 'exit');
  });


  it('Teste para a consulta de registros de ponto', async () => {
    const mockTimeEntries = [
      {
        id: 1,
        code: 'USER123',
        startTime: new Date('2025-07-08T12:00:00Z'),
        type: 'entry',
      },
      {
        id: 2,
        code: 'USER123',
        startTime: new Date('2025-07-08T14:00:00Z'),
        type: 'exit',
      },
    ];

    (TimeEntryService.prototype.getAll as jest.Mock).mockResolvedValue(mockTimeEntries);

    const response = await request(app)
      .get('/api/time-entry')
      .query({ code: 'USER123' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id', 1);
    expect(response.body[1]).toHaveProperty('id', 2);
    expect(TimeEntryService.prototype.getAll).toHaveBeenCalledWith('USER123');
  });
});