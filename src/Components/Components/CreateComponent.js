import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RichTextEditor from "../../Utility/RichTextEditor/RichTextEditor";
import { AuthContext } from '../../Context/AuthProvider';
import "../ProductManagement/CreateProduct/CreateProduct.css";

const CreateComponent = () => {
    const [type, setType] = React.useState("TEXT");
    const [initialValues, setInitialValues] = React.useState({ name: '', text: '' });
    const [validationSchema, setValidationSchema] = React.useState(yup.object({
        name: yup.string(),
        text: yup.string().required("Required!")
    }));
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (type === "TEXT") {
            setInitialValues({ name: '', text: '' });
            const validationSchema = yup.object({
                name: yup.string(),
                text: yup.string().required("Required!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "IMAGE") {
            setInitialValues({ name: '', images: [] });
            const validationSchema = yup.object({
                name: yup.string(),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(5, "Maximum Five Images Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "FILE") {
            setInitialValues({ name: '', files: [] });
            const validationSchema = yup.object({
                name: yup.string(),
                files: yup.array()
                    .min(1, "Minimum One File Required!")
                    .max(5, "Maximum Five Files Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "VIDEO") {
            setInitialValues({ name: '', video: '' });
            const validationSchema = yup.object({
                name: yup.string(),
                video: yup.string().required("Required!")
            });
            setValidationSchema(validationSchema);
        }
    }, [type])

    return (
        <Box >
            <Typography sx={{ mt: 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE ENTER COMPONENT INFORMATION
            </Typography>

            <FormControl variant="standard" sx={{ fontsize: '18px', width: "60%", mb: 2.5 }}>
                <InputLabel>Select Content Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => { setType(e.target.value) }}
                    sx={{ textAlign: 'start' }}
                >
                    <MenuItem value="TEXT">TEXT</MenuItem>
                    <MenuItem value="IMAGE">IMAGE</MenuItem>
                    <MenuItem value="FILE">FILE</MenuItem>
                    <MenuItem value="VIDEO">VIDEO</MenuItem>
                </Select>
            </FormControl>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const formData = new FormData();
                    formData.append('name', values?.name);
                    formData.append('type', type);
                    if (type === "TEXT") {
                        formData.append('text', values?.text);
                    }
                    else if (type === "IMAGE") {
                        for (const file of values?.images) {
                            formData.append('images', file?.file);
                        }
                    }
                    else if (type === "FILE") {
                        for (const file of values?.files) {
                            formData.append('files', file);
                        }
                    }
                    else if (type === "VIDEO") {
                        formData.append('video', values?.video);
                    }
                    formData.append('id', userInfo?.id);

                    axios.post("http://localhost:5000/components/create", formData, {
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
                {({ values,
                    errors,
                    touched,
                    status,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    handleReset,
                    setTouched,
                    setFieldValue,
                    submitForm }) => {
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

                            {type === "TEXT" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2.5 }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="text">
                                        {({ field }) => (
                                            < >
                                                <RichTextEditor
                                                    field={field}
                                                />
                                                <ErrorMessage
                                                    name="text"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>}

                            {type === "IMAGE" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                                    Upload Images
                                                                </Button>
                                                            </Box>

                                                            {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                                                {errors.acceptType && <span>Your selected file type is not allow</span>}
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
                            </Box>}

                            {type === "FILE" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="files">
                                        {({ field }) => (
                                            < >
                                                <input
                                                    // required
                                                    // value={field.value}
                                                    multiple
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files);
                                                        // const files = [...e.target.files];
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
                            </Box>}

                            {type === "VIDEO" && <Box sx={{ marginBottom: 2.5 }}>
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
                            </Box>}

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

export default CreateComponent;