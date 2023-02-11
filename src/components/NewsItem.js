import React from "react";

const NewsItem = (props) => {
  let { tittle, description, imgurl, nwesurl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={
            !imgurl
              ? "https://images.moneycontrol.com/static-mcnews/2021/02/Funding-770x433.jpg"
              : imgurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{tittle}... </h5>
          <span className="badge rounded-pill bg-success">{source}</span>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              {" "}
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={nwesurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
