import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CreateUser = () => {
    const [resendEmailLink, setResendEmailLink] = React.useState(false);

    const validationSchema = yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        username: yup.string(),
        email: yup.string(),
        password: yup.string(),
        confirmPassword: yup.string()
    });

    return (
        <Box >
            {!resendEmailLink && <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setResendEmailLink(true)}
                >
                    RESEND EMAIL CONFIRMATION LINK
                </Button>
            </Box>}

            <Typography sx={{ mt: resendEmailLink ? 9.5 : 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE ENTER USER {resendEmailLink ? "EMAIL" : "INFORMATION"}
            </Typography>

            {resendEmailLink && <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={yup.object({
                    email: yup.string()
                })}
                onSubmit={async (values, actions) => {

                    axios.post(`${process.env.REACT_APP_SERVER_API}/users/resendconfirmation`, { email: values?.email }, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                    })
                        .then((res) => {
                            actions.setSubmitting(false);
                            actions.resetForm();
                            alert(res?.data);
                        })
                        .catch((err) => {
                            alert(err?.response?.data);
                        });
                }}
            >
                {({ values }) => {
                    return (
                        <Form>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Field name="email">
                                        {({ field }) => (
                                            <>
                                                <TextField
                                                    required
                                                    type="email"
                                                    label="Enter User Email"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%', textAlign: 'start' }}>
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

            {!resendEmailLink && <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    if (values?.password === values?.confirmPassword) {

                        const data = {
                            firstName: values?.firstName,
                            lastName: values?.lastName,
                            username: values?.username,
                            email: values?.email,
                            password: values?.password
                        }

                        axios.post(`${process.env.REACT_APP_SERVER_API}/users/create`, data, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res) => {
                                actions.setSubmitting(false);
                                actions.resetForm();
                                alert(res?.data);
                            })
                            .catch((err) => {
                                alert(err?.response?.data);
                            });
                    }
                    else {
                        alert("Password Not Matched!");
                    }
                }}
            >
                {({ values }) => {
                    return (
                        <Form>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Field name="firstName">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    required
                                                    label="Enter First Name"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Field name="lastName">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    required
                                                    label="Enter Last Name"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="lastName"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Field name="username">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    required
                                                    label="Enter Username"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="username"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
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
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
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
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Field name="confirmPassword">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    required
                                                    label="Confirm Password"
                                                    type="password"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="confirmPassword"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '50%', textAlign: 'start' }}>
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
        </Box >
    );
};

export default CreateUser;