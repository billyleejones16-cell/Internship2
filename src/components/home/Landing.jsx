import React from "react";
import NFT from "../../images/nft.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section
      id="section-hero"
      aria-label="section"
      style={{
        background: "#f5f3f8",
        minHeight: "calc(100vh - 74px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "1520px", position: "relative" }}>
        <div
          className="row align-items-center"
          style={{
            minHeight: "760px",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="col-lg-6 col-md-12"
            style={{
              paddingLeft: "42px",
              paddingRight: "24px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                color: "#6e61d5",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: "1.18rem",
                marginBottom: "18px",
              }}
            >
              Gigaland Market
            </div>

            <h1
              style={{
                fontSize: "clamp(3.5rem, 4vw, 6.1rem)",
                lineHeight: "0.92",
                letterSpacing: "-0.065em",
                fontWeight: 800,
                color: "#101114",
                margin: "0 0 20px",
                maxWidth: "750px",
              }}
            >
              Create, sell or collect digital items.
            </h1>

            <p
              style={{
                maxWidth: "680px",
                fontSize: "1.15rem",
                lineHeight: "1.65",
                color: "#2d2d36",
                margin: "0 0 36px",
              }}
            >
              Unit of data stored on a digital ledger, called a blockchain, that
              certifies a digital asset to be unique and therefore not
              interchangeable
            </p>

            <Link
              to="/explore"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #8a66f5 0%, #7d5ce3 100%)",
                color: "#fff",
                borderRadius: "14px",
                padding: "18px 42px",
                fontSize: "1.1rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 12px 20px rgba(120, 91, 220, 0.18)",
              }}
            >
              Explore
            </Link>
          </div>

          <div
            className="col-lg-6 col-md-12"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "640px",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-12%",
                top: "8%",
                width: "118%",
                height: "82%",
                background:
                  "linear-gradient(135deg, rgba(148, 128, 225, 0.10) 0%, rgba(149, 129, 232, 0.04) 60%, rgba(255,255,255,0) 100%)",
                borderRadius: "40% 0 0 40%",
                transform: "skewY(-8deg)",
              }}
            />
            <img
              src={NFT}
              alt=""
              style={{
                position: "relative",
                zIndex: 1,
                width: "min(86%, 710px)",
                maxWidth: "710px",
                height: "auto",
                filter: "drop-shadow(0 30px 40px rgba(115, 103, 202, 0.12))",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
