const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Homework title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    classId: {
      type: String,
      required: [true, 'Class ID is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    fileUrl: {
      type: String, // Uploaded attachment/PDF link
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Teacher schema ID
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Homework', homeworkSchema);