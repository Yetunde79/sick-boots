import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <div>
      <div className="bar">
        <a href="">Sick fits</a>
      </div>
      <Nav />
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
};

export default Header;
