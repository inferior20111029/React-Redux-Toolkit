import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setParameter } from './reducers/parameterSlice';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/1" />} />
            <Route path="/:param/*" element={<Main />} />
        </Routes>
    </Router>
);

const Main = () => {
    const { param } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setParameter(param));
    }, [param, dispatch]);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Parameter: {param}
                    </Typography>
                    <Button color="inherit" component={Link} to={`/${param}/page1`}>Page 1</Button>
                    <Button color="inherit" component={Link} to={`/${param}/page2`}>Page 2</Button>
                    <Button color="inherit" component={Link} to={`/${param}/page3`}>Page 3</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="page1" element={<Page1 />} />
                <Route path="page2" element={<Page2 />} />
                <Route path="page3" element={<Page3 />} />
            </Routes>
        </div>
    );
};

export default App;