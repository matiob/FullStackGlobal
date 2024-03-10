import { Router } from 'express';
import { getTasks, getTask, getTasksByTitle, postTask, editTask, deleteTask} from '../controllers/task.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *     Task:
 *      type: object
 *      properties:
 *          _id:
 *              type: string
 *              description: Task id
 *          title:
 *              type: string
 *              description: Task title
 *          content:
 *              type: integer
 *              description: Task content
 *     example:
 *          _id: 65eb7eae13a9ab71e71bda03
 *          title: Task
 *          content: To Do
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *     summary: Get all tasks
 *     description: Get all tasks
 *     responses:
 *      200:
 *         description: Success
 *      500:
 *         description: Internal Server Error
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks/title:
 *  get:
 *     summary: Get tasks by title
 *     description: Get tasks by title
 *     parameters:
 *       - in: query
 *         name: taskTitle
 *         schema:
 *           type: string
 *         required: true
 *         description: Task title
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal Server Error
 */
// router.get('/title/:taskTitle', getTasksByTitle);
router.get('/title', getTasksByTitle);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *  get:
 *     summary: Get task detail
 *     description: Get task detail
 *      parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 *     responses:
 *      200:
 *         description: Success
 *      500:
 *         description: Internal Server Error
 */
router.get('/:taskId', getTask);

/**
 * @swagger
 * /api/tasks:
 *  post:
 *      summary: Add task
 *      description: Add task
 *      requestBody:
 *          description: A JSON object containing task information
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Task'
 *                 example:
 *                    title: Task
 *                    content: To Do
 *      responses:
 *      200:
 *          description: Success
 *      500:
 *          description: Internal Server Error
 */
router.post('/', postTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *  put:
 *     summary: Edit task
 *     description: Edit task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 *     requestBody:
 *       description: A JSON object containing task information
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Task'
 *           example:
 *              title: Task
 *              content: To Do
 *     responses:
 *     200:
 *        description: Success
 *     500:
 *       description: Internal Server Error
 *
 */
router.put('/:taskId', editTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *     summary: Delete task
 *     description: Delete task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 *     responses:
 *     200:
 *        description: Success
 *     500:
 *       description: Internal Server Error
 */
router.delete('/:taskId', deleteTask);

export default router;