import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const Page2 = () => {
    const parameter = useSelector((state) => state.parameter);
    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" gutterBottom>Page 2</Typography>
            <Typography variant="body1">Parameter: {parameter}</Typography>
        </Box>
    );
};

export default Page2;