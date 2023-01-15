import React from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthProvider';

const ProfileEdit = ({ type, component }) => {
    const { userInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ video: component?.video ? component?.video : '', files: [] }}
            validationSchema={yup.object({
                video: yup.string()
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('type', type);
                formData.append('componentId', component?.id);
                formData.append('video', values?.video);
                if (values?.files?.length > 0) {
                    formData.append('files', values?.files[0]);
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ textAlign: 'start', width: '60%' }}>
                                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>FILE</h4>
                                <a
                                    href={`${process.env.REACT_APP_SERVER_API}/static/components/${component?.file}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Tooltip title={component?.file?.toUpperCase()}>
                                        <div
                                            style={{
                                                width: '300px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                border: '1px solid #000066',
                                                borderRadius: '2.5px',
                                                fontSize: '14px',
                                                color: 'black',
                                                padding: '2.5px',
                                                backgroundColor: 'gray'
                                            }}
                                        >
                                            {component?.file?.toUpperCase()}
                                        </div>
                                    </Tooltip>
                                </a>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="files">
                                    {({ field }) => (
                                        < >
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    setFieldValue("files", files);
                                                }}
                                                style={{ fontSize: '18px', borderBottom: '2px solid gray', paddingBottom: '5px', width: '100%' }}
                                            />
                                            <ErrorMessage
                                                name="files"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red', marginTop: '10px' }}
                                            />
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="video">
                                    {({ field }) => (
                                        < >
                                            <TextField
                                                label="Change Video URL"
                                                value={field.value}
                                                onChange={field.onChange(field.name)}
                                                variant="standard"
                                                sx={{ width: '100%', fontsize: '18px', color: 'black' }}
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

export default ProfileEdit;