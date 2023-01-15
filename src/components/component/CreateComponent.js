import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RichTextEditor from "../richtext-editor/RichTextEditor";
import { AuthContext } from '../../context/AuthProvider';
import "../product/product.css";

const CreateComponent = () => {
    const [type, setType] = React.useState("HOME_SLIDER");
    const [initialValues, setInitialValues] = React.useState({ title: '', subtitle: '', position: '', images: [] });
    const [validationSchema, setValidationSchema] = React.useState(yup.object({
        title: yup.string()
            .required("Required!"),
        subtitle: yup.string(),
        position: yup.number(),
        images: yup.array()
            .min(1, "Minimum One Image Required!")
            .max(1, "Maximum One Image Over!")
    }));
    const navigate = useNavigate();
    const { userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (type === "HOME_SLIDER" || type === "MANAGEMENT") {
            setInitialValues({ title: '', subtitle: '', position: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                subtitle: yup.string(),
                position: yup.number(),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(1, "Maximum One Image Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "VISION" || type === "MISSION" || type === "GOAL") {
            setInitialValues({ title: '', description: '' });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "CLIENT") {
            setInitialValues({ title: '', description: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!"),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "CEO_MESSAGE") {
            setInitialValues({ title: '', description: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!"),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(1, "Maximum One Image Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "ABOUT_US") {
            setInitialValues({ title: '', subtitle: '', description: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                subtitle: yup.string()
                    .required("Required!"),
                description: yup.string()
                    .required("Required!"),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(1, "Maximum One Image Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "GALLERY") {
            setInitialValues({ title: '', position: '', images: [] });
            const validationSchema = yup.object({
                title: yup.string()
                    .required("Required!"),
                position: yup.number(),
                images: yup.array()
                    .min(1, "Minimum One Image Required!")
                    .max(1, "Maximum One Image Over!")
            });
            setValidationSchema(validationSchema);
        }
        else if (type === "COMPANY_PROFILE") {
            setInitialValues({ files: [], video: '' });
            const validationSchema = yup.object({
                files: yup.array()
                    .min(1, "Minimum One File Required!")
                    .max(1, "Maximum One File Over!"),
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
                    <MenuItem value="GALLERY">GALLERY</MenuItem>
                    <MenuItem value="MANAGEMENT">MANAGEMENT</MenuItem>
                    <MenuItem value="CEO_MESSAGE">CEO_MESSAGE</MenuItem>
                    <MenuItem value="COMPANY_PROFILE">COMPANY_PROFILE</MenuItem>
                </Select>
            </FormControl>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const formData = new FormData();
                    formData.append('type', type);
                    formData.append('id', userInfo?.id);
                    values.title && formData.append('title', values?.title);
                    values.subtitle && formData.append('subtitle', values?.subtitle);
                    values.description && formData.append('description', values?.description);
                    values.position && formData.append('position', values?.position);
                    values.video && formData.append('video', values?.video);

                    if (type === "HOME_SLIDER" || type === "ABOUT_US" || type === "GALLERY" || type === "MANAGEMENT" || type === "CEO_MESSAGE") {
                        formData.append('images', values?.images[0]?.file);
                    }

                    if (type === "CLIENT") {
                        for (const image of values?.images) {
                            formData.append('images', image?.file);
                        }
                    }

                    if (type === "COMPANY_PROFILE") {
                        formData.append('files', values?.files[0]);
                    }

                    axios.post(`${process.env.REACT_APP_SERVER_API}/components/create`, formData, {
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
                            {type !== "COMPANY_PROFILE" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            </Box>}

                            <br />

                            {(type === "HOME_SLIDER" || type === "ABOUT_US" || type === "MANAGEMENT") && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            </Box>}

                            <br />

                            {(type !== "HOME_SLIDER" && type !== "GALLERY" && type !== "MANAGEMENT" && type !== "COMPANY_PROFILE") && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
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

                            {(type === "HOME_SLIDER" || type === "GALLERY" || type === "MANAGEMENT") && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="position">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    type="number"
                                                    label="Enter Component Position"
                                                    value={field.value}
                                                    onChange={field.onChange(field.name)}
                                                    variant="standard"
                                                    sx={{ width: '100%', fontsize: '18px', color: 'black' }}
                                                />
                                                <ErrorMessage
                                                    name="position"
                                                    component="div"
                                                    style={{ textAlign: 'start', color: 'red' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Box>
                            </Box>}

                            {(type !== "VISION" && type !== "MISSION" && type !== "GOAL" && type !== "COMPANY_PROFILE") && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                    maxNumber={type !== "CLIENT" ? 1 : undefined}
                                                    dataURLKey="data_url"
                                                    acceptType={['jpg', 'jpeg', 'gif', 'png']}
                                                    resolutionType={'absolute'}

                                                    resolutionWidth={type === "HOME_SLIDER" ? 1920 : type === "ABOUT_US" ? 600 : type === "CLIENT" ? 100 : type === "GALLERY" ? 800 : type === "MANAGEMENT" ? 270 : 400}

                                                    resolutionHeight={type === "HOME_SLIDER" ? 775 : type === "ABOUT_US" ? 600 : type === "CLIENT" ? 80 : type === "GALLERY" ? 800 : type === "MANAGEMENT" ? 330 : 400}
                                                >
                                                    {({
                                                        imageList,
                                                        onImageUpload,
                                                        onImageUpdate,
                                                        onImageRemove,
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
                                                                <span style={{ padding: '5px 15px' }}>Image Resolution {type === "HOME_SLIDER" ? "1920 X 775" : type === "ABOUT_US" ? "600 X 600" : type === "CLIENT" ? "100 X 80" : type === "GALLERY" ? "800 X 800" : type === "MANAGEMENT" ? "270 X 330" : "400 X 400"}</span>
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

                            {type === "COMPANY_PROFILE" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
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
                            </Box>}

                            {type === "COMPANY_PROFILE" && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="video">
                                        {({ field }) => (
                                            < >
                                                <TextField
                                                    label="Enter Video URL"
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