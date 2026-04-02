import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1000);

    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        if (response.data && Object.keys(response.data).length > 0) {
          setItemDetails(response.data);
        } else {
          // API returned empty data, using sample data as a fallback
          const sampleData = {
            nftImage: "https://placehold.co/600x600.png?text=Sample+NFT",
            title: "Sample Rainbow Style #194",
            views: 100,
            likes: 74,
            description: "This is a sample description for an NFT item. The actual data will come from the API once it is available.",
            ownerId: 1,
            ownerImage: "https://placehold.co/50x50.png?text=Owner",
            ownerName: "Sample Owner",
            creatorId: 1,
            creatorImage: "https://placehold.co/50x50.png?text=Creator",
            creatorName: "Sample Creator",
            price: 1.85
          };
          setItemDetails(sampleData);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchItemDetails();

    return () => clearTimeout(delayTimer);
  }, [nftId]);

  const isLoading = !dataFetched || !minimumDelayMet;

  if (isLoading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton-box" style={{ width: "100%", height: "400px" }}></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2><div className="skeleton-line" style={{ width: "70%" }}></div></h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        <div className="skeleton-line" style={{ width: "50px", display: "inline-block" }}></div>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        <div className="skeleton-line" style={{ width: "50px", display: "inline-block" }}></div>
                      </div>
                    </div>
                    <div><div className="skeleton-line" style={{ width: "100%" }}></div></div>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton-circle"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-line" style={{ width: "120px" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!itemDetails) {
    return <div>Item not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>{itemDetails.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img className="lazy" src={itemDetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img className="lazy" src={itemDetails.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
