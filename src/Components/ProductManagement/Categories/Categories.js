import * as React from 'react';
import { Table, Paper, TableRow, TableBody, TableHead, TableContainer, TableCell, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, TextField, NativeSelect } from '@mui/material';
import { Textarea } from '@mui/joy';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";
import AddCategory from '../AddCategory/AddCategory';
import { AuthContext } from '../../../Context/AuthProvider';

const Categories = () => {
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState({});
    const [categoryChild, setCategoryChild] = React.useState([]);
    const [viewOpen, setViewOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const { open } = React.useContext(AuthContext);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category?.name,
            description: category?.description,
            parentId: category?.Parent?.name
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log(values);

        }
    });

    const handleViewOpen = async (id) => {
        await axios.post("http://localhost:5000/categories/category-details", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategory(res?.data);
                setCategoryChild(res?.data?.Child);

            });
        setViewOpen(true);
    };

    const handleEditOpen = async (id) => {
        await axios.post("http://localhost:5000/categories/category-details", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategory(res?.data);
                setCategoryChild(res?.data?.Child);
            });
        setEditOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };

    React.useEffect(() => {
        const fetchCategories = () => {
            axios.get("http://localhost:5000/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
                .then((res) => {
                    setCategories(res?.data);
                });
        };
        fetchCategories();
    }, [open, editOpen]);

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

            {viewOpen && <Dialog maxWidth='md' fullWidth={true} open={viewOpen} onClose={handleViewClose}>
                <DialogTitle>DETAILS OF {category?.name}</DialogTitle>
                <DialogContent>
                    <h4 style={{ textDecoration: 'underline' }}>DESCRIPTION</h4>
                    <p>{category?.description}</p>

                    <h4 style={{ textDecoration: 'underline' }}>PARENT CATEGORY</h4>
                    <p>{category?.Parent?.name}</p>

                    <h4 style={{ textDecoration: 'underline' }}>CHILD CATEGORIES</h4>
                    {categoryChild?.map((child) => (
                        <p key={child?.name} style={{ display: "inline", paddingRight: '20px' }}>{child?.name}   </p>
                    ))}
                    <h4 style={{ textDecoration: 'underline' }}>CREATED BY</h4>
                    <p>{category?.createdByUser?.username}</p>

                    <h4 style={{ textDecoration: 'underline' }}>UPDATED BY</h4>
                    <p>{category?.updatedByUser?.username}</p>

                    <h4 style={{ textDecoration: 'underline' }}>CREATED AT</h4>
                    <p>{new Date(category?.createdAt).toString()}</p>

                    <h4 style={{ textDecoration: 'underline' }}>UPDATED AT</h4>
                    <p>{new Date(category?.updatedAt).toString()}</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleViewClose}>Close</Button>
                </DialogActions>
            </Dialog>}

            {editOpen && <Dialog maxWidth='sm' fullWidth={true} open={editOpen} onClose={handleEditClose}>
                <DialogTitle>PLEASE EDIT CATEGORY {category?.name}</DialogTitle>
                <DialogContent>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            required
                            name="name"
                            label="Change Category Name"
                            value={formik?.values?.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant="standard"
                            sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                        />
                        <Textarea
                            name="description"
                            placeholder="Change Description"
                            value={formik?.values?.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            minRows={4}
                            sx={{ fontsize: '18px', mt: 4, mb: 2.5 }}
                        />
                        <FormControl variant="standard" sx={{ fontsize: '18px', mb: 2.5, width: "100%" }}>
                            <InputLabel>Change Parent Category</InputLabel>
                            <NativeSelect
                                name="parentId"
                                value={formik?.values?.parentId}
                                onChange={formik.handleChange}
                                error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                                helperText={formik.touched.parentId && formik.errors.parentId}
                            >
                                {categories.map(Category => (
                                    <option key={Category?.id} value={Category?.id}>{Category?.name}</option>
                                ))};
                            </NativeSelect>
                        </FormControl>
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    </form>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

const validationSchema = yup.object({
    name: yup.string()
        .min(3, "Minimum length is 3.")
        .max(45, "Maximum length is 45."),
    description: yup.string(),
    parentId: yup.string()
});

export default Categories;
