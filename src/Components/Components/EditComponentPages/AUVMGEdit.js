import React from 'react';
import { Box, Button } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Context/AuthProvider';
import RichTextEditor from '../../../Utility/RichTextEditor/RichTextEditor';

const AUVMGEdit = ({ type, component }) => {
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ title: component?.title, subtitle: component?.subtitle, description: component?.description }}
            validationSchema={yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character')
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('type', type);
                formData.append('componentId', component?.id);
                formData.append('title', values?.title);
                formData.append('subtitle', values?.subtitle);
                formData.append('description', values?.description);
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
            {({ values }) => {
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
                                                id="t6"
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
                                                id="t7"
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
                                                id="t8"
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

export default AUVMGEdit;