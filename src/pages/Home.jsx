import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import PageSkeleton from "../components/UI/PageSkeleton";
import { DelayedContent } from "../components/UI/Skeleton";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DelayedContent delay={1000} fallback={<PageSkeleton />}>
      <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
      </div>
    </DelayedContent>
  );
};

export default Home;
