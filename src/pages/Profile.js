import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { AuthContext } from '../context/AuthProvider';

const Profile = () => {
    const { userInfo, setUserInfo, viewProfile, setViewProfile, editProfile, setEditProfile } = React.useContext(AuthContext);

    const handleViewClose = () => {
        setViewProfile(false);
    };

    const handleEditClose = () => {
        setEditProfile(false);
    };

    const validationSchema = yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        username: yup.string(),
        password: yup.string(),
        newPassword: yup.string()
    });

    return (
        <>
            {viewProfile &&
                <Dialog
                    maxWidth='sm'
                    fullWidth={true}
                    open={viewProfile}
                    onClose={handleViewClose}
                >

                    <Box
                        sx={{ backgroundColor: '#e6e4e1', px: 2.5 }}
                    >
                        <DialogTitle style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '26px', color: '#002884' }}>Details of {userInfo?.username}</DialogTitle>

                        <DialogContent>

                            <h4 style={{ textDecoration: 'underline', color: '#002884' }}>EMAIL</h4>
                            <p>{userInfo?.email}</p>

                            <h4 style={{ textDecoration: 'underline', color: '#002884' }}>FIRST NAME</h4>
                            <p>{userInfo?.firstName}</p>

                            <h4 style={{ textDecoration: 'underline', color: '#002884' }}>LAST NAME</h4>
                            <p>{userInfo?.lastName}</p>

                            <h4 style={{ textDecoration: 'underline', color: '#002884' }}>ROLE</h4>
                            <p>{userInfo?.role_id}</p>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleViewClose}>Close</Button>
                        </DialogActions>
                    </Box>

                </Dialog>}


            {editProfile &&
                <Dialog
                    maxWidth='sm'
                    fullWidth={true}
                    open={editProfile}
                    onClose={handleEditClose}
                >

                    <DialogTitle style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '22px', color: '#002884' }}>Edit Profile</DialogTitle>

                    <DialogContent>

                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                firstName: userInfo.firstName,
                                lastName: userInfo.lastName,
                                username: userInfo.username,
                                password: "",
                                newPassword: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, actions) => {

                                const data = {
                                    firstName: values?.firstName,
                                    lastName: values?.lastName,
                                    username: values?.username,
                                    password: values?.password,
                                    newPassword: values?.newPassword,
                                    userId: userInfo.id
                                }

                                axios.put(`${process.env.REACT_APP_SERVER_API}/users/update`, data, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                                })
                                    .then((response) => {
                                        const id = userInfo?.id;

                                        axios.post(`${process.env.REACT_APP_SERVER_API}/auth/check-login`, { id }, {
                                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                                        })
                                            .then((res) => {
                                                setUserInfo(res.data);
                                                actions.setSubmitting(false);
                                                actions.resetForm();
                                                alert(response?.data);
                                                setEditProfile(false);
                                            })
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
                                            <Box sx={{ width: '75%' }}>
                                                <Field name="firstName">
                                                    {({ field }) => (
                                                        < >
                                                            <TextField
                                                                required
                                                                label="Change First Name"
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
                                            <Box sx={{ width: '75%' }}>
                                                <Field name="lastName">
                                                    {({ field }) => (
                                                        < >
                                                            <TextField
                                                                required
                                                                label="Change Last Name"
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
                                            <Box sx={{ width: '75%' }}>
                                                <Field name="username">
                                                    {({ field }) => (
                                                        < >
                                                            <TextField
                                                                required
                                                                label="Change Username"
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
                                            <Box sx={{ width: '75%' }}>
                                                <Field name="password">
                                                    {({ field }) => (
                                                        < >
                                                            <TextField
                                                                required
                                                                label="Enter Your Password"
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
                                            <Box sx={{ width: '75%' }}>
                                                <Field name="newPassword">
                                                    {({ field }) => (
                                                        < >
                                                            <TextField
                                                                required
                                                                label="Enter New Password"
                                                                type="password"
                                                                value={field.value}
                                                                onChange={field.onChange(field.name)}
                                                                variant="standard"
                                                                sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                            />
                                                            <ErrorMessage
                                                                name="newPassword"
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
                                            <Box sx={{ width: '75%', textAlign: 'start' }}>
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

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleEditClose}>Close</Button>
                    </DialogActions>
                </Dialog>}
        </>
    );
};

export default Profile;