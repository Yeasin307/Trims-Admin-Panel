import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const ProductManagementMenu = () => {
    return (
        <Box>
            <Box style={{ display: 'flex', justifyContent: 'start', marginBottom: '20px' }}>
                <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="/productmanagement/categories">
                    <Button sx={{ width: '200px' }} variant='contained'>Categories</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginLeft: '10px' }} to="/productmanagement/products">
                    <Button sx={{ width: '200px' }} variant='contained'>Products</Button>
                </Link>
            </Box>
            <Outlet />
        </Box>
    );
};

export default ProductManagementMenu;