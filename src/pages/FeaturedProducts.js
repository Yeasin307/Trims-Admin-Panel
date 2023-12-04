import React, { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddBox, Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [eligibleProducts, setEligibleProducts] = useState([]);
    const [selectedRow, setSelectedRow] = useState("");
    const { userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res1) => {
                setFeaturedProducts(res1?.data);
                axios.get(`${process.env.REACT_APP_SERVER_API}/products`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then((res2) => {
                        const filteredProducts = res2?.data?.filter(product1 => {
                            return ((res1?.data?.findIndex(product2 => product2.id === product1.id) === -1) && (product1.active === "1")) ? true : false;
                        })
                        setEligibleProducts(filteredProducts);
                    });
            });
    }, []);

    const handleAddFeaturedProduct = async (row) => {
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
                await axios.put(`${process.env.REACT_APP_SERVER_API}/products/select-featured`, { productId: row.id, userId: userInfo.id, isFeatured: '1' }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setSelectedRow("");
                            axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`, {
                                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            })
                                .then((res1) => {
                                    setFeaturedProducts(res1?.data);
                                    axios.get(`${process.env.REACT_APP_SERVER_API}/products`, {
                                        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
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

    const handleDeleteFeaturedProduct = async (row) => {
        setSelectedRow(row.id);
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_API}/products/select-featured`, { productId: row.id, userId: userInfo.id, isFeatured: '0' }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setSelectedRow("");
                        axios.get(`${process.env.REACT_APP_SERVER_API}/products/featured`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res1) => {
                                setFeaturedProducts(res1?.data);
                                axios.get(`${process.env.REACT_APP_SERVER_API}/products`, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
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
                                {eligibleProducts?.map((row) => (
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
            </div >
        </>
    )
}

export default FeaturedProducts;