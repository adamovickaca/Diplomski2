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

const PAGES = ["Delatnosti", "Majstori", "O nama", "Blog"]

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
            {
                PAGES.map((page, index)=>(
                    <ListItemButton 
                    onClick={()=>setOpenDrawer(false)}
                    key = {index}
                    component={Link} 
                    to={`/${page.toLowerCase()}`}
                    >
                    <ListItemIcon>
                      <ListItemText>{page}</ListItemText>
                    </ListItemIcon>
                  </ListItemButton>

                ))
            }
      
        </List>
      </Drawer>
      <IconButton
      sx = {{ color:'white', marginLeft:'auto'}}
       onClick={()=>setOpenDrawer(!openDrawer)}>
        <MenuIcon/>
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComponent;
