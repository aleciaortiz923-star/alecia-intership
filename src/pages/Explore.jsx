import React, { useEffect, useState } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);
  const [filter, setFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1500);

    const fetchExploreItems = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ''}`
        );
        setExploreItems(response.data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchExploreItems();

    return () => clearTimeout(delayTimer);
  }, [filter]);

  const handleFilterChange = (e) => {
    setIsFiltering(true);
    setFilter(e.target.value);
    setVisibleCount(8);
    setTimeout(() => {
      setIsFiltering(false);
    }, 500);
  };



  const isLoading = !dataFetched || !minimumDelayMet || isFiltering;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
                    <option value="">Default</option>
                    <option value="price_low_to_high">Price, Low to High</option>
                    <option value="price_high_to_low">Price, High to Low</option>
                    <option value="likes_high_to_low">Most liked</option>
                  </select>
                </div>
              </div>
              <ExploreItems
                exploreItems={exploreItems}
                loading={isLoading}
                visibleCount={visibleCount}
                loadMore={loadMore}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
