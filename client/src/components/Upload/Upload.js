import React, { useState } from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { imageUpload, getImages } from "../../ducks/images";

function Upload({ uploadImage, uploadError, uploadLoading, getImagesList }) {
  const [errors, setErrors] = useState(null);

  const onChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const types = ['image/png', 'image/jpeg'];

      // Catching wrong file types on the client
      if (types.every(type => file.type !== type)) {
        return setErrors(`'${file.type}' is not a supported format`);
      }

      // Catching files that are too large on the client
      if (file.size > 250000) {
        return setErrors(`'${file.name}' is too large, please pick a smaller file`);
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        await uploadImage(formData);
        await getImagesList();
        setErrors(null);
      } catch (e) {
        return setErrors(e.message);
      }
    }
  }

  const errorText = errors || (uploadError && uploadError.message ? uploadError.message : null);

  return (
    <section className="py-5 container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light text-center">Բեռնել նկարներ</h1>
          <p className="lead text-muted text-center">
            Ծօ՜ ապ ջան, Ըսիգ նկար բեռնելու տեղն է։<br />Բայց մեննակ սիրուն նկարներ uplaod կենես 😐
          </p>
          <div className="input-group mb-3">
            <input type="file" className="form-control" onChange={onChange} disabled={uploadLoading ? true : false} />
          </div>
          {
            uploadLoading ? (
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
              </div>
            ) : null
          }
          {
            errorText ? (
              <div className="alert alert-danger" role="alert">
                {<div>{errorText}</div>}
              </div>
            ) : null
          }
        </div>
      </div>
    </section>
  )
}

Upload.defaultProps = {
  uploadLoading: false,
  uploadError: null
};

Upload.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  uploadLoading: PropTypes.bool,
  uploadError: PropTypes.object,
};

const mapStateToProps = (
  { images: { uploadError, uploadLoading } },
) => ({ uploadError, uploadLoading });

const mapDispatchToProps = (dispatch) => ({
  uploadImage: bindActionCreators(imageUpload, dispatch),
  getImagesList: bindActionCreators(getImages, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
