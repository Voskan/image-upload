const util = require('util');
const fs = require("fs");
const Image = require('../schema/Image');
const { getLimitSkip, createLog } = require('../lib/utils');
const { uploadFile, getFileStream, deleteObject } = require('../lib/s3');
const unlinkFile = util.promisify(fs.unlink);
const mongoose = require('mongoose');

/**
 * get images by query params (skip, limit)
 * HTTP method - GET
 * @param {Object} req Request 
 * @param {Object} res Response
 * @param {Function} next middleware
 * @returns {Object}
 */
const getImages = async (req, res, next) => {
  try {
    const { skip, limit } = getLimitSkip(req);

    const imgs = await Image.find({}, 'key _id')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' });

    const count = await Image.find({}, '_id').count();

    return res.json({
      info: {
        count,
        limit,
        skip,
        array: true
      },
      data: imgs
    })
  } catch (e) {
    return next(e);
  }
};

exports.getImages = getImages;

/**
 * get image by id
 * HTTP method - GET
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next middleware
 * @returns {Object}
 */
exports.getImageById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(new Error(`${id} is not a valid ObjectId`));
    }

    const img = await Image.findById(id, 'key _id');
    if (!img) return next(new Error(`${id} image not found`));

    const readStream = getFileStream(img.key)

    readStream.pipe(res);
  } catch (e) {
    return next(e);
  }
};

/**
 * get image info by id
 * HTTP method - GET
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next middleware
 * @returns {Object}
 */
exports.getImageInfoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(new Error(`${id} is not a valid ObjectId`));
    }

    const img = await Image.findById(id);
    if (!img) return next(new Error(`${id} image not found`));

    return res.json({
      info: { array: false },
      data: img
    })
  } catch (e) {
    return next(e);
  }
};

/**
 * upload image
 * HTTP method - POST
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next middleware
 * @returns {Object}
 */
exports.uploadImage = async (req, res, next) => {
  try {
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);

    const img = new Image({ key: result.Key });
    const savedData = await img.save();

    await createLog(result.Key, "upload");

    return res.json({
      info: { array: false },
      data: { url: `image/${savedData._id}` }
    })
  } catch (e) {
    return next(e);
  }
};

/**
 * delete image
 * HTTP method - DELETE
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next middleware
 * @returns {Object}
 */
exports.deleteImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(new Error(`${id} is not a valid ObjectId`));
    }

    const img = await Image.findById(id, 'key');
    if (!img) return next(new Error(`${id} image not found`));

    await Image.remove({ _id: id });
    await deleteObject(img.key);

    getImages(req, res, next);
  } catch (e) {
    return next(e);
  }
};
