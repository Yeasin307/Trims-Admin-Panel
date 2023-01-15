import React from 'react';
import { Box, Button } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../../context/AuthProvider';
import RichTextEditor from '../../richtext-editor/RichTextEditor';

const CEOMessageEdit = ({ type, component }) => {
    const { userInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ title: component?.title, subtitle: component?.subtitle, description: component?.description, image: [] }}
            validationSchema={yup.object({
                title: yup.string()
                    .required("Required!"),
                subtitle: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!")
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('type', type);
                formData.append('componentId', component?.id);
                formData.append('title', values?.title);
                formData.append('subtitle', values?.subtitle);
                formData.append('description', values?.description);
                if (values?.image?.length > 0) {
                    formData.append('images', values?.image[0]?.file);
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
                                                id="t17"
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
                                                id="t18"
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

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="description">
                                    {({ field }) => (
                                        < >
                                            <RichTextEditor
                                                field={field}
                                                placeholder="Change Component Description"
                                                id="t19"
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
                                                                        src={`${process.env.REACT_APP_SERVER_API}/static/components/${component?.image}`}
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

export default CEOMessageEdit;