import React, { useState } from "react";

export default function PropertyTabs({ longDescription, floorPlan, mapEmbedUrl }) {
  const [tab, setTab] = useState("desc");

  return (
    <div>
      <div className="tabsBar">
        <button
          className={tab === "desc" ? "tabBtn active" : "tabBtn"}
          onClick={() => setTab("desc")}
        >
          Description
        </button>
        <button
          className={tab === "plan" ? "tabBtn active" : "tabBtn"}
          onClick={() => setTab("plan")}
        >
          Floor Plan
        </button>
        <button
          className={tab === "map" ? "tabBtn active" : "tabBtn"}
          onClick={() => setTab("map")}
        >
          Map
        </button>
      </div>

      <div className="tabPanel">
        {tab === "desc" && <p>{longDescription}</p>}

        {tab === "plan" && (
          <img className="floorPlan" src={floorPlan} alt="Floor plan" />
        )}

        {tab === "map" && (
          <div className="mapWrap">
            <iframe
              title="Google Map"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
}
