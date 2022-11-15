import React from 'react';
import { Box, Button } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../../Context/AuthProvider';
import RichTextEditor from '../../../Utility/RichTextEditor/RichTextEditor';

const HomeSliderEdit = ({ type, component }) => {
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ title: component?.title, subtitle: component?.subtitle, image: [] }}
            validationSchema={yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string()
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('type', type);
                formData.append('componentId', component?.id);
                formData.append('title', values?.title);
                formData.append('subtitle', values?.subtitle);
                if (values?.image?.length > 0) {
                    formData.append('images', values?.image[0]?.file);
                }
                formData.append('userId', userInfo?.id);
                axios.put("https://server.asdfashionbd.com/components/update", formData, {
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
                                                id="t9"
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
                                <Field name="subtitle">
                                    {({ field }) => (
                                        < >
                                            <RichTextEditor
                                                field={field}
                                                placeholder="Change Component Subtitle"
                                                id="t10"
                                            />
                                            <ErrorMessage
                                                name="subtitle"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red' }}
                                            />
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '60%' }}>
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
                                                resolutionWidth={740}
                                                resolutionHeight={724}
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
                                                                        src={`https://server.asdfashionbd.com/static/components/${component?.image}`}
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
                                                            <span style={{ padding: '5px 15px' }}>Image Resolution 740 X 724</span>
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

export default HomeSliderEdit;