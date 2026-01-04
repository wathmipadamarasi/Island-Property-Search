import React, { useState, useMemo } from "react";
import properties from "../data/properties.json";

import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";
import FavouritesSidebar from "../components/FavouritesSidebar";

import { filterProperties } from "../utils/filterProperties";
import { useFavourites } from "../utils/useFavourites";

export default function SearchPage() {
  const [criteria, setCriteria] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateFrom: null,
    dateTo: null,
    postcodeArea: ""
  });

  const { favouriteIds, favourites, addFavourite, removeFavourite, clearFavourites } =
    useFavourites(properties);

  const results = useMemo(() => filterProperties(properties, criteria), [criteria]);

  return (
    <div className="page">
      <header className="topbar">
        <h1>Island Property Search</h1>
        <p className="subtitle">Search and save favourites</p>
      </header>

      <div className="layout">
        <main className="main">
          <section className="card">
            <h2>Search</h2>
            <SearchForm criteria={criteria} onChange={setCriteria} />
          </section>

          <section className="card">
            <h2>Results</h2>
            <ResultsList
              properties={results}
              favouriteIds={favouriteIds}
              onFavourite={addFavourite}
            />
          </section>
        </main>

        <aside className="sidebar">
          <FavouritesSidebar
            favourites={favourites}
            favouriteIds={favouriteIds}
            onDropAdd={addFavourite}
            onRemove={removeFavourite}
            onClear={clearFavourites}
          />
        </aside>
      </div>
    </div>
  );
}
