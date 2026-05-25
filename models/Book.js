const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published date is required'],
    },
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);