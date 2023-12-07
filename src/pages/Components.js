import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const Components = () => {
    const [components, setComponents] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [selectedItems, setSelectedItems] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/components`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setComponents(res?.data);
            });
    }, []);

    useMemo(() => {
        const filteredComponents = components.filter((item) =>
            item.type?.toLowerCase().includes(selectedItems.toLowerCase())
        );
        setFilteredComponents(filteredComponents);
    }, [components, selectedItems]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link style={{ textDecoration: 'none' }} to="/createcomponent">
                    <Button variant='outlined'>CREATE NEW COMPONENT</Button>
                </Link>
            </Box>

            <Box sx={{ textAlign: 'start' }}>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("ABOUT_US")}
                >
                    About Us
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("CEO_MESSAGE")}
                >
                    CEO Message
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("CLIENT")}
                >
                    Client
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("COMPANY_PROFILE")}
                >
                    Company Profile
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("GALLERY")}
                >
                    Gallery
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("GOAL")}
                >
                    Goal
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("HOME_SLIDER")}
                >
                    Home Slider
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("MANAGEMENT")}
                >
                    Management
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("MISSION")}
                >
                    Mission
                </Button>
                <Button
                    variant='contained'
                    sx={{ width: '200px', marginRight: '20px', marginY: '10px' }}
                    onClick={() => setSelectedItems("VISION")}
                >
                    Vision
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Active / Inactive</TableCell>
                            <TableCell align="center">VIEW / EDIT</TableCell>
                        </TableRow>
                    </TableHead>

                    {components?.length > 0 &&
                        <TableBody>
                            {filteredComponents?.map((component) => (
                                <TableRow
                                    key={component?.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {component?.type}
                                    </TableCell>
                                    <TableCell align="center">
                                        {component?.active === "1" ? "Active" : "Inactive"}
                                    </TableCell>
                                    <TableCell align="center">

                                        <Link style={{ textDecoration: 'none' }} to={`/viewcomponent/${component?.id}`}>
                                            <Button sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                        </Link>

                                        <Link style={{ textDecoration: 'none' }} to={`/editcomponent/${component?.id}`}>
                                            <Button sx={{ ml: 1 }} variant="outlined" color="warning">EDIT</Button>
                                        </Link>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}

                </Table>
            </TableContainer>
        </>
    );
};

export default Components;