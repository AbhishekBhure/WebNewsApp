import React from "react";
// import PropTypes from 'prop-types'
import loading from "./ajax-loader.gif";
import "./Spiner.css";

const Spiner = () => {
  return (
    <div className="my-3 d-flex align-items-center justify-content-center self">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spiner;
