import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, NativeSelect, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TagsInput } from "react-tag-input-component";
import ImageUploading from "react-images-uploading";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RichTextEditor from '../richtext-editor/RichTextEditor';
import { AuthContext } from '../../context/AuthProvider';
import "./product.css";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [active, setActive] = React.useState("");
    const { userInfo } = React.useContext(AuthContext);

    const validationSchema = yup.object({
        name: yup.string(),
        categoryId: yup.string(),
        title: yup.string(),
        subtitle: yup.string(),
        description: yup.string().required("Required!"),
        tags: yup.array().of(yup.string()),
        images: yup.array()
            .max(product?.productDetails?.length === 5 ? 0 : 5 - product?.productDetails?.length, "Maximum Five Images Over!")
    });

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/products/viewproduct/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setProduct(res.data);
                setActive(res?.data.active);
                if (res?.data?.tags?.length !== 0) {
                    const tagsArray = res?.data?.tags.split(",");
                    setTags(tagsArray);
                }
            });
    }, [id]);

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

    const handleActive = async (e, productId, userId) => {
        if (e.target.value === "0") {
            const proceed = window.confirm("Are you sure to deactivated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/products/activate-deactivate`, { productId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        } else {
            const proceed = window.confirm("Are you sure to activated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/products/activate-deactivate`, { productId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        }
    };

    const handleImageDeleted = async (imageId, userId) => {
        if (product.productDetails.length > 1) {
            const proceed = window.confirm("Are you sure to deleted?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/products/image-deleted`, { imageId, userId }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        alert("Image Deleted Successfully.");
                        axios.get(`${process.env.REACT_APP_SERVER_API}/products/viewproduct/${id}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res) => {
                                setProduct(res.data);
                                setActive(res?.data.active);
                                if (res?.data?.tags?.length !== 0) {
                                    const tagsArray = res?.data?.tags.split(",");
                                    setTags(tagsArray);
                                }
                            });
                    });
            }
        }
        else {
            alert("Minimum One Images Required!");
        }
    }

    return (
        <Box >
            <Typography sx={{ mt: 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE EDIT PRODUCT INFORMATION
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <Box sx={{ textAlign: 'start', width: '60%' }}>
                    <FormControl >
                        <FormLabel style={{ color: '#002884' }} >THIS PRODUCT IS </FormLabel>
                        <RadioGroup
                            row
                            name="active"
                            value={active}
                            onChange={e => handleActive(e, product?.id, userInfo?.id)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Activate" />
                            <FormControlLabel value="0" control={<Radio />} label="Deactivate" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>

            {active === "1" && <Formik
                enableReinitialize={true}
                initialValues={{
                    name: product.productName,
                    categoryId: product.categoryId,
                    title: product.title,
                    subtitle: product.subTitle,
                    description: product.description,
                    tags: tags,
                    images: []
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {

                    const formData = new FormData();
                    formData.append('id', id);
                    formData.append('name', values?.name);
                    formData.append('categoryId', values?.categoryId);
                    formData.append('title', values?.title);
                    formData.append('subtitle', values?.subtitle);
                    formData.append('description', values?.description);
                    formData.append('tags', values?.tags);
                    formData.append('userId', userInfo.id);
                    for (const file of values?.images) {
                        formData.append('images', file?.file);
                    }

                    axios.put(`${process.env.REACT_APP_SERVER_API}/products/update`, formData, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                    })
                        .then((res) => {
                            actions.setSubmitting(false);
                            actions.resetForm();
                            alert(res.data);
                            axios.get(`${process.env.REACT_APP_SERVER_API}/products/viewproduct/${id}`, {
                                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            })
                                .then((res) => {
                                    setProduct(res.data);
                                    setActive(res?.data.active);
                                    if (res?.data?.tags?.length !== 0) {
                                        const tagsArray = res?.data?.tags.split(",");
                                        setTags(tagsArray);
                                    }
                                });
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
                                            label="Change Product Name"
                                            defaultValue=" "
                                            value={field?.value}
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

                                            <label style={{ textAlign: 'start', fontSize: ".75rem", color: "#a29ca9" }}>Change Category<span> *</span></label>

                                            <NativeSelect
                                                required
                                                onChange={field.onChange(field.name)}
                                                style={{ marginTop: '0px' }}
                                            >
                                                {categories?.map(category => (
                                                    <option
                                                        key={category?.id}
                                                        value={category?.id}
                                                        selected={category?.id === product?.categoryId}
                                                    >
                                                        {category?.name}
                                                    </option>
                                                ))};
                                            </NativeSelect>

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
                                            label="Change Product Title"
                                            defaultValue=" "
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
                                            label="Change Product Subtitle"
                                            defaultValue=" "
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
                                                    placeholder="Change Product Description"
                                                    id="t2"
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

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                                <Box sx={{ textAlign: 'start', width: '60%' }}>
                                    <Typography variant='button'>
                                        Images
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <Box
                                        sx={{ display: 'flex', justifyContent: 'start', py: 1 }}
                                    >
                                        {product?.productDetails?.map((image, index) => (
                                            <Box
                                                sx={{ pr: 2 }}
                                                key={index}
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_SERVER_API}/static/productimages/${image.image}`}
                                                    alt=""
                                                    width="100"
                                                    height="75"
                                                />
                                                <CancelOutlinedIcon
                                                    onClick={() => { handleImageDeleted(image.id, userInfo.id) }}
                                                    style={{ position: 'absolute', marginTop: '-2px', marginLeft: '-23px', color: 'red' }}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
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
                                                                    Upload New Images
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
                                                                {imageList?.map((image, index) => (
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
            </Formik >}
        </Box >
    );
};

export default EditProduct;