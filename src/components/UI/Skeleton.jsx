import React, { useEffect, useState } from "react";
import "./Skeleton.css";

const Skeleton = ({ width = "100%", height = "1rem", borderRadius = "4px", style }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        display: "inline-block",
        ...style,
      }}
    />
  );
};

const DelayedContent = ({ children, delay = 1000, fallback = null }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (ready) return <>{children}</>;
  if (fallback) return fallback;

  return (
    <div style={{ padding: "1rem" }}>
      <Skeleton width="35%" height="1.1rem" />
      <div style={{ height: "0.6rem" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </div>
    </div>
  );
};

export default Skeleton;
export { DelayedContent };
