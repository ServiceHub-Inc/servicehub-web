import { useState } from "react";
import { SideMenu, Button, Group, MenuItem } from "@mantine/core";

function SideBar() {
  const [opened, setOpened] = useState(true);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideMenu opened={opened} onClose={() => setOpened(false)}>
        <Group title="Main Menu">
          <MenuItem icon={<span>🏠</span>}>Dashboard</MenuItem>
          <MenuItem icon={<span>📦</span>}>Products</MenuItem>
          <MenuItem icon={<span>📑</span>}>Orders</MenuItem>
          <MenuItem icon={<span>👥</span>}>Customers</MenuItem>
        </Group>
        <Group title="Settings">
          <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
          <MenuItem icon={<span>⚙️</span>}>Preferences</MenuItem>
          <MenuItem icon={<span>🔒</span>}>Security</MenuItem>
        </Group>
      </SideMenu>
      <Button onClick={toggleOpened}>
        {opened ? "Close" : "Open"} sidebar
      </Button>
    </div>
  );
}

export default SideBar;
