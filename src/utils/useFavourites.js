import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "estate_agent_favourites";

export function addFavourite(list, id) {
  if (!id) return list;
  return list.includes(id) ? list : [...list, id];
}

export function removeFavourite(list, id) {
  return list.filter((x) => x !== id);
}

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useFavourites(allProperties = []) {
  const [favouriteIds, setFavouriteIds] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch {
      // ignore
    }
  }, [favouriteIds]);

  const favourites = useMemo(() => {
    return allProperties.filter((p) => favouriteIds.includes(p.id));
  }, [allProperties, favouriteIds]);

  const handleAddFavourite = (id) => {
    setFavouriteIds((prev) => addFavourite(prev, id));
  };

  const handleRemoveFavourite = (id) => {
    setFavouriteIds((prev) => removeFavourite(prev, id));
  };

  const clearFavourites = () => setFavouriteIds([]);

  return {
    favouriteIds,
    favourites,
    addFavourite: handleAddFavourite,
    removeFavourite: handleRemoveFavourite,
    clearFavourites,
  };
}
