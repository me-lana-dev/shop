import React from "react";
import { Link, useLocation } from "react-router-dom";

const Logo: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? (
        <span className="logo">Logo</span>
      ) : (
        <Link to="/" className="logo logo-link" state={{ currentlink: "/" }}>
          Logo
        </Link>
      )}
    </>
  );
};

export default Logo;
