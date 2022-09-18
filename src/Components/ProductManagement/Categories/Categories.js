import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddCategory from '../AddCategory/AddCategory';

const Categories = () => {
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [categoryChild, setCategoryChild] = React.useState([]);
    const [viewOpen, setViewOpen] = React.useState(false);

    const handleViewOpen = async (id) => {

        await axios.post("http://localhost:5000/category-details", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategory(res.data[0][0]);
                setCategoryChild(res.data[1]);

            });

        setViewOpen(true);

    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    React.useEffect(() => {
        const fetchCategories = async () => {
            await axios.get("http://localhost:5000/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
                .then((res) => {
                    setCategories(res.data);
                });
        };

        fetchCategories();
    }, []);

    return (
        <>
            <AddCategory></AddCategory>

            <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">CATEGORY NAME</TableCell>
                            <TableCell align="center">PARENT CATEGORY</TableCell>
                            <TableCell align="center">CHILD NUMBER</TableCell>
                            <TableCell align="center">VIEW / EDIT</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories?.map((category) => (
                            <TableRow
                                key={category?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {category?.name}
                                </TableCell>
                                <TableCell align="center">{category?.parentCategory}</TableCell>
                                <TableCell align="center">{category?.childCount}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => { handleViewOpen(category?.id) }} sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                    <Button sx={{ ml: 1 }} variant="outlined" color="warning">EDIT</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {viewOpen && <Dialog maxWidth='lg' fullWidth={true} open={viewOpen} onClose={handleViewClose}>
                <DialogTitle>DETAILS OF {category?.name}</DialogTitle>
                <DialogContent>
                    <h4 style={{ textDecoration: 'underline' }}>DESCRIPTION</h4>
                    <p>{category?.description}</p>

                    <h4 style={{ textDecoration: 'underline' }}>PARENT CATEGORY</h4>
                    <p>{category?.parentCategory}</p>

                    <h4 style={{ textDecoration: 'underline' }}>CHILD CATEGORIES</h4>
                    {categoryChild?.map((child) => (
                        <p key={child?.name} style={{ display: "inline", paddingRight: '20px' }}>{child?.name}   </p>
                    ))}
                    <h4 style={{ textDecoration: 'underline' }}>CREATED BY</h4>
                    <p>{category?.createdBy}</p>

                    <h4 style={{ textDecoration: 'underline' }}>UPDATED BY</h4>
                    <p>{category?.updatedBy}</p>

                    <h4 style={{ textDecoration: 'underline' }}>CREATED AT</h4>
                    <p>{new Date(category?.createdAt).toString()}</p>

                    <h4 style={{ textDecoration: 'underline' }}>UPDATED AT</h4>
                    <p>{new Date(category?.updatedAt).toString()}</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleViewClose}>Close</Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

export default Categories;
