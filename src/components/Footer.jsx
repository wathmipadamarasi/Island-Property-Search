import React from "react";

export default function Footer() {
  return (
    <footer className="appFooter">
      <div className="footerContent">
        <p>© {new Date().getFullYear()} Island Property Search</p>
        <p>Island Property Search is online property search service.</p>
      </div>
    </footer>
  );
}
