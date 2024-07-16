import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setParameter } from './reducers/parameterSlice';
import { Box, Toolbar, List, ListItem, ListItemText, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DrawerContainer from './DrawerContainer';
import MainContent from './MainContent';

const Main = ({ PageComponent }) => {
    const { param } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        dispatch(setParameter(param));
    }, [param, dispatch]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerItems = ['Page 1', 'Page 2', 'Page 3'];
    const drawer = (
        <>
            <Toolbar />
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Parameter: {param}
            </Typography>
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