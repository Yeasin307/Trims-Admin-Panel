import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../../context/AuthProvider';
import RichTextEditor from '../../richtext-editor/RichTextEditor';

const ClientEdit = ({ type, component, setComponent, setType, setActive }) => {
    const { userInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleImageDeleted = async (image, userId) => {
        if (component?.image?.length > 1) {
            const proceed = window.confirm("Are you sure to deleted?");
            if (proceed) {
                const images = component?.image.filter((img) => {
                    return img !== image
                })
                await axios.put(`${process.env.REACT_APP_SERVER_API}/components/delete-image`, { type, componentId: component?.id, image: images, userId }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        alert("Image Deleted Successfully.");
                        axios.get(`${process.env.REACT_APP_SERVER_API}/components/viewcomponent/${component?.id}`, {
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
            initialValues={{ title: component?.title, description: component?.description, images: [] }}
            validationSchema={yup.object({
                title: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!"),
                images: yup.array()
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('type', type);
                formData.append('componentId', component?.id);
                formData.append('title', values?.title);
                formData.append('description', values?.description);
                formData.append('previousImages', component?.image);
                if (values?.images?.length > 0) {
                    for (const image of values?.images) {
                        formData.append('images', image?.file);
                    }
                }
                formData.append('userId', userInfo?.id);

                axios.put(`${process.env.REACT_APP_SERVER_API}/components/update`, formData, {
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="title">
                                    {({ field }) => (
                                        < >
                                            <RichTextEditor
                                                field={field}
                                                placeholder="Change Component Title"
                                                id="t11"
                                            />
                                            <ErrorMessage
                                                name="title"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red' }}
                                            />
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="description">
                                    {({ field }) => (
                                        < >
                                            <RichTextEditor
                                                field={field}
                                                placeholder="Change Component Description"
                                                id="t13"
                                            />
                                            <ErrorMessage
                                                name="description"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red' }}
                                            />
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </Box>

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
                                    {component?.image?.map((image, index) => (
                                        <Box
                                            sx={{ pr: 2 }}
                                            key={index}
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_SERVER_API}/static/components/${image}`}
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
                                                resolutionType={'absolute'}
                                                resolutionWidth={100}
                                                resolutionHeight={80}
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageUpdate,
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
                                                                Upload New Images
                                                            </Button>
                                                            <span style={{ padding: '5px 15px' }}>Image Resolution 100 X 80</span>
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

export default ClientEdit;