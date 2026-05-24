const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// Validation rules
const bookValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .trim(),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value >= 0)
    .withMessage('Price cannot be negative'),
  body('isbn')
    .notEmpty()
    .withMessage('ISBN is required')
    .trim(),
  body('publishedDate')
    .notEmpty()
    .withMessage('Published date is required')
    .isISO8601()
    .withMessage('Invalid date format — use YYYY-MM-DD'),
];

router.post('/', bookValidation, createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;