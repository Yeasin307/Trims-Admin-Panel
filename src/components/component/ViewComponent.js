import * as React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";

const ViewComponent = () => {
    const [component, setComponent] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/components/viewcomponent/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setComponent(res?.data);
            });
    }, [id]);

    return (
        <Box sx={{ textAlign: 'start', backgroundColor: '#e6e4e1', p: 5, borderRadius: 5 }}>
            <Box style={{ fontSize: '26px', color: '#002884', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ paddingRight: '5px' }}>DETAILS OF {component?.type}</div>
            </Box>

            <hr style={{
                marginTop: '0px',
                borderTop: "2px solid gray",
                borderRadius: "2px"
            }} />

            <Box >

                {component?.type !== "COMPANY_PROFILE" && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TITLE</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.title }} />
                </>}

                {(component?.type === "HOME_SLIDER" || component?.type === "ABOUT_US" || component?.type === "MANAGEMENT") && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SUBTITLE</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.subtitle }} />
                </>}

                {(component?.type !== "HOME_SLIDER" && component?.type !== "GALLERY" && component?.type !== "MANAGEMENT" && component?.type !== "COMPANY_PROFILE") && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>DESCRIPTION</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.description }} />
                </>}

                {(component?.type === "HOME_SLIDER" || component?.type === "GALLERY" || component?.type === "MANAGEMENT") && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>POSITION</h4>
                    <p>{component?.position}</p>
                </>}

                {(component?.type === "HOME_SLIDER" || component?.type === "ABOUT_US" || component?.type === "GALLERY" || component?.type === "MANAGEMENT" || component?.type === "CEO_MESSAGE") && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGE</h4>
                    <img
                        src={`${process.env.REACT_APP_SERVER_API}/static/components/${component?.image}`}
                        alt="img"
                        width={280}
                        height={200}
                        style={{ borderRadius: '5px' }}
                    />
                </>}

                {component?.type === "CLIENT" && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGES</h4>
                    {component?.image?.map((contentImage, index) => (
                        <img
                            key={index}
                            src={`${process.env.REACT_APP_SERVER_API}/static/components/${contentImage}`}
                            alt="img"
                            width={280}
                            height={200}
                            style={{ marginRight: '20px', borderRadius: '5px' }}
                        />
                    ))}
                </>}

                {component?.type === "COMPANY_PROFILE" && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>FILE</h4>
                    <a
                        href={`${process.env.REACT_APP_SERVER_API}/static/components/${component?.file}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Tooltip title={component?.file?.toUpperCase()}>
                            <div
                                style={{
                                    width: '300px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    border: '1px solid #000066',
                                    borderRadius: '2.5px',
                                    fontSize: '14px',
                                    color: 'black',
                                    padding: '2.5px',
                                    backgroundColor: 'gray'
                                }}
                            >
                                {component?.file?.toUpperCase()}
                            </div>
                        </Tooltip>
                    </a>
                </>}

                {component?.type === "COMPANY_PROFILE" && <>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>VIDEO</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.video }} />
                </>}

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