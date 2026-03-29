import React, { useEffect, useState } from "react";
import axios from "axios";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setHotCollections(response.data);
        console.log("Fetched hot collections in Home:", response.data);
      } catch (error) {
        console.error("Error fetching hot collections in Home:", error);
      }
    };

    fetchHotCollections();
  }, []);

  const [hotCollections, setHotCollections] = useState([]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections hotCollections={hotCollections} />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
