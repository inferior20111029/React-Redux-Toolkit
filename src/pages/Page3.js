import React from 'react';
import { useSelector } from 'react-redux';

const Page3 = () => {
    const parameter = useSelector((state) => state.parameter);
    return <div>Page 3 - Parameter: {parameter}</div>;
};

export default Page3;