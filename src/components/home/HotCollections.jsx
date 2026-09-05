import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./HotCollections.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function PrevArrow({ className, style, onClick }) {
    const filteredClassName = (className || "").replace(/slick-(prev|next)\s*/g, "").trim();

    return (
      <button
        className={`hc-arrow hc-prev ${filteredClassName}`.trim()}
        style={{ ...style }}
        onClick={onClick}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  }

  function NextArrow({ className, style, onClick }) {
    const filteredClassName = (className || "").replace(/slick-(prev|next)\s*/g, "").trim();

    return (
      <button
        className={`hc-arrow hc-next ${filteredClassName}`.trim()}
        style={{ ...style }}
        onClick={onClick}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };


  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/hotCollections`);
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hot collections:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  if (loading) return <section id="section-collections" className="no-bottom"><div className="container"><p>Loading...</p></div></section>;
  if (error) return <section id="section-collections" className="no-bottom"><div className="container"><p>Error: {error}</p></div></section>;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings} className="hotcollections-slider">
              {collections.map((collection, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt={collection.title} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt={collection.authorName || "Author"} />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{collection.code || "ERC-192"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
