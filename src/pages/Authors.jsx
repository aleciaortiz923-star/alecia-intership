import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors } from '../api/axios';
import SubHeader from '../images/subheader.jpg';
import CopyableAddress from '../components/CopyableAddress';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAuthors = async () => {
      try {
        const data = await getAuthors();
        setAuthors(data);
      } catch (error) {
        // error is already logged in getAuthors
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="subheader" className="text-light" style={{ background: `url("${SubHeader}") top` }}>
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Authors</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading
                ? new Array(8).fill(0).map((_, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft__author">
                        <div className="author_list_pp skeleton-box"></div>
                        <div className="author_list_info">
                          <div className="skeleton-line" style={{ width: '70%' }}></div>
                          <div className="skeleton-line" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))
                : authors.map((author) => (
                    <div key={author.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft__author">
                        <Link to={`/author/${author.id}`}>
                          <div className="author_list_pp">
                              <img className="lazy" src={author.authorImage} alt={author.authorName} />
                              <i className="fa fa-check"></i>
                          </div>
                        </Link>
                        <div className="author_list_info">
                          <Link to={`/author/${author.id}`}>
                            <h4>{author.authorName}</h4>
                          </Link>
                          <CopyableAddress address={author.address} />
                          <span>{author.price} ETH</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authors;
