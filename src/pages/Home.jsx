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

      const delayTimer = setTimeout(() => {
      setMinimumDelayMet(true);
    }, 1000);

      const fetchHotCollections = async () => {
        try {
          const response = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          );
          setHotCollections(response.data);
        } catch (error) {
         
        } finally {
          setDataFetched(true);
        }
      };

      fetchHotCollections();

      return () => clearTimeout(delayTimer);
    }, []);

  const [hotCollections, setHotCollections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [minimumDelayMet, setMinimumDelayMet] = useState(false);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections hotCollections={hotCollections} isLoading={!dataFetched || !minimumDelayMet} />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
