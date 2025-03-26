import React, { useState, useEffect } from "react";
import "../styles/theme.css";

const ThemeToggle = () => {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;