import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PageSkeleton from "./components/home/PageSkeleton";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Author = lazy(() => import("./pages/Author"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));

function App() {
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Suspense fallback={<PageSkeleton variant="page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/item-details/:nftId" element={<ItemDetails />} />
          </Routes>
        </Suspense>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
