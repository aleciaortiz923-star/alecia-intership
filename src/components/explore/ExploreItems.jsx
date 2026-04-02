import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../Countdown";
import NFT from "../NFT";

const ExploreItems = ({ exploreItems, loading, visibleCount, loadMore }) => {

  return (
    <>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="skeleton-circle-sm"></div>
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft__item_wrap skeleton-box" style={{ height: '200px' }}></div>
                <div className="nft__item_info">
                  <div className="skeleton-line" style={{ width: "80%" }}></div>
                  <div className="skeleton-line" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFT item={item} />
            </div>
          ))}
      {visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
