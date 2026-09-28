const Homework = require('../models/Homework');

// @desc    Get all homeworks (with optional class filter)
// @route   GET /api/homework
exports.getHomeworks = async (req, res) => {
  try {
    const { classId, subject } = req.query;
    const filter = {};

    if (classId) filter.classId = classId;
    if (subject) filter.subject = subject;

    const homeworks = await Homework.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: homeworks.length,
      data: homeworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching homeworks',
      error: error.message,
    });
  }
};

// @desc    Get single homework by ID
// @route   GET /api/homework/:id
exports.getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id).populate('createdBy', 'name email');

    if (!homework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    res.status(200).json({ success: true, data: homework });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Create new homework upload
// @route   POST /api/homework
exports.createHomework = async (req, res) => {
  try {
    const { title, description, classId, subject, dueDate } = req.body;

    // Multer upload se file path extract karna
    const fileUrl = req.file ? `/uploads/homework/${req.file.filename}` : null;

    const newHomework = await Homework.create({
      title,
      description,
      classId,
      subject,
      dueDate,
      fileUrl,
      createdBy: req.user._id, // Auth middleware se authenticated user/teacher ID
    });

    res.status(201).json({
      success: true,
      message: 'Homework uploaded successfully!',
      data: newHomework,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create homework',
      error: error.message,
    });
  }
};

// @desc    Update homework assignment
// @route   PUT /api/homework/:id
exports.updateHomework = async (req, res) => {
  try {
    let homework = await Homework.findById(req.params.id);

    if (!homework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    // Build update fields dynamically
    const updateData = { ...req.body };

    // Nayi file upload hui ho to path update karo
    if (req.file) {
      updateData.fileUrl = `/uploads/homework/${req.file.filename}`;
    }

    homework = await Homework.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Homework updated successfully',
      data: homework,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error: error.message });
  }
};

// @desc    Delete homework assignment
// @route   DELETE /api/homework/:id
exports.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    await homework.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Homework deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete operation failed', error: error.message });
  }
};