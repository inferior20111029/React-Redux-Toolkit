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
            <Route path="/" element={<Navigate to="/page1/1" />} />
            <Route path="/page1/:param" element={<Main page={<Page1 />} />} />
            <Route path="/page2/:param" element={<Main page={<Page2 />} />} />
            <Route path="/page3/:param" element={<Main page={<Page3 />} />} />
        </Routes>
    </Router>
);

const Main = ({ page }) => {
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
                    <Button color="inherit" component={Link} to={`/page1/${param}`}>Page 1</Button>
                    <Button color="inherit" component={Link} to={`/page2/${param}`}>Page 2</Button>
                    <Button color="inherit" component={Link} to={`/page3/${param}`}>Page 3</Button>
                </Toolbar>
            </AppBar>
            {page}
        </div>
    );
};

export default App;