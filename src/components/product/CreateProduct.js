import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TagsInput } from "react-tag-input-component";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RichTextEditor from "../richtext-editor/RichTextEditor";
import { AuthContext } from '../../context/AuthProvider';
import "./product.css";

const CreateProduct = () => {
    const [categories, setCategories] = React.useState([]);
    const { userInfo } = React.useContext(AuthContext);
    const { id } = userInfo;

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/categories`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                const noChildCategories = res?.data?.filter(category => {
                    return category?.Child?.length === 0
                });
                setCategories(noChildCategories);
            });
    }, []);

    const validationSchema = yup.object({
        name: yup.string(),
        categoryId: yup.string(),
        title: yup.string(),
        subtitle: yup.string(),
        description: yup.string().required("Required!"),
        tags: yup.array().of(yup.string()),
        images: yup.array().min(1, "Minimum One Image Required!").max(5, "Maximum Five Images Over!")
    });

    return (
        <Box >
            <Typography sx={{ mt: 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE ENTER PRODUCT INFORMATION
            </Typography>

            <Formik
                initialValues={{
                    name: "",
                    categoryId: "",
                    title: "",
                    subtitle: "",
                    description: "",
                    tags: [],
                    images: []
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const formData = new FormData();
                    formData.append('name', values?.name);
                    formData.append('categoryId', values?.categoryId);
                    formData.append('title', values?.title);
                    formData.append('subtitle', values?.subtitle);
                    formData.append('description', values?.description);
                    formData.append('tags', values?.tags);
                    formData.append('id', id);

                    for (const file of values?.images) {
                        formData.append('images', file?.file);
                    }

                    axios.post(`${process.env.REACT_APP_SERVER_API}/products/create`, formData, {
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
                {({ values, setFieldValue }) => {
                    return (
                        <Form>
                            <Field name="name">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Product Name"
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

                            <Field name="categoryId">
                                {({ field }) => (
                                    < >
                                        <FormControl variant="standard" sx={{ fontsize: '18px', width: "60%" }}>
                                            <InputLabel required>Select Category
                                            </InputLabel>
                                            <Select
                                                required
                                                value={field.value}
                                                onChange={field.onChange(field.name)}
                                                sx={{ textAlign: 'start' }}
                                            >
                                                {categories?.map(category => (
                                                    <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
                                                ))};

                                            </Select>
                                            <ErrorMessage
                                                name="categoryId"
                                                component="div"
                                                style={{ textAlign: 'start', color: 'red' }}
                                            />
                                        </FormControl>
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="title">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            required
                                            label="Enter Product Title"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Field name="subtitle">
                                {({ field }) => (
                                    < >
                                        <TextField
                                            label="Enter Product Subtitle"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                            variant="standard"
                                            sx={{ width: '60%', fontsize: '18px', color: 'black' }}
                                        />
                                        <ErrorMessage
                                            name="subtitle"
                                            component="div"
                                            style={{ textAlign: 'start', color: 'red' }}
                                        />
                                    </>
                                )}
                            </Field>

                            <br /><br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="description">
                                        {({ field }) => (
                                            < >
                                                <RichTextEditor
                                                    field={field}
                                                    placeholder="Enter Product Description"
                                                    id="t1"
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

                            <br />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <Field name="tags">
                                        {({ field }) => (
                                            < >
                                                <TagsInput
                                                    value={values.tags}
                                                    onChange={tags => {
                                                        setFieldValue("tags", tags);
                                                    }}
                                                    placeHolder="Enter Product Tags"
                                                />
                                                <ErrorMessage
                                                    name="tags"
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
                                                    resolutionType={'absolute'}
                                                    resolutionWidth={800}
                                                    resolutionHeight={800}
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
                                                                <span style={{ padding: '5px 15px' }}>Image Resolution 800 X 800</span>
                                                            </Box>

                                                            {errors && <div style={{ color: 'red', margin: '5px 0px' }}>
                                                                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
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
        </Box >
    );
};

export default CreateProduct;