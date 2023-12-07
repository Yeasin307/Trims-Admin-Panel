import React, { useMemo, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { AddBox, Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [eligibleProducts, setEligibleProducts] = useState([]);
    const [filteredEligibleProducts, setFilteredEligibleProducts] = useState([]);
    const [selectedRow, setSelectedRow] = useState("");
    const { userInfo } = React.useContext(AuthContext);
    const access_token = localStorage.getItem("access_token");
    const [filterText, setFilterText] = useState("");
    const [eProductsPage, setEProductsPage] = useState(0);
    const [eProductsRowsPerPage, setEProductsRowsPerPage] = useState(10);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`,
            {
                headers: { Authorization: `Bearer ${access_token}` }
            })
            .then((res1) => {
                setFeaturedProducts(res1?.data);
                axios.get(`${process.env.REACT_APP_SERVER_API}/products`,
                    {
                        headers: { Authorization: `Bearer ${access_token}` }
                    })
                    .then((res2) => {
                        const filteredProducts = res2?.data?.filter(product1 => {
                            return ((res1?.data?.findIndex(product2 => product2.id === product1.id) === -1) && (product1.active === "1")) ? true : false;
                        })
                        setEligibleProducts(filteredProducts);
                    });
            });
    }, [access_token]);

    useMemo(() => {
        const filteredProducts = eligibleProducts.filter((item) =>
            item.productName?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.categoryName?.name?.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredEligibleProducts(filteredProducts);
    }, [eligibleProducts, filterText]);

    const handleAddFeaturedProduct = (row) => {
        setSelectedRow(row.id);
        if (featuredProducts.length >= 8) {
            toast.error('You have reached the maximum featured products!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setSelectedRow("");
        }
        else {
            try {
                axios.put(`${process.env.REACT_APP_SERVER_API}/products/select-featured`,
                    {
                        productId: row.id,
                        userId: userInfo.id,
                        isFeatured: '1'
                    }, {
                    headers: { Authorization: `Bearer ${access_token}` }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setSelectedRow("");
                            axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`,
                                {
                                    headers: { Authorization: `Bearer ${access_token}` }
                                })
                                .then((res1) => {
                                    setFeaturedProducts(res1?.data);
                                    axios.get(`${process.env.REACT_APP_SERVER_API}/products`,
                                        {
                                            headers: { Authorization: `Bearer ${access_token}` }
                                        })
                                        .then((res2) => {
                                            const filteredProducts = res2?.data?.filter(product1 => {
                                                return ((res1?.data?.findIndex(product2 => product2.id === product1.id) === -1) && (product1.active === "1")) ? true : false;
                                            })
                                            setEligibleProducts(filteredProducts);
                                        });
                                });
                        }
                    });
            }
            catch (error) {
                setSelectedRow("");
            }
        }
    }

    const handleDeleteFeaturedProduct = (row) => {
        setSelectedRow(row.id);
        try {
            axios.put(`${process.env.REACT_APP_SERVER_API}/products/select-featured`,
                {
                    productId: row.id,
                    userId: userInfo.id,
                    isFeatured: '0'
                }, {
                headers: { Authorization: `Bearer ${access_token}` }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setSelectedRow("");
                        axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`,
                            {
                                headers: { Authorization: `Bearer ${access_token}` }
                            })
                            .then((res1) => {
                                setFeaturedProducts(res1?.data);
                                axios.get(`${process.env.REACT_APP_SERVER_API}/products`,
                                    {
                                        headers: { Authorization: `Bearer ${access_token}` }
                                    })
                                    .then((res2) => {
                                        const filteredProducts = res2?.data?.filter(product1 => {
                                            return ((res1?.data?.findIndex(product2 => product2.id === product1.id) === -1) && (product1.active === "1")) ? true : false;
                                        })
                                        setEligibleProducts(filteredProducts);
                                    });
                            });
                    }
                });
        }
        catch (error) {
            setSelectedRow("");
        }
    }

    const handleChangeEProductsPage = (event, newPage) => {
        setEProductsPage(newPage);
    };

    const handleChangeEProductsRowsPerPage = (event) => {
        setEProductsRowsPerPage(+event.target.value);
        setEProductsPage(0);
    };

    return (
        <>
            <div>
                <h4 style={{ textAlign: 'start' }}>Featured Products</h4>

                <TableContainer component={Paper} sx={{ marginTop: '12px' }}>
                    <Table aria-label="simple table">

                        <TableHead>
                            <TableRow sx={{ borderTop: 1, borderColor: 'rgb(224 224 224)' }}>
                                <TableCell sx={{ paddingY: '4px' }}>Product Name</TableCell>
                                <TableCell sx={{ paddingY: '4px' }}>Category</TableCell>
                                <TableCell sx={{ paddingY: '4px', textAlign: 'center' }}>Remove</TableCell>
                            </TableRow>
                        </TableHead>

                        {featuredProducts?.length > 0 &&
                            <TableBody>
                                {featuredProducts?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ paddingY: '4px' }}>{row.productName}</TableCell>
                                        <TableCell sx={{ paddingY: '4px' }}>{row.categoryName?.name}</TableCell>
                                        <TableCell
                                            sx={{ paddingY: '4px', textAlign: 'center' }}
                                        >
                                            <IconButton
                                                aria-label="delete"
                                                sx={{ padding: '0px', cursor: 'pointer', color: 'rgb(211, 47, 47)' }}
                                                disabled={row.id === selectedRow}
                                                onClick={() => handleDeleteFeaturedProduct(row)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}

                    </Table>
                </TableContainer>

            </div >

            <div>
                <h4 style={{ textAlign: 'start' }}>Eligible Products</h4>
                <div style={{ textAlign: 'start', width: '320px' }}>
                    <TextField
                        fullWidth
                        type="search"
                        size='small'
                        placeholder="Search products by name & category"
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>

                <TableContainer component={Paper} sx={{ marginTop: '12px' }}>
                    <Table aria-label="simple table">

                        <TableHead>
                            <TableRow sx={{ borderTop: 1, borderColor: 'rgb(224 224 224)' }}>
                                <TableCell sx={{ paddingY: '4px' }}>Product Name</TableCell>
                                <TableCell sx={{ paddingY: '4px' }}>Category</TableCell>
                                <TableCell sx={{ paddingY: '4px', textAlign: 'center' }}>Add</TableCell>
                            </TableRow>
                        </TableHead>

                        {eligibleProducts?.length > 0 &&
                            <TableBody>
                                {filteredEligibleProducts?.slice(eProductsPage * eProductsRowsPerPage, eProductsPage * eProductsRowsPerPage + eProductsRowsPerPage)?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ paddingY: '4px' }}>{row.productName}</TableCell>
                                        <TableCell sx={{ paddingY: '4px' }}>{row.categoryName?.name}</TableCell>
                                        <TableCell
                                            sx={{ paddingY: '4px', textAlign: 'center' }}
                                        >
                                            <IconButton
                                                aria-label="add"
                                                sx={{ padding: '0px', cursor: 'pointer', color: 'green' }}
                                                disabled={row.id === selectedRow}
                                                onClick={() => handleAddFeaturedProduct(row)}
                                            >
                                                <AddBox />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}

                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={filteredEligibleProducts.length}
                    rowsPerPage={eProductsRowsPerPage}
                    page={eProductsPage}
                    onPageChange={handleChangeEProductsPage}
                    onRowsPerPageChange={handleChangeEProductsRowsPerPage}
                />

            </div >
        </>
    )
}

export default FeaturedProducts;