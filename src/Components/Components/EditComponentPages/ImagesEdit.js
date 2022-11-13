import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../../Context/AuthProvider';

const ImagesEdit = ({ component, setComponent, setType, setActive }) => {
    const { userInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleImageDeleted = async (image, userId) => {
        if (component?.content?.images?.length > 1) {
            const proceed = window.confirm("Are you sure to deleted?");
            if (proceed) {
                const images = component?.content?.images.filter((img) => {
                    return img !== image
                })
                await axios.put("https://server.asdfashionbd.com/components/delete-image-file", { type: component?.type, componentId: component?.id, content: images, userId }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        alert("Image Deleted Successfully.");
                        axios.get(`https://server.asdfashionbd.com/components/viewcomponent/${component?.id}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res) => {
                                setType(res?.data?.type);
                                setComponent(res?.data);
                                setActive(res?.data?.active);
                            });
                    });
            }
        }
        else {
            alert("Minimum One Image Required!");
        }
    }

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ name: component?.name, images: [] }}
            validationSchema={yup.object({
                name: yup.string(),
                images: yup.array()
                    .max(component?.content?.images?.length === 5 ? 0 : 5 - component?.content?.images?.length, "Maximum Five Images Over!")
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('componentId', component?.id);
                formData.append('name', values?.name);
                formData.append('type', component?.type);
                formData.append('id', userInfo?.id);
                formData.append('previousImages', component?.content?.images);
                for (const file of values?.images) {
                    formData.append('images', file?.file);
                }

                axios.put("https://server.asdfashionbd.com/components/update-with-image-file", formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then((res) => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                        alert(res.data);
                        navigate("/components");
                    })
                    .catch((err) => {
                        alert(err?.response?.data);
                    });
            }}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form>
                        <Field name="name">
                            {({ field }) => (
                                < >
                                    <TextField
                                        required
                                        label="Enter Content Name"
                                        value={field.value}
                                        onChange={field.onChange(field.name)}
                                        variant="standard"
                                        sx={{ width: '60%', fontsize: '18px', color: 'black' }}
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

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ textAlign: 'start', width: '60%' }}>
                                <Typography variant='button'>
                                    Images
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '60%' }}>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'start', py: 1 }}
                                >
                                    {component?.content?.images?.map((image, index) => (
                                        <Box
                                            sx={{ pr: 2 }}
                                            key={index}
                                        >
                                            <img
                                                src={`https://server.asdfashionbd.com/static/components/${image}`}
                                                alt=""
                                                width="100"
                                                height="75"
                                            />
                                            <CancelOutlinedIcon
                                                onClick={() => { handleImageDeleted(image, userInfo.id) }}
                                                style={{ position: 'absolute', marginTop: '-2px', marginLeft: '-23px', color: 'red' }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="images">
                                    {({ field }) => (
                                        < >
                                            <ImageUploading
                                                multiple
                                                value={field.value}
                                                onChange={images => {
                                                    setFieldValue("images", images);
                                                }}
                                                maxFileSize={5000000}
                                                dataURLKey="data_url"
                                                acceptType={['jpg', 'jpeg', 'gif', 'png']}
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemoveAll,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps,
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
                                                                Upload New Images
                                                            </Button>
                                                        </Box>

                                                        {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                            {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                                            {errors.acceptType && <span>Your selected file type is not allow</span>}
                                                        </div>}

                                                        <Box
                                                            sx={{ display: 'flex', justifyContent: 'start', py: 1 }}
                                                        >
                                                            {imageList.map((image, index) => (
                                                                <Box
                                                                    sx={{ display: 'flex', justifyContent: 'start', pr: 2 }}
                                                                    key={index}
                                                                >
                                                                    <Box>
                                                                        <img src={image.data_url} alt="" width="100" height="75" />
                                                                        <Box>
                                                                            <Button
                                                                                type="button"
                                                                                color="primary"
                                                                                variant="outlined"
                                                                                onClick={() => onImageUpdate(index)}
                                                                                sx={{ width: 100 }}
                                                                            >Update
                                                                            </Button>
                                                                            <CancelOutlinedIcon
                                                                                onClick={() => onImageRemove(index)}
                                                                                style={{ position: 'absolute', marginTop: '-84px', marginLeft: '-23px', color: 'red' }}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                )}
                                            </ImageUploading>
                                            <ErrorMessage
                                                name="images"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red', marginBottom: '10px' }}
                                            />
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '60%', textAlign: 'start' }}>
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
    );
};

export default ImagesEdit;