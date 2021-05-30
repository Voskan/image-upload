const express = require('express');
const router = express.Router();
const multer = require('multer')

const upload = multer({ dest: 'uploads/' });

const {
  getImages,
  getImageById,
  uploadImage,
  deleteImage,
  getImageInfoById
} = require('../controllers/imageController');

router.get('/', getImages);
router.post('/', upload.single('image'), uploadImage);

router.get('/info/:id', getImageInfoById);

router.get('/:id', getImageById);
router.delete('/:id', deleteImage);

module.exports = router;
