import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="appWrapper">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
       <Footer />
      </div>
    </DndProvider>
  );
}
