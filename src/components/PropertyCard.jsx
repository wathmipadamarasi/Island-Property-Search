import React from "react";
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";

export const DND_TYPES = { PROPERTY: "PROPERTY" };

export default function PropertyCard({ property, isFavourite, onFavourite }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DND_TYPES.PROPERTY,
    item: { id: property.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  const date = property.dateAdded ? String(property.dateAdded) : "";

  return (
    <div
      ref={dragRef}
      className="bkCard"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Left image */}
      <div className="bkImgWrap">
        <img src={property.mainImage} alt={property.title} className="bkImg" />
      </div>

      {/* Middle info */}
      <div className="bkInfo">
        <h3 className="bkTitle">{property.title}</h3>
        <div className="bkSub">{property.location}</div>
        <p className="bkDesc">{property.shortDescription}</p>

        <div className="bkMeta">
          <span>{property.bedrooms} beds</span>
          <span>•</span>
          <span>{property.postcodeArea}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        <div className="bkActions">
          <Link className="bkBtnPrimary" to={`/property/${property.id}`}>
            View
          </Link>

          <button className="bkBtnGhost" onClick={onFavourite}>
            {isFavourite ? "★ Favourited" : "☆ Favourite"}
          </button>

          <span className="bkHint">Drag this card into Favourites →</span>
        </div>
      </div>

      {/* Right price + rating */}
      <div className="bkRight">
        <div className="bkRating">
          <div className="bkRatingText">
            <div className="bkRatingLabel">Wonderful</div>
            <div className="bkRatingSub">415 reviews</div>
          </div>
          <div className="bkRatingBadge">9.3</div>
        </div>

        <div className="bkPrice">
          LKR {Number(property.price).toLocaleString("en-US")}
        </div>
        <div className="bkSmall">Includes taxes and fees</div>
      </div>
    </div>
  );
}
