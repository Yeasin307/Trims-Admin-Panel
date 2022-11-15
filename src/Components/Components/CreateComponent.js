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
    const [type, setType] = React.useState("HOME_SLIDER");
    const [initialValues, setInitialValues] = React.useState({ title: '', subtitle: '', images: [] });
    const [validationSchema, setValidationSchema] = React.useState(yup.object({
        title: yup.string()
            .required("Required!")
            .min(12, 'Minimum 5 character')
            .max(57, 'Maximum 50 character'),
        subtitle: yup.string(),
        images: yup.array()
            .min(1, "Minimum One Image Required!")
            .max(1, "Maximum One Image Over!")
    }));
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (type === "HOME_SLIDER") {
            setInitialValues({ title: '', subtitle: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(1, "Maximum One Image Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "ABOUT_US") {
            setInitialValues({ title: '', subtitle: '', description: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character')
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "VISION") {
            setInitialValues({ title: '', subtitle: '', description: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character')
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "MISSION") {
            setInitialValues({ title: '', subtitle: '', description: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character')
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "GOAL") {
            setInitialValues({ title: '', subtitle: '', description: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character')
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "CLIENT") {
            setInitialValues({ title: '', subtitle: '', description: '', images: [], video: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character'),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(10, "Maximum Ten Images Over!"),
                video: yup.string()
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "EVENT") {
            setInitialValues({ title: '', subtitle: '', description: '', images: [], video: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character'),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(5, "Maximum Five Images Over!"),
                video: yup.string()
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "POST") {
            setInitialValues({ title: '', subtitle: '', description: '', images: [], video: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!")
                    .min(12, 'Minimum 5 character')
                    .max(57, 'Maximum 50 character'),
                subtitle: yup.string(),
                description: yup.string()
                    .required("Required!")
                    .min(57, 'Minimum 50 character')
                    .max(1007, 'Maximum 1000 character'),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(5, "Maximum Five Images Over!"),
                video: yup.string()
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
                <InputLabel>Select Component Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => { setType(e.target.value) }}
                    sx={{ textAlign: 'start' }}
                >
                    <MenuItem value="HOME_SLIDER">HOME_SLIDER</MenuItem>
                    <MenuItem value="ABOUT_US">ABOUT_US</MenuItem>
                    <MenuItem value="VISION">VISION</MenuItem>
                    <MenuItem value="MISSION">MISSION</MenuItem>
                    <MenuItem value="GOAL">GOAL</MenuItem>
                    <MenuItem value="CLIENT">CLIENT</MenuItem>
                    <MenuItem value="EVENT">EVENT</MenuItem>
                    <MenuItem value="POST">POST</MenuItem>
                </Select>
            </FormControl>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const formData = new FormData();
                    formData.append('type', type);
                    formData.append('title', values?.title);
                    formData.append('subtitle', values?.subtitle);
                    if (type !== "HOME_SLIDER") {
                        formData.append('description', values?.description);
                    }
                    if (type === "HOME_SLIDER") {
                        formData.append('images', values?.images[0]?.file);
                    }
                    if (type === "CLIENT" || type === "EVENT" || type === "POST") {
                        for (const image of values?.images) {
                            formData.append('images', image?.file);
                        }
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
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="title">
                                        {({ field }) => (
                                            < >
                                                <RichTextEditor
                                                    field={field}
                                                    placeholder="Enter Component Title"
                                                    id="t3"
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

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="subtitle">
                                        {({ field }) => (
                                            < >
                                                <RichTextEditor
                                                    field={field}
                                                    placeholder="Enter Component Subtitle"
                                                    id="t4"
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

                            <br />

                            {type !== "HOME_SLIDER" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="description">
                                        {({ field }) => (
                                            < >
                                                <RichTextEditor
                                                    field={field}
                                                    placeholder="Enter Component Description"
                                                    id="t5"
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
                            </Box>}

                            {(type === "HOME_SLIDER" || type === "CLIENT" || type === "EVENT" || type === "POST") && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                    maxNumber={type === "HOME_SLIDER" ? 1 : type === "CLIENT" ? 10 : 5}
                                                    dataURLKey="data_url"
                                                    acceptType={['jpg', 'jpeg', 'gif', 'png']}
                                                    resolutionType={'absolute'}
                                                    resolutionWidth={type === "HOME_SLIDER" ? 740 : 600}
                                                    resolutionHeight={type === "HOME_SLIDER" ? 724 : 600}
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
                                                                <span style={{ padding: '5px 15px' }}>Image Resolution {type === "HOME_SLIDER" ? "740 X 724" : "600 X 600"}</span>
                                                            </Box>

                                                            {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                                                {errors.maxNumber && <span>Exceed maxNumber of file</span>}
                                                                {errors.acceptType && <span>Your selected file type is not allow</span>}
                                                                {errors.resolution && <span>Selected file is not match desired resolution</span>}
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

                            {(type === "CLIENT" || type === "EVENT" || type === "POST") && <Box sx={{ marginBottom: 2.5 }}>
                                <Field name="video">
                                    {({ field }) => (
                                        < >
                                            <TextField
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