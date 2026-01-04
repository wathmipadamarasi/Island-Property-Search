import React from "react";
import PropertyCard from "./PropertyCard";

export default function ResultsList({ properties, favouriteIds, onFavourite }) {
  if (!properties?.length) return <p>No results found.</p>;

  return (
    <div className="bkList">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFavourite={favouriteIds?.includes(p.id)}
          onFavourite={() => onFavourite(p.id)}
        />
      ))}
    </div>
  );
}
