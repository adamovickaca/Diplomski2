import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { val: "Pocetna", link: "/pocetna" },
  { val: "Delatnost", link: "/delatnosti" },
  { val: "O nama", link: "/onama" },
  { val: "Majstori", link: "/majstori" },
  { val: "Blog", link: "/blog" },
];

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {
            pages.map((page) => (
              <ListItemButton 
                onClick={() => setOpenDrawer(false)}
                key={page.val}
                component={Link}
                to={page.link}
              >
                <ListItemIcon>
                  {/* Ovdje možeš dodati ikonu ako želiš */}
                </ListItemIcon>
                <ListItemText primary={page.val} />
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComponent;
