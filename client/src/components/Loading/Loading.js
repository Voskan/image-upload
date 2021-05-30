import React from "react";

import "./Loading.css";
import spinner from "./spinner.gif";

const Loading = () => (
  <div className="main-spinner">
    <div className="main-spinner-box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        aria-hidden="true"
        className="me-2"
        viewBox="0 0 24 24">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <img src={spinner} alt="Loading..." className="main-spinner-spin" />
    </div>
  </div>
);

export default Loading;
