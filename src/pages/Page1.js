import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const Page1 = () => {
    const parameter = useSelector((state) => state.parameter);
    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4">Page 1 - Parameter: {parameter}</Typography>
        </Box>
    );
};

export default Page1;