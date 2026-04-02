import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);
<h1></h1>
  useEffect(() => {
    window.scrollTo(0, 0);

    const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1000);

    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(response.data);
        setNfts(response.data.nftCollection);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchAuthorData();

    return () => clearTimeout(delayTimer);
  }, [authorId]);

  const isLoading = !dataFetched || !minimumDelayMet;

  if (isLoading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section id="profile_banner" className="skeleton-banner"></section>
          <section className="container no-bottom">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div className="skeleton-circle-lg"></div>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <div className="skeleton-line" style={{ width: "200px", height: "24px" }}></div>
                          <span className="profile_username">
                            <div className="skeleton-line" style={{ width: "150px" }}></div>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="skeleton-box" style={{ width: "150px", height: "40px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className="de_nav text-left">
                    <li className="active">
                      <span>
                        <div className="skeleton-line" style={{ width: "80px" }}></div>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {[...Array(8)].map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <div className="skeleton-box" style={{ height: "200px", width: "100%" }}></div>
                    </div>
                    <div className="nft__item_info">
                      <div className="skeleton-line" style={{ width: "80%" }}></div>
                      <div className="skeleton-line" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!author) {
    return <div>Author not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="profile_banner" style={{ backgroundImage: `url(${author.authorBanner})` }}></section>
        <section className="container no-bottom">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={author.authorImage} alt={author.authorName} />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {author.authorName}
                        <span className="profile_username">@{author.authorName.toLowerCase().replace(" ", "")}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">{author.followers} followers</div>
                    <button className="btn-main">Follow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="items_filter">
                <ul className="de_nav text-left">
                  <li className="active">
                    <span>On Sale</span>
                  </li>
                </ul>
              </div>
            </div>
            {nfts.map((nft) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${author.id}`}>
                      <img className="lazy" src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {nft.expiryDate && <div className="de_countdown">{new Date(nft.expiryDate).toLocaleDateString()}</div>}
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nft.id}`}>
                      <img src={nft.nftImage} className="lazy nft__item_preview" alt={nft.title} />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.id}`}>
                      <h4>{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;