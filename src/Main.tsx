import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Toolbar, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import DrawerContainer from './DrawerContainer';
import MainContent from './MainContent';
import useParameter from './hooks/useParameter';
import useDrawer from './hooks/useDrawer';

interface MainProps {
    PageComponent: React.FC;
}

const Main: React.FC<MainProps> = ({ PageComponent }) => {
    const param = useParameter() || '';
    const { isMobile, mobileOpen, handleDrawerToggle } = useDrawer();
    const drawerItems = ['Page 1', 'Page 2', 'Page 3'];

    const drawer = (
        <>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">
                    Parameter: {param}
                </Typography>
            </Box>
            <Divider />
            <List>
                {drawerItems.map((text, index) => (
                    <ListItem button component={Link} to={`/${drawerItems[index].toLowerCase().replace(' ', '')}/${param}`} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerContainer
                isMobile={isMobile}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawer={drawer}
            />
            <MainContent
                isMobile={isMobile}
                handleDrawerToggle={handleDrawerToggle}
                param={param}
                PageComponent={PageComponent}
            />
        </Box>
    );
};

export default Main;