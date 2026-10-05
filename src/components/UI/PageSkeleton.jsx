import React from "react";
import Skeleton from "./Skeleton";
import "./Skeleton.css";

const PageSkeleton = ({ variant = "light" }) => {
  // Lightweight skeleton (default) to minimize DOM and improve initial render.
  if (variant === "light") {
    return (
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <Skeleton width="3rem" height="3rem" borderRadius="50%" />
          <div style={{ flex: 1 }}>
            <Skeleton width="35%" height="1rem" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: "0.5rem", borderRadius: "6px", background: "transparent" }}>
              <Skeleton width="100%" height="120px" borderRadius="6px" />
              <Skeleton width="60%" height="0.9rem" style={{ marginTop: "0.6rem" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full variant preserves the original, heavier layout for cases that need detailed placeholders.
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Skeleton width="3rem" height="3rem" borderRadius="50%" />
        <div style={{ flex: 1 }}>
          <Skeleton width="40%" height="1.25rem" />
          <Skeleton width="25%" height="0.9rem" style={{ marginTop: "0.5rem" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ padding: "0.75rem", borderRadius: "8px", background: "transparent" }}>
            <Skeleton width="100%" height="140px" borderRadius="8px" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Skeleton width="60%" height="0.95rem" />
                <Skeleton width="40%" height="0.85rem" style={{ marginTop: "0.5rem" }} />
              </div>
              <Skeleton width="3rem" height="3rem" borderRadius="8px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
