import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, Dashboard, Settings, Menu } from "@mui/icons-material";

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List style={{ width: 250 }}>
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const SidebarWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} style={{ margin: "10px" }}>
        <Menu />
      </IconButton>
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SidebarWrapper;
