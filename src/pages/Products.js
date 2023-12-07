import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import axios from 'axios';

const Products = ({ createProduct }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [productsPage, setProductsPage] = useState(0);
    const [productsRowsPerPage, setProductsRowsPerPage] = useState(10);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/products`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setProducts(res?.data);
            });
    }, []);

    useMemo(() => {
        const filteredProducts = products.filter((item) =>
            item.productName?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.categoryName?.name?.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    }, [filterText, products]);

    const handleChangeEProductsPage = (event, newPage) => {
        setProductsPage(newPage);
    };

    const handleChangeEProductsRowsPerPage = (event) => {
        setProductsRowsPerPage(+event.target.value);
        setProductsPage(0);
    };

    return (
        <>
            {createProduct !== "0" && <Link style={{ marginTop: '-56px', marginBottom: '24px', display: 'flex', justifyContent: 'end', textDecoration: 'none' }} to="/productsmanagement/createproduct">
                <Button variant='outlined'>CREATE NEW PRODUCT</Button>
            </Link>}

            <div style={{ textAlign: 'start', width: '320px', marginBottom: '10px' }}>
                <TextField
                    fullWidth
                    type="search"
                    size='small'
                    placeholder="Search products by name & category"
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Product Title</TableCell>
                            <TableCell align="center">VIEW / EDIT</TableCell>
                        </TableRow>
                    </TableHead>

                    {products?.length > 0 &&
                        <TableBody>
                            {filteredProducts?.slice(productsPage * productsRowsPerPage, productsPage * productsRowsPerPage + productsRowsPerPage)?.map((product) => (
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

                                        <Link style={{ textDecoration: 'none' }} to={`/productsmanagement/viewproduct/${product?.id}`}>
                                            <Button sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                        </Link>

                                        <Link style={{ textDecoration: 'none' }} to={`/productsmanagement/editproduct/${product?.id}`}>
                                            <Button sx={{ ml: 1 }} variant="outlined" color="warning">EDIT</Button>
                                        </Link>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}

                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={productsRowsPerPage}
                page={productsPage}
                onPageChange={handleChangeEProductsPage}
                onRowsPerPageChange={handleChangeEProductsRowsPerPage}
            />
        </>
    );
};

export default Products;