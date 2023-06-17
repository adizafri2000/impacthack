import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type ListItemProps = {
  name: string;
  icon: ReactNode;
  link: string;
};

const ListItemButton = ({ name, icon, link }: ListItemProps) => {
  return (
    <Link to={link} className="mb-7 flex flex-row items-center">
      <div className="mr-4">{icon}</div>
      <div className="text-gray-700">{name}</div>
    </Link>
  );
};

export default ListItemButton;
