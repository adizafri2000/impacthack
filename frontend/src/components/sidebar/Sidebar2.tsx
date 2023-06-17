import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
      <ProSidebar style={{ width: collapsed ? '80px' : '250px' }}>
        <Menu>
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components" defaultOpen={true}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
