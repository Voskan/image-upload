import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';

import Layout from "../components/Layout";

import { API_URL } from "../config";
import { getImageById } from "../ducks/images";
import { Link } from 'react-router-dom';

const Log = ({ getImageInfo, imageInfo, imageInfoError, imageInfoLoading, match }) => {
  const id = match.params.id;

  useEffect(() => {
    async function fetchData(id) {
      if (id) await getImageInfo(id);
    }
    fetchData(id);
  }, [id]);


  return (
    <Layout>
      <div className="container mt-4 mb-4">
        <div className="mb-4">
          <Link to="/" className="btn btn-primary btn-s">&#8592; Back to Home page</Link>
        </div>

        {
          imageInfoError ? (
            <div className="alert alert-danger" role="alert">
              {imageInfoError.message}
            </div>
          ) : null
        }

        {
          imageInfoLoading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : null
        }

        {
          !imageInfoLoading && !imageInfoError && imageInfo ? (
            <>
              <div className="text-center">
                <img src={`${API_URL}/image/${imageInfo._id}`} className="img-fluid" alt="IMG alt description" />
              </div>

              {
                imageInfo.logs && imageInfo.logs.length ? (
                  <>
                    <h2 className="text-center mt-4 mb-3">Image Logs</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Info</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          imageInfo.logs.map((log, i) => (
                            <tr key={log._id}>
                              <th scope="row">{i + 1}</th>
                              <td>
                                <strong>{log.logType}</strong>
                                {log.message ? ` - ${log.message}` : null}
                              </td>
                              <td>{moment(log.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </>
                ) : null
              }
            </>
          ) : null
        }
      </div>
    </Layout >
  )
};

Log.defaultProps = {
  imageInfoLoading: false,
  imageInfoError: null
};

Log.propTypes = {
  getImageInfo: PropTypes.func.isRequired,
  imageInfoLoading: PropTypes.bool,
  imageInfoError: PropTypes.object,
};

const mapStateToProps = (
  { images: { imageInfo, imageInfoError, imageInfoLoading } },
) => ({ imageInfo, imageInfoError, imageInfoLoading });

const mapDispatchToProps = (dispatch) => ({
  getImageInfo: bindActionCreators(getImageById, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Log);
