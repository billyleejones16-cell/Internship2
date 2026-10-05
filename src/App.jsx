import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details/:nftId" element={<ItemDetails />} />
        </Routes>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
