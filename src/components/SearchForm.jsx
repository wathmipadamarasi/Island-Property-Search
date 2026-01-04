import React from "react";
import Select from "react-select";

const typeOptions = [
  { value: "any", label: "Any" },
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" }
];

export default function SearchForm({ criteria, onChange }) {
  const set = (patch) => onChange({ ...criteria, ...patch });

  return (
    <div className="formGrid">
      <div className="field">
        <label>Type</label>
        <Select
          options={typeOptions}
          value={typeOptions.find((o) => o.value === criteria.type) || typeOptions[0]}
          onChange={(opt) => set({ type: opt ? opt.value : "any" })}
        />
      </div>

      <div className="field">
        <label>Min Price</label>
        <input
          type="number"
          value={criteria.minPrice}
          onChange={(e) => set({ minPrice: e.target.value })}
          placeholder="e.g. 300000"
        />
      </div>

      <div className="field">
        <label>Max Price</label>
        <input
          type="number"
          value={criteria.maxPrice}
          onChange={(e) => set({ maxPrice: e.target.value })}
          placeholder="e.g. 900000"
        />
      </div>

      <div className="field">
        <label>Min Bedrooms</label>
        <input
          type="number"
          value={criteria.minBeds}
          onChange={(e) => set({ minBeds: e.target.value })}
          placeholder="e.g. 2"
        />
      </div>

      <div className="field">
        <label>Max Bedrooms</label>
        <input
          type="number"
          value={criteria.maxBeds}
          onChange={(e) => set({ maxBeds: e.target.value })}
          placeholder="e.g. 4"
        />
      </div>

      <div className="field">
        <label>Date Added (From)</label>
        <input
          type="date"
          value={criteria.dateFrom ? String(criteria.dateFrom).slice(0, 10) : ""}
          onChange={(e) => set({ dateFrom: e.target.value || null })}
        />
      </div>

      <div className="field">
        <label>Date Added (To)</label>
        <input
          type="date"
          value={criteria.dateTo ? String(criteria.dateTo).slice(0, 10) : ""}
          onChange={(e) => set({ dateTo: e.target.value || null })}
        />
      </div>

      <div className="field">
        <label>Postcode Area (e.g. NW1)</label>
        <input
          value={criteria.postcodeArea}
          onChange={(e) => set({ postcodeArea: e.target.value })}
          placeholder="NW1"
        />
      </div>
    </div>
  );
}
