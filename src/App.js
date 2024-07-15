import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setParameter } from './reducers/parameterSlice';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

const App = () => (
    <Router>
        <Routes>
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
            <h1>Parameter: {param}</h1>
            <nav>
                <ul>
                    <li><Link to={`/${param}/page1`}>Page 1</Link></li>
                    <li><Link to={`/${param}/page2`}>Page 2</Link></li>
                    <li><Link to={`/${param}/page3`}>Page 3</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="page1" element={<Page1 />} />
                <Route path="page2" element={<Page2 />} />
                <Route path="page3" element={<Page3 />} />
            </Routes>
        </div>
    );
};

export default App;