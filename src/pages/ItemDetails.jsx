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

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const [hotResponse, newResponse] = await Promise.all([
          fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
          fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
        ]);

        const hotData = await hotResponse.json();
        const newData = await newResponse.json();

        const allNFTs = [
          ...(Array.isArray(hotData) ? hotData : []),
          ...(Array.isArray(newData) ? newData : []),
        ];

        const selectedNFT = allNFTs.find(
          (item) => String(item.nftId) === String(nftId) || String(item.id) === String(nftId)
        );

        setNft(selectedNFT || null);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
        setNft(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!nft) {
    return <h2>NFT not found</h2>;
  }

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

                    <div className="item_info_counts">
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes || 0}
                      </div>
                    </div>

                    <p>NFT ID: {nft.nftId || nft.id}</p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.authorId || ""}`}>
                              <img src={nft.authorImage || AuthorImage} alt={nft.title || "Author"} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.authorId || ""}`}>
                              Author #{nft.authorId || "Unknown"}
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
                            <Link to={`/author/${nft.authorId || ""}`}>
                              <img src={nft.authorImage || AuthorImage} alt={nft.title || "Author"} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.authorId || ""}`}>
                              Author #{nft.authorId || "Unknown"}
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
