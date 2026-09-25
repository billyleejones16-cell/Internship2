import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setTick] = useState(0);

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return "";

    const diff = new Date(expiryDate).getTime() - Date.now();
    if (diff <= 0) return "0h 0m 0s";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching new items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [items.length]);

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Slider arrow components to match HotCollections
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

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <Slider {...settings} className="hotcollections-slider">
              {items.map((item, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={item.nftImage || nftImage} className="lazy img-fluid" alt={item.title} />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={item.authorImage || AuthorImage} alt={item.authorName || "Author"} />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    {item.expiryDate && (
                      <div className="de_countdown">{formatCountdown(item.expiryDate)}</div>
                    )}

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.price || "--"}</span>
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

export default NewItems;
