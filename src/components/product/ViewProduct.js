import * as React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";

const ViewProduct = () => {
    const [product, setProduct] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/products/viewproduct/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setProduct(res?.data);
            });
    }, [id]);

    return (
        <Box sx={{ textAlign: 'start', backgroundColor: '#e6e4e1', p: 5, borderRadius: 5 }}>
            <Box style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '26px', color: '#002884' }}>
                Details of {product?.productName}
            </Box>
            <Box >

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CATEGORY NAME</h4>
                <p>{product?.categoryName?.name}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TITLE</h4>
                <p>{product?.title}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SUBTITLE</h4>
                <p>{product?.subTitle}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>DESCRIPTION</h4>
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGES</h4>
                {product?.productDetails?.map((productImage) => (
                    <img
                        key={productImage?.id}
                        src={`${process.env.REACT_APP_SERVER_API}/static/productimages/${productImage?.image}`}
                        alt="ProductImage"
                        width={280}
                        height={200}
                        style={{ marginRight: '20px', borderRadius: '5px' }}
                    />
                ))}

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TAGS</h4>
                <p>{product?.tags}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED BY</h4>
                <p>{product?.createdByUser?.username}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED BY</h4>
                <p>{product?.updatedByUser?.username}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED AT</h4>
                <p>{dateFormat(new Date(product?.createdAt).toString())}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED AT</h4>
                <p>{dateFormat(new Date(product?.updatedAt).toString())}</p>

            </Box>
        </Box>
    );
};

export default ViewProduct;