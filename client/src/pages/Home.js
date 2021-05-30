import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import Upload from "../components/Upload";
import Card from "../components/Card";

import NoResult from "../components/NoResult";

import { getImages } from "../ducks/images";

const Home = ({ getImagesList, images, getImagesError, getImagesLoading }) => {
  useEffect(() => {
    async function fetchData() {
      await getImagesList();
    }
    fetchData();
  }, []);

  const onNextBackPage = async (type) => {
    let {
      limit, skip, count
    } = images.info;

    if (type === "back") {
      if (skip >= limit) {
        skip = skip - limit;
        await getImagesList(limit, skip);
      }
    } else {
      if (skip + limit < count) {
        skip = skip + limit;
        await getImagesList(limit, skip);
      }
    }
  };

  return (
    <Layout>
      <main>
        <Upload />

        <div className="album py-5 bg-light">
          <div className={`container ${getImagesLoading ? 'text-center' : ''}`}>
            {
              getImagesError ? (
                <div className="alert alert-danger" role="alert">
                  {<div>{getImagesError}</div>}
                </div>
              ) : null
            }
            {
              getImagesLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null
            }
            {
              images && images.data && images.data.length ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  { images.data.map(img => <Card img={img} key={img._id} />)}
                </div>
              ) : !getImagesLoading ? <NoResult /> : null
            }


            {
              images && images.info && images.info.count > images.info.limit ? (
                <div className="mt-4">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        type="button"
                        disabled={images.info.skip < images.info.limit ? true : false}
                        onClick={() => onNextBackPage("back")}
                      >
                        Previous
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        type="button"
                        disabled={images.info.skip + images.info.limit >= images.info.count ? true : false}
                        onClick={() => onNextBackPage("next")}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null
            }
          </div>
        </div>

      </main>
    </Layout>
  )
};

Home.defaultProps = {
  getImagesLoading: false,
  getImagesError: null
};

Home.propTypes = {
  getImagesList: PropTypes.func.isRequired,
  getImagesLoading: PropTypes.bool,
  getImagesError: PropTypes.object,
};

const mapStateToProps = (
  { images: { images, getImagesError, getImagesLoading } },
) => ({ images, getImagesError, getImagesLoading });

const mapDispatchToProps = (dispatch) => ({
  getImagesList: bindActionCreators(getImages, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
