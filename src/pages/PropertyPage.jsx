import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../data/properties.json";

export default function PropertyPage() {
  const { id } = useParams();

  const property = useMemo(() => properties.find((p) => p.id === id), [id]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const imgs = property?.images?.length ? property.images : [];

  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const next = useCallback(() => {
    setActiveIndex((i) => (imgs.length ? (i + 1) % imgs.length : 0));
  }, [imgs.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (imgs.length ? (i - 1 + imgs.length) % imgs.length : 0));
  }, [imgs.length]);

  // ESC key close + Arrow keys
  useEffect(() => {
    const handler = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox, next, prev]);

  if (!property) {
    return (
      <div className="ppWrap">
        <div className="ppCard">
          <h2>Property not found</h2>
          <Link className="ppBtn" to="/">Back to Search</Link>
        </div>
      </div>
    );
  }

  const hero = imgs[0];
  const side1 = imgs[1];
  const side2 = imgs[2];
  const thumbs = imgs.slice(0, 6);

  const safeMapUrl =
    property.mapEmbedUrl && property.mapEmbedUrl.trim().length > 0
      ? property.mapEmbedUrl
      : "https://maps.google.com/maps?q=London&output=embed";

  return (
    <div className="ppWrap">
      <div className="ppTopBar">
        <Link className="ppBack" to="/">← Back</Link>
        <div>
          <h1 className="ppTitle">{property.title}</h1>
          <div className="ppMeta">
            <span>{property.location}</span>
            <span>•</span>
            <span>LKR{Number(property.price).toLocaleString()}</span>
            <span>•</span>
            <span>{property.bedrooms} beds</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="ppMainGrid">
        {/* GALLERY */}
        <section className="ppGallery">
          <div className="ppGalleryGrid">
            <button className="ppHero" type="button" onClick={() => openLightbox(0)}>
              {hero ? <img src={hero} alt={property.title} /> : <div className="ppImgFallback" />}
            </button>

            <div className="ppSide">
              <button className="ppSideImg" type="button" onClick={() => openLightbox(1)}>
                {side1 ? <img src={side1} alt={`${property.title} view 2`} /> : <div className="ppImgFallback" />}
              </button>

              <button className="ppSideImg" type="button" onClick={() => openLightbox(2)}>
                {side2 ? <img src={side2} alt={`${property.title} view 3`} /> : <div className="ppImgFallback" />}
              </button>
            </div>
          </div>

          <div className="ppThumbRow">
            {thumbs.map((src, i) => (
              <button
                key={src + i}
                className="ppThumbBtn"
                type="button"
                onClick={() => openLightbox(i)}
              >
                <img src={src} alt={`${property.title} thumbnail ${i + 1}`} />
                {i === 5 && imgs.length > 6 && (
                  <span className="ppMoreOverlay">+{imgs.length - 6} photos</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="ppSidebar">
          <div className="ppCard">
            <div className="ppScoreRow">
              <div>
                <div className="ppScoreTitle">Wonderful</div>
                <div className="ppScoreSub">415 reviews</div>
              </div>
              <div className="ppScorePill">9.3</div>
            </div>
            <div className="ppQuote">
              “Rooms were very comfortable and clean. The location was also easily accessible.”
            </div>
            <div className="ppStaffRow">
              <div>
                <div className="ppStaffTitle">Staff</div>
                <div className="ppScoreSub">Guest rating</div>
              </div>
              <div className="ppMiniPill">9.6</div>
            </div>
          </div>

          <div className="ppCard">
            <div className="ppMapTitle">Location</div>
            <div className="ppMapBox">
              <iframe
                title="Property map"
                src={safeMapUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </div>

      {/* FLOOR PLAN SECTION */}
      <div className="ppBottomGrid" style={{ marginTop: 16 }}>
        <section className="ppCard">
          <h2 className="ppH2">About this property</h2>
          <p className="ppText">{property.longDescription}</p>
        </section>

        <section className="ppCard">
          <h2 className="ppH2">Floor plan</h2>

          {property.floorPlan ? (
            <button
              className="ppFloorBtn"
              type="button"
              onClick={() => {
                setLightboxOpen(true);
                setActiveIndex(-1);
              }}
            >
              <img className="ppFloorImg" src={property.floorPlan} alt={`${property.title} floor plan`} />
              <span className="ppFloorHint">Click to view larger</span>
            </button>
          ) : (
            <p>No floor plan available.</p>
          )}
        </section>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lbBackdrop" onClick={closeLightbox}>
          <div className="lbModal" onClick={(e) => e.stopPropagation()}>
            <button className="lbClose" onClick={closeLightbox} type="button">
              ✕
            </button>

            <button className="lbNav left" onClick={prev} type="button" disabled={imgs.length === 0}>
              ‹
            </button>

            <div className="lbImgWrap">
              {activeIndex === -1 ? (
                <img src={property.floorPlan} alt={`${property.title} floor plan`} />
              ) : (
                // ✅ Removed the word "photo" to fix eslint warning
                <img src={imgs[activeIndex]} alt={`${property.title} ${activeIndex + 1}`} />
              )}
            </div>

            <button className="lbNav right" onClick={next} type="button" disabled={imgs.length === 0}>
              ›
            </button>

            <div className="lbCaption">
              {activeIndex === -1 ? "Floor plan" : `${activeIndex + 1} / ${imgs.length}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
