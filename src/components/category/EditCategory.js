import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, NativeSelect, Radio, RadioGroup, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../context/AuthProvider';

const EditCategory = ({ editOpen, setEditOpen, active, setActive, categories, category }) => {
    const { userInfo, uniqueName, cycleDetection } = React.useContext(AuthContext);

    const validationSchema = yup.object({
        name: yup.string()
            .min(3, "Minimum length is 3.")
            .max(45, "Maximum length is 45."),
        description: yup.string(),
        parentId: yup.string(),
        position: yup.number()
    });

    const handleActive = async (e, categoryId, userId) => {
        if (e.target.value === "0") {
            const proceed = window.confirm("If you deactivated this category the child category of this category is not shown in client side! Are you confirm to deactivated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/activate-deactivate`, { categoryId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        } else {
            const proceed = window.confirm("Are you sure to activated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/activate-deactivate`, { categoryId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        }
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    return (
        <>
            {editOpen && <Dialog maxWidth='sm' fullWidth={true} open={editOpen} onClose={handleEditClose}>

                <DialogTitle style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '22px', color: '#002884' }}>Edit Category {category?.name}</DialogTitle>
                <DialogContent>

                    <FormControl>
                        <FormLabel style={{ color: '#002884' }} >THIS CATEGORY IS </FormLabel>

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

                    {active === "1" && <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: category?.name,
                            description: category?.description,
                            parentId: category?.Parent?.id ? category?.Parent?.id : " ",
                            position: category?.position ? category?.position : '',
                            image: []
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {

                            if (values?.image?.length === 0) {

                                if (values.parentId === " ") {
                                    values.parentId = "";
                                }

                                if (category?.name === values.name) {
                                    const checkCycle = await cycleDetection(categories, category?.id, values.parentId);
                                    if (checkCycle) {
                                        alert("Please change parent category name. Here create a cycle!");
                                    }
                                    else {
                                        const categoryId = category?.id;
                                        const userId = userInfo?.id;
                                        await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/update-without-image`, { values, categoryId, userId }, {
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
                                else {
                                    const checkUniqueName = uniqueName(categories, values.name);
                                    if (checkUniqueName) {
                                        const checkCycle = await cycleDetection(categories, category?.id, values.parentId);
                                        if (checkCycle) {
                                            alert("Please change parent category name. Here create a cycle!");
                                        }
                                        else {
                                            const categoryId = category?.id;
                                            const userId = userInfo?.id;
                                            await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/update-without-image`, { values, categoryId, userId }, {
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
                                    else {
                                        alert("This category already exist! Please change category name.");
                                    }
                                }
                            }
                            else {

                                if (values.parentId === " ") {
                                    values.parentId = "";
                                }

                                if (category?.name === values.name) {
                                    const checkCycle = await cycleDetection(categories, category?.id, values.parentId);
                                    if (checkCycle) {
                                        alert("Please change parent category name. Here create a cycle!");
                                    }
                                    else {
                                        const formData = new FormData();
                                        formData.append('name', values?.name);
                                        formData.append('description', values?.description);
                                        formData.append('parentId', values?.parentId);
                                        formData.append('position', values?.position);
                                        formData.append('image', values?.image[0]?.file);
                                        formData.append('categoryId', category?.id);
                                        formData.append('userId', userInfo?.id);

                                        await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/update-with-image`, formData, {
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
                                else {
                                    const checkUniqueName = uniqueName(categories, values.name);
                                    if (checkUniqueName) {
                                        const checkCycle = await cycleDetection(categories, category?.id, values.parentId);
                                        if (checkCycle) {
                                            alert("Please change parent category name. Here create a cycle!");
                                        }
                                        else {
                                            const formData = new FormData();
                                            formData.append('name', values?.name);
                                            formData.append('description', values?.description);
                                            formData.append('parentId', values?.parentId);
                                            formData.append('position', values?.position);
                                            formData.append('image', values?.image[0]?.file);
                                            formData.append('categoryId', category?.id);
                                            formData.append('userId', userInfo?.id);

                                            await axios.put(`${process.env.REACT_APP_SERVER_API}/categories/update-with-image`, formData, {
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
                                    else {
                                        alert("This category already exist! Please change category name.");
                                    }
                                }
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
                                                    label="Change Category Name"
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
                                                    placeholder="Change Description"
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

                                                    <InputLabel variant="standard">
                                                        Change Parent Category
                                                    </InputLabel>

                                                    <NativeSelect
                                                        onChange={field.onChange(field.name)}
                                                    >
                                                        <option
                                                            value={" "}
                                                            selected={category?.Parent?.id === null}
                                                        >
                                                            None
                                                        </option>

                                                        {categories?.map(Category => (
                                                            <option
                                                                key={Category?.id}
                                                                value={Category?.id}
                                                                selected={Category?.id === category?.Parent?.id}
                                                            >
                                                                {Category?.name}
                                                            </option>

                                                        ))};

                                                    </NativeSelect>

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
                                                    label="Change Category Position"
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
                                                                <Box style={{ textAlign: 'start' }}>

                                                                    <Box>
                                                                        {imageList.length > 0 ?
                                                                            imageList.map((image, index) => (
                                                                                <Box
                                                                                    key={index}
                                                                                    sx={{ display: 'flex', justifyContent: 'start' }}
                                                                                >
                                                                                    <Box style={{ position: 'relative' }}>
                                                                                        <img
                                                                                            src={image.data_url}
                                                                                            alt=""
                                                                                            width="100"
                                                                                            height="75"
                                                                                        />
                                                                                        <CancelOutlinedIcon
                                                                                            onClick={() => onImageRemove(index)}
                                                                                            style={{ position: 'absolute', marginTop: '-1px', marginLeft: '-23px', color: 'red' }}
                                                                                        />
                                                                                    </Box>
                                                                                </Box>
                                                                            ))
                                                                            :
                                                                            <Box >
                                                                                <img
                                                                                    src={`${process.env.REACT_APP_SERVER_API}/static/categoryimages/${category?.image}`}
                                                                                    alt=""
                                                                                    width="100"
                                                                                    height="75" />
                                                                            </Box>
                                                                        }
                                                                    </Box>

                                                                    <Box sx={{ borderBottom: '1.5px solid gray', pb: 1 }}>
                                                                        <Button
                                                                            color="primary"
                                                                            variant="outlined"
                                                                            onClick={onImageUpload}
                                                                        >
                                                                            Update Image
                                                                        </Button>
                                                                        <span style={{ padding: '5px 15px' }}>Image Resolution 600 X 600</span>
                                                                    </Box>

                                                                    {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                                        {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                                                        {errors.acceptType && <span>Your selected file type is not allow</span>}
                                                                        {errors.resolution && <span>Selected file is not match desired resolution</span>}
                                                                    </div>}

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

                                    <br />

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
                    </Formik >}

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                </DialogActions>

            </Dialog>}
        </>
    );
};

export default EditCategory;