import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../data/properties.json";

import ImageGallery from "./ImageGallery";
import PropertyTabs from "./PropertyTabs";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = useMemo(() => properties.find((p) => p.id === id), [id]);

  if (!property) {
    return (
      <div className="page">
        <div className="card">
          <h2>Property not found</h2>
          <Link className="btnOutline" to="/">← Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="topbar">
        <h1>{property.title}</h1>
        <p className="subtitle">
          {property.location} • LKR{property.price.toLocaleString()} • {property.bedrooms} beds
        </p>
        <Link className="btnOutline" to="/">← Back to search</Link>
      </header>

      <section className="card">
        <h2>Gallery</h2>
        <ImageGallery images={property.images} />
      </section>

      <section className="card">
        <h2>Details</h2>
        <PropertyTabs
          longDescription={property.longDescription}
          floorPlan={property.floorPlan}
          mapEmbedUrl={property.mapEmbedUrl}
        />
      </section>
    </div>
  );
}
