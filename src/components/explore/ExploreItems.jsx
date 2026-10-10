import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageSkeleton from "../home/PageSkeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  const refreshItems = (selectedFilter = "") => {
    setVisibleCount(8);
    setLoading(true);

    const fetchExploreItems = async () => {
      const startTime = Date.now();

      try {
        const query = selectedFilter ? `?filter=${selectedFilter}` : "";
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${query}`
        );
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setItems(data || []);
      } catch (fetchError) {
        console.error("Explore API error:", fetchError);
        setError(fetchError.message || "Failed to load explore items.");
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 1300;
        const remaining = Math.max(0, minDelay - elapsed);

        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    };

    fetchExploreItems();
  };

  useEffect(() => {
    refreshItems(filter);
  }, [filter]);

  useEffect(() => {
    refreshItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};

      items.forEach((item) => {
        if (!item.expiryDate) {
          updatedCountdowns[item.id] = "00:00:00";
          return;
        }

        const expiryTime = typeof item.expiryDate === "string"
          ? new Date(item.expiryDate).getTime()
          : item.expiryDate;

        const distance = expiryTime - Date.now();
        if (!expiryTime || distance <= 0) {
          updatedCountdowns[item.id] = "00:00:00";
          return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updatedCountdowns[item.id] =
          `${String(hours).padStart(2, "0")}:` +
          `${String(minutes).padStart(2, "0")}:` +
          `${String(seconds).padStart(2, "0")}`;
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setFilter(selectedValue);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading && <PageSkeleton variant="cards" cardCount={8} />}
      {error && <div className="text-danger">Error: {error}</div>}

      {!loading && !error && (
        visibleItems.map((item, index) => (
          <div
            key={item.nftId || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={item.author}
                >
                  <img
                    className="lazy"
                    src={item.authorImage || AuthorImage}
                    alt={item.author || "author"}
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {item.expiryDate && (
                <div className="de_countdown">
                  {countdowns[item.id] || "00:00:00"}
                </div>
              )}

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
                    alt={item.title || "NFT"}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title || "Untitled"}</h4>
                </Link>
                <div className="nft__item_price">
                  {item.price ? `${item.price} ETH` : "0.00 ETH"}
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="col-md-12 text-center">
        {hasMore && (
          <button
            onClick={loadMore}
            className="btn-main lead"
            type="button"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
