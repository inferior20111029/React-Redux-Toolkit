import React from 'react';
import { Box, Drawer } from '@mui/material';

const DrawerContainer = ({ isMobile, mobileOpen, handleDrawerToggle, drawer }) => (
    <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
    >
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}
        >
            {drawer}
        </Drawer>
    </Box>
);

export default DrawerContainer;
