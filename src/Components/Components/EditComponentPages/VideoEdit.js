import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from '../../../Context/AuthProvider';

const VideoEdit = ({ component }) => {
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ name: component?.name, video: component?.content }}
            validationSchema={yup.object({
                name: yup.string(),
                video: yup.string().required("Required!")
            })}
            onSubmit={async (values, actions) => {
                const data = {
                    componentId: component?.id,
                    name: values?.name,
                    content: values?.video,
                    userId: userInfo?.id
                }

                axios.put("http://localhost:5000/components/update", data, {
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

                        <Box sx={{ marginBottom: 2.5 }}>
                            <Field name="video">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Video URL"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="video"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>
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

export default VideoEdit;