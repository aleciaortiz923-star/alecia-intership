import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";
import Countdown from "../Countdown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1000);

    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchNewItems();

    return () => clearTimeout(delayTimer);
  }, []);

  const isLoading = !dataFetched || !minimumDelayMet;

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
    slidesToShow: 4,
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <Slider {...settings}>
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <div className="skeleton-box" style={{ height: "200px", width: "100%" }}></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton-circle"></div>
                    </div>
                    <div className="nft__item_info">
                      <div className="skeleton-line" style={{ width: "80%" }}></div>
                      <div className="skeleton-line" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : newItems.length > 0 ? (
            <Slider {...settings}>
              {newItems.map((item) => (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorName}`}
                      >
                        <img className="lazy" src={item.authorImage} alt={item.authorName} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No new items to display.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
