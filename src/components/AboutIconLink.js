import React from "react";
import { FaQuestion } from "react-icons/fa";
//link is used when we are routing within the samewebsite i.e internally.
import { Link } from "react-router-dom";

function AboutIconLink() {
  return (
    <div className="about-link">
      <Link
        to={{
          pathname: "/about",
          //   Query params
          search: "?sort=name",
          hash: "#hello",
        }}
      >
        <FaQuestion size={10} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
