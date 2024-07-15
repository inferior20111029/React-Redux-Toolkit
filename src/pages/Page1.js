import React from 'react';
import { useSelector } from 'react-redux';

const Page1 = () => {
    const parameter = useSelector((state) => state.parameter);
    return <div>Page 1 - Parameter: {parameter}</div>;
};

export default Page1;