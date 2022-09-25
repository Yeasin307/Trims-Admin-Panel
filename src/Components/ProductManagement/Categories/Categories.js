import * as React from 'react';
import { Table, Paper, TableRow, TableBody, TableHead, TableContainer, TableCell, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, NativeSelect, Typography } from '@mui/material';
import { Textarea } from '@mui/joy';
import axios from 'axios';
import { useFormik } from "formik";
import dateFormat from "dateformat";
import * as yup from "yup";
import AddCategory from '../AddCategory/AddCategory';
import { AuthContext } from '../../../Context/AuthProvider';

const Categories = () => {
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState({});
    const [categoryChild, setCategoryChild] = React.useState([]);
    const [viewOpen, setViewOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [active, setActive] = React.useState("");
    const { open, userInfo, cycleDetection } = React.useContext(AuthContext);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category?.name,
            description: category?.description,
            parentId: category?.Parent?.id || ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            console.log(values);
            const checkCycle = await cycleDetection(categories, category?.id, values.parentId);
            if (checkCycle) {
                alert("Please change parent category name. Here create a cycle!");
            }
            else {
                const categoryId = category?.id;
                const userId = userInfo?.id;
                await axios.put("http://localhost:5000/categories/update", { values, categoryId, userId }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                        setEditOpen(false);
                        alert("Updated Successfully!");
                    });
            }
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
                setActive(res?.data?.active);

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

    const handleActive = async (e, categoryId, userId) => {
        await axios.put("http://localhost:5000/categories/activate-deactivate", { categoryId, userId, activateDeactivate: e.target.value }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setActive(e.target.value);
            });
    };

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
                    <p>{dateFormat(new Date(category?.createdAt).toString())}</p>

                    <h4 style={{ textDecoration: 'underline' }}>UPDATED AT</h4>
                    <p>{dateFormat(new Date(category?.updatedAt).toString())}</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleViewClose}>Close</Button>
                </DialogActions>
            </Dialog>}

            {editOpen && <Dialog maxWidth='sm' fullWidth={true} open={editOpen} onClose={handleEditClose}>
                <DialogTitle>PLEASE EDIT CATEGORY {category?.name}</DialogTitle>
                <DialogContent>

                    <FormControl>
                        <FormLabel style={{ color: 'blue' }} >THIS CATEGORY IS </FormLabel>
                        <RadioGroup
                            row
                            name="active"
                            value={active}
                            onChange={e => handleActive(e, category?.id, userInfo?.id)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Activate" />
                            <FormControlLabel value="0" control={<Radio />} label="Deactivate" />
                        </RadioGroup>
                    </FormControl>

                    {active === "1" && <form onSubmit={formik.handleSubmit}>
                        <TextField
                            required
                            name="name"
                            label="Change Category Name"
                            value={formik?.values?.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant="standard"
                            sx={{ width: '100%', fontsize: '18px', color: 'black', mt: 2.5 }}
                        />
                        <Textarea
                            name="description"
                            placeholder="Change Description"
                            value={formik?.values?.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            minRows={4}
                            sx={{ fontsize: '18px', mt: 4, mb: 4 }}
                        />

                        <FormLabel style={{ color: 'green' }} >PARENT CATEGORY : {category?.Parent?.name ? category?.Parent?.name : 'NONE'}</FormLabel>

                        <FormControl variant="standard" sx={{ fontsize: '18px', mt: 2, mb: 2.5, width: "100%" }}>

                            <Typography variant="button" display="block" gutterBottom>
                                Change Parent Category
                            </Typography>

                            <NativeSelect
                                name="parentId"
                                onChange={formik.handleChange}
                                error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                                helperText={formik.touched.parentId && formik.errors.parentId}
                            >
                                <option value={""}>None</option>
                                {categories?.map(Category => (
                                    <option key={Category?.id} value={Category?.id}>{Category?.name}</option>
                                ))};
                            </NativeSelect>
                        </FormControl>
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    </form>}

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
