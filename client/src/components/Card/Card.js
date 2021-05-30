import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

import { API_URL } from "../../config";
import { deleteImage } from "../../ducks/images";

import "./Card.css";

const Card = ({ img, deleteImageById, deleteError, deleteLoading }) => {
  return (
    <div className="col">
      <div className="card shadow-sm img-container">
        <img src={`${API_URL}/image/${img._id}`} alt="Img" />

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link to={`/log/${img._id}`} className="btn btn-success">View</Link>
              <Modal id={img._id} deleteImageById={deleteImageById} loading={deleteLoading} error={deleteError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Modal = ({ id, deleteImageById, loading, error }) => (
  <Popup trigger={<button type="button" className="btn btn-danger">Delete</button>} modal>
    <div className="text-center">
      {
        !loading && error ? (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        ) : null
      }

      {
        !error ? (
          loading ? (
            <>
              <span className="pupup-text">Ափսոս էր էտ ընտիր նկարը...</span>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <span className="pupup-text">Չենես ընդպես բան, հանկարծ չսխմես</span>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteImageById(id)}
              >
                Ջնջել
            </button>
            </>
          )
        ) : null
      }
    </div>
  </Popup>
);

Modal.propTypes = {
  id: PropTypes.string.isRequired
};

Card.defaultProps = {
  deleteLoading: false,
  deleteError: null
};

Card.propTypes = {
  img: PropTypes.object.isRequired,
  deleteImageById: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.object
};

const mapStateToProps = (
  { images: { deleteLoading, deleteError } },
) => ({ deleteLoading, deleteError });

const mapDispatchToProps = (dispatch) => ({
  deleteImageById: bindActionCreators(deleteImage, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
