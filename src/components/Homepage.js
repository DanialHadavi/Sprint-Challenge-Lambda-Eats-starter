import React from "react";

import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <ul>
              <li>Home</li>
              <li>Menu</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </nav>

          <Link to="/pizza/">
            <div className="btn">
              <div className="button1 bouncy">Order Now</div>
            </div>
          </Link>
        </header>
      </div>
    </>
  );
};
export default Homepage;
