import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const Products = ({ createProduct }) => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:5000/products", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setProducts(res?.data);
            });
    }, []);

    return (
        <>
            {createProduct !== "0" && <Link style={{ marginTop: '-56px', marginBottom: '24px', display: 'flex', justifyContent: 'end', textDecoration: 'none' }} to="/productmanagement/createproduct">
                <Button variant='outlined'>CREATE NEW PRODUCT</Button>
            </Link>}

            <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Product NAME</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Product Title</TableCell>
                            <TableCell align="center">VIEW / EDIT</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products?.map((product) => (
                            <TableRow
                                key={product?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {product?.productName}
                                </TableCell>
                                <TableCell align="center">{product?.categoryName?.name}</TableCell>
                                <TableCell align="center">{product?.title}</TableCell>
                                <TableCell align="center">

                                    <Link style={{ textDecoration: 'none' }} to={`/productmanagement/viewproduct/${product?.id}`}>
                                        <Button sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                    </Link>

                                    <Link style={{ textDecoration: 'none' }} to={`/productmanagement/editproduct/${product?.id}`}>
                                        <Button sx={{ ml: 1 }} variant="outlined" color="warning">EDIT</Button>
                                    </Link>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default Products;