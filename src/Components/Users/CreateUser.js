import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CreateUser = () => {

    const validationSchema = yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        username: yup.string(),
        email: yup.string(),
        password: yup.string()
    });

    return (
        <Box >
            <Typography sx={{ mt: 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE ENTER USER INFORMATION
            </Typography>

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                    password: ""
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const data = {
                        firstName: values?.firstName,
                        lastName: values?.lastName,
                        username: values?.username,
                        email: values?.email,
                        password: values?.password
                    }

                    axios.post("https://server.asdfashionbd.com/users/create", data, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                    })
                        .then((res) => {
                            actions.setSubmitting(false);
                            actions.resetForm();
                            alert(res.data);
                        })
                        .catch((err) => {
                            alert(err?.response?.data);
                        });
                }}
            >
                {({ values }) => {
                    return (
                        <Form>
                            <Field name="firstName">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter First Name"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="lastName">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Last Name"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="username">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Username"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="email">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Email"
                                            type="email"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="password">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Password"
                                            type="password"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

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
        </Box >
    );
};

export default CreateUser;