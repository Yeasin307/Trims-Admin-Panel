import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import { Box, Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ImageUploading from "react-images-uploading";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../context/AuthProvider';

const CreateCategory = ({ createOpen, setCreateOpen, editOpen, active }) => {
    const [categories, setCategories] = React.useState([]);
    const { userInfo, uniqueName } = React.useContext(AuthContext);

    const validationSchema = yup.object({
        name: yup.string()
            .min(3, "Minimum length is 3.")
            .max(45, "Maximum length is 45."),
        description: yup.string(),
        parentId: yup.string(),
        position: yup.number(),
        image: yup.array().min(1, "Image Required!")
    });

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/categories/active`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setCategories(res.data);
            });

    }, [createOpen, editOpen, active])

    const handleOpen = () => {
        setCreateOpen(true);
    };

    const handleClose = () => {
        setCreateOpen(false);
    };

    return (
        <Box>
            <Box style={{ marginTop: '-56px', marginBottom: '24px', display: 'flex', justifyContent: 'end' }} >
                <Button variant="outlined" onClick={handleOpen}>CREATE NEW CATEGORY</Button>
            </Box>

            <Dialog maxWidth="sm" fullWidth={true} open={createOpen} onClose={handleClose}>
                <DialogTitle>PLEASE CREATE A NEW CATEGORY</DialogTitle>
                <DialogContent>

                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            parentId: "",
                            position: "",
                            image: []
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {

                            const checkUniqueName = await uniqueName(categories, values.name);
                            if (checkUniqueName) {
                                const formData = new FormData();
                                formData.append('name', values?.name);
                                formData.append('description', values?.description);
                                formData.append('parentId', values?.parentId);
                                formData.append('position', values?.position);
                                formData.append('image', values?.image[0]?.file);
                                formData.append('userId', userInfo?.id);

                                axios.post(`${process.env.REACT_APP_SERVER_API}/categories/create`, formData, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                                })
                                    .then(() => {
                                        actions.setSubmitting(false);
                                        actions.resetForm();
                                        setCreateOpen(false);
                                        alert("New Category Created Successfully.");
                                    });
                            }
                            else {
                                alert("This category already exist! Please change category name.");
                            }
                        }}
                    >
                        {({ setFieldValue }) => {
                            return (
                                <Form>

                                    <Field name="name">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    required
                                                    label="Enter Category Name"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>

                                    <br /><br />

                                    <Field name="description">
                                        {({ field }) => (
                                            < >
                                                <Textarea
                                                    minRows={4}
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    placeholder="Enter Description"
                                                    color="neutral"
                                                    size="lg"
                                                    variant="outlined"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>

                                    <br />

                                    <Field name="parentId">
                                        {({ field }) => (
                                            < >
                                                <FormControl variant="standard" sx={{ width: "100%", fontsize: '18px' }}>
                                                    <InputLabel>Parent Category</InputLabel>
                                                    <Select
                                                        value={field.value}
                                                        onChange={field.onChange(field.name)}
                                                    >

                                                        {categories?.map(category => (
                                                            <MenuItem
                                                                key={category?.id}
                                                                value={category?.id}
                                                            >
                                                                {category?.name}
                                                            </MenuItem>
                                                        ))};

                                                    </Select>
                                                    <ErrorMessage
                                                        name="parentId"
                                                        component="div"
                                                        style={{ textAlign: 'start', color: 'red' }}
                                                    />
                                                </FormControl>
                                            </>
                                        )}
                                    </Field>

                                    <br /><br />

                                    <Field name="position">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    type="number"
                                                    label="Enter Category Position"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="position"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>

                                    <br /><br />

                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Field name="image">
                                                {({ field }) => (
                                                    < >
                                                        <ImageUploading
                                                            value={field.value}
                                                            onChange={image => {
                                                                setFieldValue("image", image);
                                                            }}
                                                            maxFileSize={5000000}
                                                            dataURLKey="data_url"
                                                            acceptType={['jpg', 'jpeg', 'gif', 'png']}
                                                            resolutionType={'absolute'}
                                                            resolutionWidth={600}
                                                            resolutionHeight={600}
                                                        >
                                                            {({
                                                                imageList,
                                                                onImageUpload,
                                                                onImageRemove,
                                                                errors
                                                            }) => (
                                                                <Box
                                                                    style={{ textAlign: 'start' }}
                                                                >
                                                                    <Box
                                                                        sx={{ borderBottom: '1.5px solid gray', pb: 1 }}
                                                                    >
                                                                        <Button
                                                                            color="primary"
                                                                            variant="outlined"
                                                                            onClick={onImageUpload}
                                                                        >
                                                                            Upload Image
                                                                        </Button>
                                                                        <span style={{ padding: '5px 15px' }}>Image Resolution 600 X 600</span>
                                                                    </Box>

                                                                    {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                                        {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                                                        {errors.acceptType && <span>Your selected file type is not allow</span>}
                                                                        {errors.resolution && <span>Selected file is not match desired resolution</span>}
                                                                    </div>}

                                                                    <Box
                                                                        sx={{ display: 'flex', justifyContent: 'start', py: 1 }}
                                                                    >
                                                                        {imageList.map((image, index) => (
                                                                            <Box
                                                                                sx={{ display: 'flex', justifyContent: 'start', pr: 2 }}
                                                                                key={index}
                                                                            >
                                                                                <Box style={{ position: 'relative' }}>
                                                                                    <img src={image.data_url} alt="" width="100" height="75" />
                                                                                    <CancelOutlinedIcon
                                                                                        onClick={() => onImageRemove(index)}
                                                                                        style={{ position: 'absolute', marginTop: '-1px', marginLeft: '-23px', color: 'red' }}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        ))}
                                                                    </Box>
                                                                </Box>
                                                            )}
                                                        </ImageUploading>
                                                        <ErrorMessage
                                                            name="image"
                                                            component="div"
                                                            style={{ textAlign: 'start', color: 'red', marginBottom: '10px' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', textAlign: 'start' }}>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                variant="contained"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik >

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateCategory;