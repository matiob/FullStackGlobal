import { Router } from 'express';
import { getUserById, signUp, login, logout } from '../controllers/user.controller';
import { requiresAuth } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *      type: object
 *      properties:
 *          _id:
 *              type: string
 *              description: User id
 *          username:
 *              type: string
 *              description: User title
 *          email:
 *              type: string
 *              description: User email
 *          password:
 *              type: string
 *              description: User password
 *     example:
 *          _id: 65eb7eae13a9ab71e71bda03
 *          username: Joe Doe
 *          email: joedoe@gmail.com
 *          password: $2y$10$9xbERtSiPT3iCBsz51G89Oc.tl4anJ.4GTa
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *     summary: Get user by id
 *     description: Get user by id
 *     responses:
 *      200:
 *         description: Success
 *      500:
 *         description: Internal Server Error
 */
router.get('/', requiresAuth, getUserById);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Add user
 *      description: Add user
 *      requestBody:
 *          description: A JSON object containing user information
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/User'
 *                 example:
 *                    username: Joe Doe
 *                    email: joedoe@mail.com
 *                    password: secret
 *      responses:
 *      200:
 *          description: Success
 *      500:
 *          description: Internal Server Error
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Login user
 *      description: Validate User
 *      requestBody:
 *          description: A JSON object containing User information
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/User'
 *                 example:
 *                    email: joedoe@mail.com
 *                    password: secret
 *      responses:
 *      200:
 *          description: Success
 *      500:
 *          description: Internal Server Error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Logout
 *      description: End user session
 *      responses:
 *      200:
 *          description: Success
 *      500:
 *          description: Internal Server Error
 */
router.post("/logout", logout);

export default router;