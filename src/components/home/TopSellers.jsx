import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopSellers.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1000);

    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchTopSellers();

    return () => clearTimeout(delayTimer);
  }, []);

  const isLoading = !dataFetched || !minimumDelayMet;
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="pp-author skeleton-circle-sm"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton-line" style={{ width: "100px" }}></div>
                        <div className="skeleton-line" style={{ width: "40px" }}></div>
                      </div>
                    </li>
                  ))
                : topSellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.id}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.id}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
