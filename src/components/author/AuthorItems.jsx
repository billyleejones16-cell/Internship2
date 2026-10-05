import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items = [], authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => {
            const nft = item;
            const itemId = nft.nftId || nft.id || index;
            const itemImage = nft.nftImage;
            const itemTitle = nft.title;
            const itemPrice = nft.price;
            const itemLikes = nft.likes;

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={itemId}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="#">
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
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
                    <Link to={`/item-details/${itemId}`}>
                      <img
                        src={itemImage}
                        className="lazy nft__item_preview"
                        alt={itemTitle}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${itemId}`}>
                      <h4>{itemTitle}</h4>
                    </Link>
                    <div className="nft__item_price">{itemPrice} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{itemLikes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
