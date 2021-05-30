import { message } from 'antd';

const trunCate = (text, limit = 20) => {
  if (text.length <= limit) {
    return text;
  }

  text = text.slice(0, limit);
  const lastSpace = text.lastIndexOf(" ");

  if (lastSpace > 0) {
    text = text.substr(0, lastSpace);
  }

  return `${text}...`;
};

/**
 * beforeUpload
 * @param {*} file 
 * @param {*} fileSize 
 */
const beforeUpload = (file, fileSize = 3) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error({
      content: 'Допустимые форматы: JPG/PNG.',
      style: {
        marginTop: '20vh',
      },
    });
  }
  const isLt2M = file.size / 1024 / 1024 < fileSize;
  if (!isLt2M && !file.noneErrorAlert) {
    message.error({
      content: `Размер изображения не должно превышать ${fileSize}MB!`,
      style: {
        marginTop: '20vh',
      },
    });
  }
  return isJpgOrPng && isLt2M;
}

export { trunCate, beforeUpload };
