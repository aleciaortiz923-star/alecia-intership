import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const HotCollections = ({ hotCollections, isLoading }) => {

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="slick-arrow next-arrow"
        onClick={onClick}
      >
        <i className="fa fa-angle-right"></i>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="slick-arrow prev-arrow"
        onClick={onClick}
      >
        <i className="fa fa-angle-left"></i>
      </div>
    );
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <Slider {...settings}>
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="skeleton-box" style={{ height: "200px", width: "100%" }}></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton-circle"></div>
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton-line" style={{ width: "80%" }}></div>
                      <div className="skeleton-line" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : hotCollections.length > 0 ? (
            <Slider {...settings}>
              {hotCollections.map((item) => (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img src={item.nftImage} className="img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="pp-coll" src={item.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No hot collections to display.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
