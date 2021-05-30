const sharp = require('sharp');

exports.cropImage = async (originalImage, outputImage, top, left, width, height) => {
  try {
    await sharp(originalImage)
      .extract({
        width,
        height,
        left,
        top
      })
      .toFile(outputImage);

  } catch (e) {
    throw e
  }
};

exports.resizeImage = async (originalImage, outputImage, width, height, aspectRatio) => {
  try {
    await sharp(originalImage)
      .resize({
        width,
        height,
        aspectRatio,
        fit: aspectRatio || sharp.fit.contain
      })
      .toFile(outputImage);
  } catch (e) {
    throw e
  }
};


exports.blurImage = async (originalImage, outputImage, percent) => {
  try {
    await sharp(originalImage)
      .blur(percent)
      .toFile(outputImage);
  } catch (e) {
    throw e
  }
};