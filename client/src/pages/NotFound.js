import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container">
        <section className="recipe-cards">
          <div className="mt-5 mb-5">
            <div className="section-header page-section-header">
              <h1>Այս էջը գոյություն չունի</h1>
              <div>
                <strong style={{ color: 'tomato', fontSize: '20px' }}>404 Սխալ</strong>
                <p className="mt-2">
                  <strong style={{ display: "inline-block", margin: "0 5px 0 5px" }}>
                    Գնալ <Link to="/">գլխավոր</Link> էջ
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NotFound;
