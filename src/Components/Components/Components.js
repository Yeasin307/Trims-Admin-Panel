import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const Components = () => {
    const [components, setComponents] = React.useState([]);

    React.useEffect(() => {
        axios.get("https://server.asdfashionbd.com/components", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setComponents(res?.data);
            });
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link style={{ textDecoration: 'none' }} to="/createcomponent">
                    <Button variant='outlined'>CREATE NEW COMPONENT</Button>
                </Link>
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

                    <TableBody>
                        {components?.map((component) => (
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
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default Components;