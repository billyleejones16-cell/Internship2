import Skeleton from "react-loading-skeleton";

const PageSkeleton = ({
  variant = "page",
  cardCount = 4,
  rowCount = 4,
}) => {
  const renderHero = () => (
    <div className="row mb-4">
      <div className="col-12">
        <Skeleton height={280} />
      </div>
    </div>
  );

  const renderDetail = () => (
    <div className="row">
      <div className="col-md-6 mb-4">
        <Skeleton height={500} />
      </div>
      <div className="col-md-6">
        <Skeleton height={40} width={260} />
        <div className="mt-3">
          <Skeleton height={20} width={180} />
        </div>
        <div className="mt-3">
          <Skeleton count={rowCount} />
        </div>
        <div className="mt-4">
          <Skeleton height={44} width={150} />
        </div>
      </div>
    </div>
  );

  const renderAuthor = () => (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <Skeleton height={220} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <Skeleton height={220} />
        </div>
        <div className="col-md-8">
          <Skeleton height={40} width={260} />
          <div className="mt-3">
            <Skeleton height={22} width={180} />
          </div>
          <div className="mt-3">
            <Skeleton count={3} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Skeleton height={180} />
        </div>
      </div>
    </>
  );

  const renderCards = () => (
    <div className="row">
      {Array.from({ length: cardCount }).map((_, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
          <Skeleton height={200} />
          <div className="mt-3">
            <Skeleton height={18} width="80%" />
          </div>
          <div className="mt-2">
            <Skeleton height={18} width="40%" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mt-5">
      {variant === "page" && renderHero()}
      {(variant === "page" || variant === "detail") && renderDetail()}
      {variant === "author" && renderAuthor()}
      {(variant === "cards" || variant === "list") && renderCards()}
    </div>
  );
};

export default PageSkeleton;