import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        if (response.data && response.data.id) {
          setItem(response.data);
        } else {
          setItem(null); // Explicitly set to null if API returns invalid data
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        setItem(null); // Also set to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);

  // 1. Show skeleton while loading
  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton-box" style={{ width: "100%", height: "500px" }}></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton-line" style={{ width: "70%", height: "30px", marginBottom: "15px" }}></div>
                    <div className="item_info_counts">
                      <div className="skeleton-box" style={{ width: "80px", height: "30px" }}></div>
                      <div className="skeleton-box" style={{ width: "80px", height: "30px" }}></div>
                    </div>
                    <div className="skeleton-line" style={{ width: "100%", height: "80px", margin: "15px 0" }}></div>
                    {/* Simplified skeleton for owner/creator */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 2. Show "Not Found" message if loading is done and item is still null
  if (!item) {
    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section aria-label="section" className="mt-5 text-center">
                    <div className="container">
                        <h2>Item Not Found</h2>
                        <p>The NFT you are looking for could not be found. The API may be down or the ID is incorrect.</p>
                    </div>
                </section>
            </div>
        </div>
    );
  }

  // 3. Show the item details
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src={item.nftImage} className="img-fluid img-rounded mb-sm-30" alt={item.title} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title} #{item.tag}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views"><i className="fa fa-eye"></i>{item.views}</div>
                    <div className="item_info_likes"><i className="fa fa-heart"></i>{item.likes}</div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}><h4>{item.ownerName}</h4></Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}><h4>{item.creatorName}</h4></Link>
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
};

export default ItemDetails;
