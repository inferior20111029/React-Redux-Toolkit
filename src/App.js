import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Main from './Main';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

const pages = [Page1, Page2, Page3];

const App = () => (
    <Router>
        <CssBaseline />
        <Routes>
            <Route path="/" element={<Navigate to="/page1/1" />} />
            {['page1', 'page2', 'page3'].map((page, index) => (
                <Route
                    key={page}
                    path={`/${page}/:param`}
                    element={<Main PageComponent={pages[index]} />}
                />
            ))}
        </Routes>
    </Router>
);

export default App;