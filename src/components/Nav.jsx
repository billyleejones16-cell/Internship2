import React from "react";
import Logo from "../images/Ultraverse.png";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Nav = () => {
  const openNav = () => {
    document.body.classList += "menu__open";
  };

  const closeNav = () => {
    document.body.classList.remove("menu__open");
  };

  return (
    <header
      className="transparent header-light scroll-light smaller"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(24, 24, 36, 0.08)",
        height: "74px",
      }}
    >
      <div className="container" style={{ maxWidth: "1520px", height: "100%" }}>
        <div className="row" style={{ height: "100%", margin: 0 }}>
          <div className="col-md-12" style={{ height: "100%", padding: 0 }}>
            <div
              className="de-flex sm-pt10"
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className="de-flex-col"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div id="logo" style={{ margin: 0 }}>
                  <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                    <img
                      alt=""
                      className="logo-2"
                      src={Logo}
                      style={{ height: "42px", width: "auto" }}
                    />
                  </Link>
                </div>

                <div style={{ flex: 1, minWidth: 0, maxWidth: "470px" }}>
                  <input
                    id="quick_search"
                    className="xs-hide"
                    name="quick_search"
                    placeholder="search item here..."
                    type="text"
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "14px",
                      background: "#f1eff6",
                      border: "1px solid rgba(18, 18, 18, 0.03)",
                      color: "#2d2d36",
                      padding: "0 18px",
                      fontSize: "1.06rem",
                      boxShadow: "none",
                    }}
                  />
                </div>
              </div>

              <div className="de-flex-col header-col-mid" style={{ marginLeft: "auto" }}>
                <ul
                  id="mainmenu"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "26px",
                    margin: 0,
                    listStyle: "none",
                  }}
                  className="d-none d-lg-flex"
                >
                  <li className="menu-item-has-children has-child">
                    <Link to="/" style={{ fontWeight: 500, fontSize: "1.08rem" }}>
                      Home<span></span>
                    </Link>
                  </li>
                  <li className="menu-item-has-children has-child">
                    <Link to="/explore" style={{ fontWeight: 500, fontSize: "1.08rem" }}>
                      Explore<span></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="btn-main connect-wallet"
                      onClick={() =>
                        alert("This feature has not been implemented yet")
                      }
                      style={{
                        borderRadius: "12px",
                        padding: "12px 20px",
                        fontWeight: 700,
                        minWidth: "150px",
                        textAlign: "center",
                        fontSize: "1.05rem",
                        lineHeight: 1.2,
                        boxShadow: "none",
                      }}
                    >
                      Connect wallet
                    </Link>
                  </li>
                </ul>

                <div
                  className="menu_side_area d-block d-lg-none"
                  style={{ marginLeft: "12px" }}
                >
                  <span onClick={() => openNav()} id="menu-btn"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul id="dropdown__wrapper">
        <li className="dropdown__list">
          <Link to="/" onClick={() => closeNav()}>
            Home
          </Link>
        </li>
        <li className="dropdown__list">
          <Link to="/explore" onClick={() => closeNav()}>
            Explore
          </Link>
        </li>
        <li className="close__button">
          <button onClick={() => closeNav()}>
            <FaTimes />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
