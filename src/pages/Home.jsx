import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import PageSkeleton from "../components/home/PageSkeleton";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <PageSkeleton variant="page" />;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <LandingIntro />
        <HotCollections searchTerm={searchTerm} />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
