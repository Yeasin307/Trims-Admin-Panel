import * as React from 'react';
import { Table, Paper, TableRow, TableBody, TableHead, TableContainer, TableCell, Button } from '@mui/material';
import axios from 'axios';
import CreateCategory from '../CreateCategory/CreateCategory';
import ViewCategory from '../ViewCategory/ViewCategory';
import EditCategory from '../EditCategory/EditCategory';

const Categories = () => {
    // const [activeCategories, setActiveCategories] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState({});
    const [categoryChild, setCategoryChild] = React.useState([]);
    const [createOpen, setCreateOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [active, setActive] = React.useState("");

    React.useEffect(() => {
        axios.get("https://server.asdfashionbd.com/categories", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategories(res?.data);
            });
    }, [createOpen, editOpen, active]);

    const handleViewOpen = async (id) => {
        await axios.post("https://server.asdfashionbd.com/categories/category-details", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategory(res?.data);
                setCategoryChild(res?.data?.Child);

            });
        setViewOpen(true);
    };

    const handleEditOpen = async (id) => {
        // await axios.get("https://server.asdfashionbd.com/categories/active", {
        //     headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        // })
        //     .then((res) => {
        //         setActiveCategories(res.data);
        //     });

        await axios.post("https://server.asdfashionbd.com/categories/category-details", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategory(res?.data);
                setActive(res?.data?.active);

            });
        setEditOpen(true);
    };

    return (
        <>
            <CreateCategory
                createOpen={createOpen}
                setCreateOpen={setCreateOpen}
                editOpen={editOpen}
                active={active}
            ></CreateCategory>

            <ViewCategory
                viewOpen={viewOpen}
                setViewOpen={setViewOpen}
                category={category}
                categoryChild={categoryChild}
            ></ViewCategory>

            <EditCategory
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                active={active}
                setActive={setActive}
                categories={categories}
                category={category}
            ></EditCategory>

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
                                <TableCell align="center">{category?.Parent?.name}</TableCell>
                                <TableCell align="center">{category?.Child?.length}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => { handleViewOpen(category?.id) }} sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                    <Button onClick={() => { handleEditOpen(category?.id) }} sx={{ ml: 1 }} variant="outlined" color="warning">EDIT</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default Categories;
