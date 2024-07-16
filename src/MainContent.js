import React from 'react';
import { Box, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MainContent = ({ isMobile, handleDrawerToggle, PageComponent }) => (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <Toolbar />
        {isMobile && (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <PageComponent />
        </Box>
    </Box>
);

export default MainContent;