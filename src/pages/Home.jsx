import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSeller";
import PageSkeleton from "../components/UI/PageSkeleton";
import { DelayedContent } from "../components/UI/Skeleton";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DelayedContent delay={1000} fallback={<PageSkeleton />}>
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <Landing searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <LandingIntro />
          <HotCollections searchTerm={searchTerm} />
          <NewItems />
          <TopSellers />
          <BrowseByCategory />
        </div>
      </div>
    </DelayedContent>
  );
};

export default Home;
