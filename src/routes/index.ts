import { Router } from 'express';
import { TimeEntryController } from '../controller/TimeEntryController';

const router = Router();
const timeEntryController = new TimeEntryController();

router.post('/time-entry', timeEntryController.createEntry.bind(timeEntryController));
router.get('/time-entry', timeEntryController.getAll.bind(timeEntryController));

export default router;