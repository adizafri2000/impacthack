import React from "react";
import { Link } from "react-router-dom";
// import ewris2 from "../../assets/svgs/ewris2.svg";

type Props = {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
};

const Header = ({ heading, paragraph, linkName, linkUrl = "#" }: Props) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        KAS TURI
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-5 text-center text-sm text-gray-600 ">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;