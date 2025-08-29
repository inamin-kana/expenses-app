import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import React, { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number, 
  mobileOpen: boolean, 
  handleDrawerTransitionEnd: () => void, 
  handleDrawerClose: () => void
}

interface menuItem {
  text: string,
  path: string,
  icon: React.ComponentType
}

const SideBar = ({drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose}: SidebarProps) => {
  const MenuItem:menuItem[] = [
    {text: "Inicio", path: "/", icon: HomeIcon},
    {text: "Informe", path: "/report", icon: EqualizerIcon},
  ]

  const baseLinkStyle:CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block"
  }
  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItem.map((item, index) => (
          <NavLink key={item.text} to={item.path} style={({isActive}) => {
            // console.log("選択されたメニュー", item.text, isActive)
            return {
              ...baseLinkStyle,
              ...(isActive? activeLinkStyle : {})
            }
          }}>
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon/>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBar
