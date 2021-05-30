import { Record } from "immutable";
import apiService from "../services/ApiImage";

/**
 * Constants
 */
export const moduleName = "images";

export const IMAGE_UPLOAD_REQUEST_START = `${moduleName}/IMAGE_UPLOAD_REQUEST_START`;
export const IMAGE_UPLOAD_REQUEST_SUCCESS = `${moduleName}/IMAGE_UPLOAD_REQUEST_SUCCESS`;
export const IMAGE_UPLOAD_REQUEST_ERROR = `${moduleName}/IMAGE_UPLOAD_REQUEST_ERROR`;

export const IMAGE_DELETE_REQUEST_START = `${moduleName}/IMAGE_DELETE_REQUEST_START`;
export const IMAGE_DELETE_REQUEST_SUCCESS = `${moduleName}/IMAGE_DELETE_REQUEST_SUCCESS`;
export const IMAGE_DELETE_REQUEST_ERROR = `${moduleName}/IMAGE_DELETE_REQUEST_ERROR`;

export const IMAGES_GET_REQUEST_START = `${moduleName}/IMAGES_GET_REQUEST_START`;
export const IMAGES_GET_REQUEST_SUCCESS = `${moduleName}/IMAGES_GET_REQUEST_SUCCESS`;
export const IMAGES_GET_REQUEST_ERROR = `${moduleName}/IMAGES_GET_REQUEST_ERROR`;

export const IMAGE_INFO_REQUEST_START = `${moduleName}/IMAGE_INFO_REQUEST_START`;
export const IMAGE_INFO_REQUEST_SUCCESS = `${moduleName}/IMAGE_INFO_REQUEST_SUCCESS`;
export const IMAGE_INFO_REQUEST_ERROR = `${moduleName}/IMAGE_INFO_REQUEST_ERROR`;

/**
 * Reducer
 */
export const ReducerRecord = Record({
  image: null,
  uploadError: null,
  uploadLoading: false,

  imageInfo: null,
  imageInfoError: null,
  imageInfoLoading: false,

  images: [],
  getImagesError: null,
  getImagesLoading: false,

  deleteError: null,
  deleteLoading: false,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case IMAGE_UPLOAD_REQUEST_START:
      return state
        .set("uploadLoading", true)
        .set("uploadError", null);
    case IMAGE_UPLOAD_REQUEST_SUCCESS:
      return state
        .set("uploadLoading", false)
        .set("image", payload.image)
        .set("uploadError", null);
    case IMAGE_UPLOAD_REQUEST_ERROR:
      return state
        .set("uploadError", error)
        .set("uploadLoading", false);

    case IMAGES_GET_REQUEST_START:
      return state
        .set("getImagesLoading", true)
        .set("getImagesError", null);
    case IMAGES_GET_REQUEST_SUCCESS:
      return state
        .set("getImagesLoading", false)
        .set("images", payload.images)
        .set("getImagesError", null);
    case IMAGES_GET_REQUEST_ERROR:
      return state
        .set("getImagesLoading", error)
        .set("getImagesError", false);

    case IMAGE_DELETE_REQUEST_START:
      return state
        .set("deleteLoading", true)
        .set("deleteError", null);
    case IMAGE_DELETE_REQUEST_SUCCESS:
      return state
        .set("deleteLoading", false)
        .set("images", payload.images)
        .set("deleteError", null);
    case IMAGE_DELETE_REQUEST_ERROR:
      return state
        .set("deleteLoading", false)
        .set("deleteError", error);

    case IMAGE_INFO_REQUEST_START:
      return state
        .set("imageInfoLoading", true)
        .set("imageInfoError", null);
    case IMAGE_INFO_REQUEST_SUCCESS:
      return state
        .set("imageInfoLoading", false)
        .set("imageInfo", payload.imageInfo)
        .set("imageInfoError", null);
    case IMAGE_INFO_REQUEST_ERROR:
      return state
        .set("imageInfoLoading", false)
        .set("imageInfoError", error);
    default:
      return state;
  }
}

/**
 * Selectors
 */

export const imageSelector = (state) => state[moduleName].image;

/**
 * Action Creators
 */

/**
 * upload image
 *
 * @param {Object} imageObj - image object
 */
export const imageUpload = (imageObj) => async (dispatch) => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST_START });

  try {
    const image = await apiService.uploadImage(imageObj);

    dispatch({
      type: IMAGE_UPLOAD_REQUEST_SUCCESS,
      payload: { image },
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_REQUEST_ERROR,
      error,
    });
  }
};

/**
 * delete image
 *
 * @param {String} id - image id
 */
export const deleteImage = (id) => async (dispatch) => {
  dispatch({ type: IMAGE_DELETE_REQUEST_START });

  try {
    const images = await apiService.deleteImage(id);

    dispatch({
      type: IMAGE_DELETE_REQUEST_SUCCESS,
      payload: { images }
    });

    await getImages();
  } catch (error) {
    dispatch({
      type: IMAGE_DELETE_REQUEST_ERROR,
      error,
    });
  }
};

/**
 * get images
 *
 * @param {Number} limit
 * @param {Number} skip
 */
export const getImages = (limit = 6, skip = 0) => async (dispatch) => {
  dispatch({ type: IMAGES_GET_REQUEST_START });

  try {
    const images = await apiService.getImages({ limit, skip });

    dispatch({
      type: IMAGES_GET_REQUEST_SUCCESS,
      payload: { images },
    });
  } catch (error) {
    dispatch({
      type: IMAGES_GET_REQUEST_ERROR,
      error,
    });
  }
};

/**
 * get image by id
 *
 * @param {String} id
 */
export const getImageById = (id) => async (dispatch) => {
  dispatch({ type: IMAGE_INFO_REQUEST_START });

  try {
    const imageInfo = await apiService.getImageInfo(id);

    dispatch({
      type: IMAGE_INFO_REQUEST_SUCCESS,
      payload: { imageInfo },
    });
  } catch (error) {
    dispatch({
      type: IMAGE_INFO_REQUEST_ERROR,
      error,
    });
  }
};