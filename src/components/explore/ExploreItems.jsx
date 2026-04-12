import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const filter = searchParams.get('filter') || '';

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        
        if (filter) {
          apiUrl += `?filter=${filter}`;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setExploreItems(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        // Fallback data
        setExploreItems([
          {
            id: 1,
            title: "Pinky Ocean",
            price: 5.07,
            likes: 69,
            authorId: 83937449,
            nftId: 10147817,
            expiryDate: 1757694560799,
            nftImage: null,
            authorImage: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setSearchParams(selectedFilter ? { filter: selectedFilter } : {});
    setVisibleItems(8);
  };

  const formatTimeLeft = (expiryDate) => {
    const timeLeft = expiryDate - currentTime;
    
    if (timeLeft <= 0) {
      return "Expired";
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 4);
  };

  const itemsToShow = exploreItems.slice(0, visibleItems);

  if (loading) {
    return (
      <>
        <div>
          <select id="filter-items" value={filter} onChange={handleFilterChange}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        <div className="col-md-12 text-center">
          <p>Loading explore items...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {itemsToShow.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.authorId}`}
              >
                <img 
                  className="lazy" 
                  src={item.authorImage || AuthorImage} 
                  alt="Author" 
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{formatTimeLeft(item.expiryDate)}</div>

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
              <Link to={`/item-details/${item.nftId}`}>
                <img 
                  src={item.nftImage || nftImage} 
                  className="lazy nft__item_preview" 
                  alt={item.title} 
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
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
      {visibleItems < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button 
            onClick={loadMore} 
            id="loadmore" 
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;