import React from "react";
import { Link } from "react-router-dom";
import { useDrop } from "react-dnd";
import { DND_TYPES } from "./PropertyCard";

export default function FavouritesSidebar({
  favourites,
  favouriteIds,
  onDropAdd,
  onRemove,
  onClear
}) {
  // Drop zone to ADD favourites
  const [{ isOverAdd }, addDropRef] = useDrop(() => ({
    accept: DND_TYPES.PROPERTY,
    drop: (item) => onDropAdd(item.id),
    collect: (monitor) => ({ isOverAdd: monitor.isOver() })
  }));

  // Drop zone to REMOVE favourites (drag a favourite card and drop here)
  const [{ isOverRemove }, removeDropRef] = useDrop(() => ({
    accept: DND_TYPES.PROPERTY,
    drop: (item) => {
      if (favouriteIds.includes(item.id)) onRemove(item.id);
    },
    collect: (monitor) => ({ isOverRemove: monitor.isOver() })
  }));

  return (
    <div className="card sticky">
      <h2>Favourites</h2>

      <div ref={addDropRef} className={`dropZone ${isOverAdd ? "dropActive" : ""}`}>
        Drop here to add
      </div>

      <div className="favList">
        {favourites.length === 0 ? (
          <p className="muted">No favourites yet.</p>
        ) : (
          favourites.map((p) => (
            <div className="favItem" key={p.id}>
              <img className="favThumb" src={p.mainImage} alt={p.title} />
              <div className="favInfo">
                <Link to={`/property/${p.id}`}>{p.title}</Link>
                <div className="row">
                  <button className="btnDanger" onClick={() => onRemove(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div ref={removeDropRef} className={`dropZone removeZone ${isOverRemove ? "dropActive" : ""}`}>
        Drop here to remove
      </div>

      <button className="btnOutline full" onClick={onClear} disabled={favourites.length === 0}>
        Clear favourites
      </button>
    </div>
  );
}
