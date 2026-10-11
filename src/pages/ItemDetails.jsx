import React, { useEffect, useState } from "react";
import PageSkeleton from "../components/UI/PageSkeleton";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { DelayedContent } from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeAuthor = (item, fallbackLabel = "Unknown") => {
    const owner = item?.owner ?? {};
    const creator = item?.creator ?? {};
    const author = item?.author ?? {};

    return {
      id: owner.id ?? creator.id ?? author.id ?? item?.ownerId ?? item?.creatorId ?? item?.authorId ?? "",
      name: owner.name ?? creator.name ?? author.name ?? item?.ownerName ?? item?.creatorName ?? item?.authorName ?? fallbackLabel,
      image: owner.image ?? creator.image ?? author.image ?? item?.ownerImage ?? item?.creatorImage ?? item?.authorImage ?? AuthorImage,
    };
  };

  useEffect(() => {
    let timeoutId;

    const fetchNFT = async () => {
      const startTime = Date.now();

      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const selectedNFT = Array.isArray(data) ? data[0] : data;

        setNft(selectedNFT || null);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
        setNft(null);
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 1300;
        const remaining = Math.max(0, minDelay - elapsed);
        timeoutId = setTimeout(() => setLoading(false), remaining);
      }
    };

    if (!nftId) {
      setNft(null);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    fetchNFT();
    return () => clearTimeout(timeoutId);
  }, [nftId]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!nft) {
    return <h2>NFT not found</h2>;
  }

  const owner = normalizeAuthor(nft, "Owner unavailable");
  const creator = normalizeAuthor(
    {
      ...nft,
      owner: nft.owner ?? nft,
      creator: nft.creator ?? nft,
      author: nft.author ?? nft,
    },
    "Creator unavailable"
  );

  return (
    <DelayedContent delay={1000}>
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nft.title || "NFT item"}
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nft.title}</h2>
                    <div className="item_title_id" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginTop: "0.25rem" }}>
                      #{nft.nftId}
                    </div>

                    <div className="item_info_counts">
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes || 0}
                      </div>
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft.views || 0}
                      </div>
                    </div>

                    <div className="spacer-10"></div>

                    <h6>Description</h6>
                    <p>{nft.description || "No description available."}</p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={owner.id ? `/author/${owner.id}` : "#"}>
                              <img
                                src={owner.image}
                                alt={owner.name || "Owner unavailable"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={owner.id ? `/author/${owner.id}` : "#"}>
                              {owner.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={creator.id ? `/author/${creator.id}` : "#"}>
                              <img
                                src={creator.image}
                                alt={creator.name || "Creator unavailable"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={creator.id ? `/author/${creator.id}` : "#"}>
                              {creator.name}
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="ETH" />
                        <span>{Number(nft.price || 0).toFixed(2)}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DelayedContent>
  );
};

export default ItemDetails;
