import React from "react";
import "./CategoriesGrid.scss";

// importing svg

import { categories } from "../../data";
import { Link } from "react-router-dom";
// import { useLayoutEffect, useRef, useState } from "react";

export default function CategoriesGrid() {
  return (
    <div className="categories">
      {categories.map(({ id, Image, title }) => (
        <Card key={id} Image={Image} title={title} />
      ))}
    </div>
  );
}

function Card({ Image, title }) {

  return (
    <Link to="/gigs">
      <div className="card">
        <Image />
      </div>
      <h3>{title}</h3>
    </Link>
  );
}
