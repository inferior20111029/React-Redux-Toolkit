import React from 'react';
import { useSelector } from 'react-redux';

const Page2 = () => {
    const parameter = useSelector((state) => state.parameter);
    return <div>Page 2 - Parameter: {parameter}</div>;
};

export default Page2;