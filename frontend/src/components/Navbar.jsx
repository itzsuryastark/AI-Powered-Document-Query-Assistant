import React from "react";
import ThemeToggle from "./ThemeToggle";
import "../styles/global.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">AI-Powered Document Query Assistant</h1>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
