import { filterProperties } from "../utils/filterProperties";

const props = [
  { id:"1", type:"house", price:500, bedrooms:3, dateAdded:"2025-12-01", postcodeArea:"NW1" },
  { id:"2", type:"flat",  price:300, bedrooms:1, dateAdded:"2025-11-01", postcodeArea:"BR1" },
  { id:"3", type:"house", price:900, bedrooms:5, dateAdded:"2025-10-15", postcodeArea:"NW1" }
];

test("filters by type", () => {
  const r = filterProperties(props, { type:"flat" });
  expect(r.map(p=>p.id)).toEqual(["2"]);
});

test("filters by minPrice/maxPrice", () => {
  const r = filterProperties(props, { type:"any", minPrice:400, maxPrice:800 });
  expect(r.map(p=>p.id)).toEqual(["1"]);
});

test("filters by bedroom range", () => {
  const r = filterProperties(props, { minBeds:2, maxBeds:4 });
  expect(r.map(p=>p.id)).toEqual(["1"]);
});

test("filters by date range", () => {
  const r = filterProperties(props, { dateFrom:new Date("2025-11-15"), dateTo:new Date("2025-12-31") });
  expect(r.map(p=>p.id)).toEqual(["1"]);
});

test("filters by postcodeArea", () => {
  const r = filterProperties(props, { postcodeArea:"nw1" });
  expect(r.map(p=>p.id)).toEqual(["1","3"]);
});
