import React, { useEffect, useState } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setHotCollections(response.data);
        console.log("Fetched hot collections:", response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      }
    };
<h1></h1>
    fetchHotCollections();
  }, []);

  const [hotCollections, setHotCollections] = useState([]);

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
              <ExploreItems hotCollections={hotCollections} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
