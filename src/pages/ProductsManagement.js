import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const ProductsManagement = () => {
    return (
        <Box>
            <Box style={{ display: 'flex', justifyContent: 'start', marginBottom: '20px' }}>
                <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="/productsmanagement/categories">
                    <Button sx={{ width: '200px' }} variant='contained'>Categories</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="/productsmanagement/products">
                    <Button sx={{ width: '200px' }} variant='contained'>Products</Button>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/productsmanagement/featuredproducts">
                    <Button sx={{ width: '200px' }} variant='contained'>Featured Products</Button>
                </Link>
            </Box>
            <Outlet />
        </Box>
    );
};

export default ProductsManagement;