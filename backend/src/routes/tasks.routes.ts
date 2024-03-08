import { Router } from 'express';
import { getTasks, postTask, editTask, deleteTask} from '../controllers/task.controller';

const router = Router();

router.get('/', getTasks);
router.post('/', postTask);
router.put('/:taskId', editTask);
router.delete('/:taskId', deleteTask);

export default router;