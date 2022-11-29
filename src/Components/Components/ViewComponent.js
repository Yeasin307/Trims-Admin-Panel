import * as React from 'react';
import { Box, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";

const ViewComponent = () => {
    const [component, setComponent] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`https://server.asdfashionbd.com/components/viewcomponent/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setComponent(res?.data);
            });
    }, [id]);

    return (
        <Box sx={{ textAlign: 'start', backgroundColor: '#e6e4e1', p: 5, borderRadius: 5 }}>
            <Box style={{ fontSize: '26px', color: '#002884', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ paddingRight: '5px' }}>Details of</div>
                <div dangerouslySetInnerHTML={{ __html: component?.title }} />
            </Box>

            <hr style={{
                marginTop: '0px',
                borderTop: "2px solid gray",
                borderRadius: "2px"
            }} />

            <Box >

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TYPE</h4>
                <p>{component?.type}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TITLE</h4>
                <div dangerouslySetInnerHTML={{ __html: component?.title }} />

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SUBTITLE</h4>
                <div dangerouslySetInnerHTML={{ __html: component?.subtitle }} />

                {component?.type !== "HOME_SLIDE" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>DESCRIPTION</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.description }} />
                </div>}

                {component?.type === "HOME_SLIDER" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGE</h4>
                    <img
                        src={`https://server.asdfashionbd.com/static/components/${component?.image}`}
                        alt="img"
                        width={280}
                        height={200}
                        style={{ borderRadius: '5px' }}
                    />
                </div>}

                {(component?.type === "CLIENT" || component?.type === "EVENT" || component?.type === "POST") && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGES</h4>
                    {component?.image?.map((contentImage, index) => (
                        <img
                            key={index}
                            src={`https://server.asdfashionbd.com/static/components/${contentImage}`}
                            alt="img"
                            width={280}
                            height={200}
                            style={{ marginRight: '20px', borderRadius: '5px' }}
                        />
                    ))}
                </div>}

                {(component?.type === "CLIENT" || component?.type === "EVENT" || component?.type === "POST") && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>VIDEO</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.video }} />
                </div>}

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED BY</h4>
                <p>{component?.createdByUser?.username}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED BY</h4>
                <p>{component?.updatedByUser?.username}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED AT</h4>
                <p>{dateFormat(new Date(component?.createdAt).toString())}</p>

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED AT</h4>
                <p>{dateFormat(new Date(component?.updatedAt).toString())}</p>

                <Link style={{ textDecoration: 'none', display: 'flex', justifyContent: 'end' }} to="/components">
                    <Button sx={{ width: '50px' }} variant='contained'>Back</Button>
                </Link>

            </Box>
        </Box>
    );
};

export default ViewComponent;