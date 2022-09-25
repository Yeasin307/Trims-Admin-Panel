import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import { Box, Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContext } from '../../../Context/AuthProvider';

const AddCategory = () => {
    const [previousCategories, setPreviousCategories] = React.useState([]);
    const { open, setOpen, userInfo } = React.useContext(AuthContext);
    const { id } = userInfo;

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            parentId: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            axios.post("http://localhost:5000/categories/create", { values, id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
                .then(() => {
                    actions.setSubmitting(false);
                    actions.resetForm();
                    setOpen(false);
                    alert("New Category Created Successfully.");
                });
        }
    });

    React.useEffect(() => {
        axios.get("http://localhost:5000/categories", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setPreviousCategories(res.data);
            });

    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.values.name = "";
        formik.values.description = "";
        formik.values.parentId = "";
        setOpen(false);
    };

    return (
        <Box style={{ marginTop: '-36px' }}>
            <Box style={{ display: 'flex', justifyContent: 'end' }} >
                <Button variant="outlined" onClick={handleOpen}>ADD NEW CATEGORY</Button>
            </Box>

            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>PLEASE CREATE A NEW CATEGORY</DialogTitle>
                <DialogContent>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            required
                            name="name"
                            label="Enter Category Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant="standard"
                            sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                        />
                        <Textarea
                            name="description"
                            placeholder="Enter Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            minRows={4}
                            sx={{ fontsize: '18px', mt: 4, mb: 2.5 }}
                        />
                        <FormControl variant="standard" sx={{ fontsize: '18px', mb: 5, width: "100%" }}>
                            <InputLabel>Parent Category</InputLabel>
                            <Select
                                name="parentId"
                                value={formik.values.parentId}
                                onChange={formik.handleChange}
                                error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                                helperText={formik.touched.parentId && formik.errors.parentId}
                            >
                                {previousCategories?.map(Category => (
                                    <MenuItem key={Category?.id} value={Category?.id}>{Category?.name}</MenuItem>
                                ))};

                            </Select>
                        </FormControl>
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const validationSchema = yup.object({
    name: yup.string()
        .min(3, "Minimum length is 3.")
        .max(45, "Maximum length is 45."),
    description: yup.string(),
    parentId: yup.string()
});

export default AddCategory;