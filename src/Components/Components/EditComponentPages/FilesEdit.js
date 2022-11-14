import React from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AuthContext } from '../../../Context/AuthProvider';

const FilesEdit = ({ component, setComponent, setType, setActive }) => {
    const { userInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleFileDeleted = async (file, userId) => {
        if (component?.content?.files?.length > 1) {
            const proceed = window.confirm("Are you sure to deleted?");
            if (proceed) {
                const files = component?.content?.files.filter((fil) => {
                    return fil !== file
                })
                await axios.put("http://localhost:5000/components/delete-image-file", { type: component?.type, componentId: component?.id, content: files, userId }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        alert("File Deleted Successfully.");
                        axios.get(`http://localhost:5000/components/viewcomponent/${component?.id}`, {
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
            alert("Minimum One File Required!");
        }
    }

    return (
        <Formik

            enableReinitialize={true}
            initialValues={{ name: component?.name, files: [] }}
            validationSchema={yup.object({
                name: yup.string(),
                files: yup.array()
                    .max(component?.content?.files?.length === 5 ? 0 : 5 - component?.content?.files?.length, "Maximum Five Files Over!")
            })}
            onSubmit={async (values, actions) => {

                const formData = new FormData();
                formData.append('componentId', component?.id);
                formData.append('name', values?.name);
                formData.append('type', component?.type);
                formData.append('id', userInfo?.id);
                formData.append('previousFiles', component?.content?.files);
                for (const file of values?.files) {
                    formData.append('files', file);
                }

                axios.put("http://localhost:5000/components/update-with-image-file", formData, {
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

                        <br />

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ textAlign: 'start', width: '60%' }}>
                                <div>
                                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>FILES</h4>
                                    {component?.content?.files?.map((file, index) => (
                                        <div
                                            key={index}
                                            style={{ marginBottom: '5px' }}
                                        >
                                            <a
                                                href={`http://localhost:5000/static/components/${file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Tooltip title={file.toUpperCase()}>
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
                                                        {file.toUpperCase()}
                                                    </div>
                                                </Tooltip>
                                            </a>
                                            <CancelOutlinedIcon
                                                onClick={() => { handleFileDeleted(file, userInfo.id) }}
                                                style={{ position: 'absolute', marginTop: '-30px', marginLeft: '276.5px', color: 'red' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ width: '60%' }}>
                                <Field name="files">
                                    {({ field }) => (
                                        < >
                                            <input
                                                multiple
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

export default FilesEdit;