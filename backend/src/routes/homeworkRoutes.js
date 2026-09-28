const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/auth');

const {
  getHomeworks,
  getHomeworkById,
  createHomework,
  updateHomework,
  deleteHomework,
} = require('../controllers/homeworkController');

// All routes below this line will require authentication
router.use(protect);

router
  .route('/')
  .get(getHomeworks)
  .post(
    authorize('admin', 'teacher'),
    upload.single('file'),
    createHomework
  );

router
  .route('/:id')
  .get(getHomeworkById)
  .put(
    authorize('admin', 'teacher'),
    upload.single('file'),
    updateHomework
  )
  .delete(
    authorize('admin', 'teacher'),
    deleteHomework
  );

module.exports = router;