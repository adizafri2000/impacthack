import React, { ReactNode, useState } from "react";
import { TiThSmall } from "react-icons/ti";
import { RiSettings5Line, RiToolsLine } from "react-icons/ri";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { AiOutlineDatabase } from "react-icons/ai";
import { NavLink } from "react-router-dom";

type Menu = {
  name: string;
  icon: ReactNode;
  link: string;
  submenu?: Array<SubMenu>;
};

type SubMenu = {
  name: string;
  link: string;
};

const menu: Array<Menu> = [
  { name: "Dashboard", icon: <TiThSmall size={20} />, link: "/" },
  {
    name: "Cash Flow",
    icon: <AiOutlineDatabase size={20} />,
    link: "cashflow",
  },
  {
    name: "Inventory",
    icon: <RiToolsLine size={20} />,
    link: "inventory",
  },
  { name: "Projection", icon: <RiSettings5Line size={20} />, link: "projection" },
];

let activeClassName: string = "text-white";
let activeClassName2: string = "text-white";

export default function Sidebar() {
  const [activeIndexes, setActiveIndexes] = useState<{
    [index: number]: boolean;
  }>(() => {
    const indexes: any = {};
    menu.forEach((val, index) => {
      if (val.submenu) {
        indexes[index] = true;
      }
    });
    return indexes;
  });

  return (
    <div className="min-h-screen border-r border-gray-200 bg-white w-64 px-4 h-screen sticky top-0">
      <div className="flex place-content-center">
        <div className=" w-32 h-32">KAS TURI</div>
      </div>
      <div className="space-y-8">
        <ul className="">
          {menu.map((val, index) => {
            if (val.submenu) {
              const isActive = activeIndexes[index] || false;
              return (
                <li key={index}>
                  <button
                    className="flex flex-row w-full items-center py-2 px-4 justify-between rounded-lg"
                    onClick={() =>
                      setActiveIndexes({ ...activeIndexes, [index]: !isActive })
                    }
                  >
                    <div className="flex flex-row">
                      <div className="mr-4">{val.icon}</div>
                      <div className="text-gray-700 text-lg">{val.name}</div>
                    </div>
                    <div className="ml-4"> {isActive ? ( <FiChevronRight size={20} /> ) : ( <FiChevronDown size={20} /> )} </div>
                  </button>
                  {isActive ? null : (
                    <ul className="space-y-2 mb-4">
                      {val.submenu.map((submenu, i) => (
                        <li key={i}>
                          <NavLink to={submenu.link} className="flex text-gray-700 text-lg place-content-center" >
                            {({ isActive }) => (
                              <div className={` ${ isActive ? activeClassName2 : undefined }`} >
                                {submenu.name}
                              </div>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            } else {
              return (<li key={index}>
                  <NavLink to={val.link} className="flex flex-row items-center py-3 px-4 rounded-lg" >
                    {({ isActive }) => (
                      <>
                        <div className={`mr-4 ${ isActive ? activeClassName : undefined }`} > {val.icon} </div>
                        <div className={`text-gray-700 text-lg ${ isActive ? activeClassName : undefined }`} > {val.name} </div>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
