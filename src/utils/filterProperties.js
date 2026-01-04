export function filterProperties(properties, c) {
  const type = c.type || "any";
  const minPrice = c.minPrice ? Number(c.minPrice) : null;
  const maxPrice = c.maxPrice ? Number(c.maxPrice) : null;
  const minBeds = c.minBeds ? Number(c.minBeds) : null;
  const maxBeds = c.maxBeds ? Number(c.maxBeds) : null;

  const dateFrom = c.dateFrom ? new Date(c.dateFrom) : null;
  const dateTo = c.dateTo ? new Date(c.dateTo) : null;

  const postcodeArea = (c.postcodeArea || "").trim().toUpperCase();

  return properties.filter((p) => {
    // Type
    if (type !== "any" && p.type !== type) return false;

    // Price
    if (minPrice !== null && p.price < minPrice) return false;
    if (maxPrice !== null && p.price > maxPrice) return false;

    // Bedrooms
    if (minBeds !== null && p.bedrooms < minBeds) return false;
    if (maxBeds !== null && p.bedrooms > maxBeds) return false;

    // Date added
    const pDate = new Date(p.dateAdded);
    if (dateFrom && pDate < dateFrom) return false;
    if (dateTo && pDate > dateTo) return false;

    // Postcode area (first part)
    if (postcodeArea && String(p.postcodeArea).toUpperCase() !== postcodeArea) return false;

    return true;
  });
}
