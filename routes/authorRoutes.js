const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Server error
 */
router.get('/', authorController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author details
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authorController.getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - biography
 *               - birthDate
 *               - nationality
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               biography:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/', protect, authorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               biography:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, authorController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       400:
 *         description: Invalid ID format or author has associated books
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, restrictTo('admin'), authorController.deleteAuthor);

module.exports = router;

