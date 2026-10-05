import React from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import PageSkeleton from "../components/UI/PageSkeleton";
import { DelayedContent } from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isFollowing, setIsFollowing] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;

    const fetchAuthor = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setAuthor(null);
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 1300;
        const remaining = Math.max(0, minDelay - elapsed);
        timeoutId = setTimeout(() => setLoading(false), remaining);
      }
    };

    if (id) {
      fetchAuthor();
    }

    return () => clearTimeout(timeoutId);
  }, [id]);

  if (loading) {
    return <PageSkeleton variant="author" />;
  }

  if (!author) {
    return <PageSkeleton />;
  }

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const nextValue = !prev;

      setAuthor((currentAuthor) => {
        if (!currentAuthor) return currentAuthor;

        const currentFollowers = Number(currentAuthor.followers) || 0;
        const updatedFollowers = nextValue ? currentFollowers + 1 : currentFollowers - 1;

        return {
          ...currentAuthor,
          followers: updatedFollowers,
        };
      });

      return nextValue;
    });
  };

  return (
    <DelayedContent delay={1000}>
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollowToggle}
                        style={{ border: "none", cursor: "pointer" }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={author.nftCollection || []}
                      authorImage={author.authorImage}
                    />
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

export default Author;
