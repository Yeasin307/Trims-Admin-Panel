import * as React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";

const ViewComponent = () => {
    const [component, setComponent] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`http://localhost:5000/components/viewcomponent/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setComponent(res?.data);
            });
    }, [id]);

    return (
        <Box sx={{ textAlign: 'start', backgroundColor: '#e6e4e1', p: 5, borderRadius: 5 }}>
            <Box style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '26px', color: '#002884' }}>
                Details of {component?.name}
            </Box>
            <Box >

                <h4 style={{ textDecoration: 'underline', color: '#002884' }}>TYPE</h4>
                <p>{component?.type}</p>

                {component?.type === "TEXT" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>DESCRIPTION</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.content }} />
                </div>}

                {component?.type === "IMAGE" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>IMAGES</h4>
                    {component?.content?.images?.map((contentImage, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/static/components/${contentImage}`}
                            alt="contentImage"
                            width={280}
                            height={200}
                            style={{ marginRight: '20px', borderRadius: '5px' }}
                        />
                    ))}
                </div>}

                {component?.type === "FILE" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>FILES</h4>
                    {component?.content?.files?.map((contentFile, index) => (
                        <div
                            key={index}
                            style={{ marginBottom: '5px' }}
                        >
                            <a
                                href={`http://localhost:5000/static/components/${contentFile}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                <Tooltip title={contentFile.toUpperCase()}>
                                    <div
                                        style={{
                                            width: '300px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            border: '1px solid #000066',
                                            borderRadius: '2.5px',
                                            fontSize: '14px',
                                            color: '#000066',
                                            padding: '2.5px'
                                        }}
                                    >
                                        {contentFile.toUpperCase()}
                                    </div>
                                </Tooltip>
                            </a>
                        </div>
                    ))}
                </div>}

                {component?.type === "VIDEO" && <div>
                    <h4 style={{ textDecoration: 'underline', color: '#002884' }}>VIDEO</h4>
                    <div dangerouslySetInnerHTML={{ __html: component?.content }} />
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