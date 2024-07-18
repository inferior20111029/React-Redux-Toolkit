import React from 'react';
import { Box, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface MainContentProps {
    isMobile: boolean;
    handleDrawerToggle: () => void;
    param: string;
    PageComponent: React.FC;
}

const MainContent: React.FC<MainContentProps> = ({ isMobile, handleDrawerToggle, param, PageComponent }) => (
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
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Parameter: {param}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <PageComponent />
        </Box>
    </Box>
);

export default MainContent;