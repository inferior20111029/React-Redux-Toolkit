import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface UseDrawerReturn {
    isMobile: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const useDrawer = (): UseDrawerReturn => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return { isMobile, mobileOpen, handleDrawerToggle };
};

export default useDrawer;
