import ApiService from "./ApiService";

/**
 * @class RecipeRervice
 * request and get data from backend
 */
class ApiImage extends ApiService {

  /**
   * get image by id
   * @param {Number} id - image id
   * @return {Promise<Object>} image object
   */
  getImage = async (id) => {
    const { data } = await this.getData(`/image/${id}`);
    return data;
  };

  /**
   * get image info by id
   * @param {Number} id - image id
   * @return {Promise<Object>} image info object
   */
  getImageInfo = async (id) => {
    const { data } = await this.getData(`/image/info/${id}`);
    return data;
  };

  /**
   * get images
   * @param {Object} queryObject - query parameters. key: param name, value: param value
   * @return {Promise<Array>} image array
   */
  getImages = async (queryObject = null) => {
    const data = await this.getData('/image', queryObject);
    return data;
  };

  /**
   * upload image
   * @param {Object} imageObj - image data
   * @return {Promise<Object>} image object
   */
  uploadImage = async (imageObj) => {
    await this.createData(`/image`, imageObj, {
      "Content-Type": "multipart/form-data",
    });
  };

  /**
   * update image
   * @param {Object} updateObject - image data
   * @return {Promise<Object>} image object
   */
  updateImage = async (id, updateObject) => {
    const { data } = await this.updateData(`/image/${id}`, updateObject);
    return data;
  };

  /**
   * delete image
   * @param {Object} id - image id
   * @return {Promise<Object>} image object
   */
  deleteImage = async (id) => {
    const data = await this.deleteData(`/image/${id}`);
    return data;
  };
}

export default new ApiImage();
