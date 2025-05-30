const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Server error
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - publishYear
 *               - genre
 *               - description
 *               - pageCount
 *               - language
 *               - publisher
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: Author ID
 *               isbn:
 *                 type: string
 *               publishYear:
 *                 type: number
 *               genre:
 *                 type: string
 *               description:
 *                 type: string
 *               pageCount:
 *                 type: number
 *               language:
 *                 type: string
 *               publisher:
 *                 type: string
 *               available:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/', protect, bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: Author ID
 *               isbn:
 *                 type: string
 *               publishYear:
 *                 type: number
 *               genre:
 *                 type: string
 *               description:
 *                 type: string
 *               pageCount:
 *                 type: number
 *               language:
 *                 type: string
 *               publisher:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, restrictTo('admin'), bookController.deleteBook);

module.exports = router;

