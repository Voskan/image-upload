const Image = require('../schema/Image');

/**
 * get request limit skip
 * @param req
 * @return {{limit: Number, skip: Number}}
 */
exports.getLimitSkip = ({ query }) => {
  let limit = 6;
  let skip = 0;

  if (query.limit && !Number.isNaN(Number(query.limit))) {
    limit = Number(query.limit);
  }

  if (query.skip && !Number.isNaN(Number(query.skip))) {
    skip = Number(query.skip);
  }

  return { limit, skip };
};

exports.createLog = (key, type = "upload") => new Promise(async (resolve, reject) => {
  try {
    const img = await Image.findOne({ key });
    if (!img) return reject(new Error(`${id} image not found`));

    const logObj = {
      logType: type,
      message: "",
      date: Date.now()
    }

    switch (type) {
      case "upload": logObj.message = "Upload image..."; break;
      case "crop": logObj.message = "Crop image..."; break;
      case "resize": logObj.message = "Resize image..."; break;
      case "blur": logObj.message = "Blur image..."; break;
      default:
        logObj.message = "Upload image...";
        logObj.logType = "upload"
    }

    const logs = img.logs;
    logs.push(logObj);
    img.logs = logs;

    await img.save();

    resolve();
  } catch (e) {
    reject(e)
  }
});