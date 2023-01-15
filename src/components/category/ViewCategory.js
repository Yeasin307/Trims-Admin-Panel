import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import dateFormat from "dateformat";

const ViewCategory = ({ viewOpen, setViewOpen, category, categoryChild }) => {

    const handleViewClose = () => {
        setViewOpen(false);
    };

    return (
        <>
            {viewOpen && <Dialog
                maxWidth='md'
                fullWidth={true}
                open={viewOpen}
                onClose={handleViewClose}
            >

                <Box
                    sx={{ backgroundColor: '#e6e4e1', px: 2.5 }}
                >
                    <DialogTitle style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '26px', color: '#002884' }}>Details of {category?.name}</DialogTitle>
                    <DialogContent>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>DESCRIPTION</h4>
                        <p>{category?.description}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>PARENT CATEGORY</h4>
                        <p>{category?.Parent?.name}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CHILD CATEGORIES</h4>
                        {categoryChild?.map((child) => (
                            <p key={child?.name} style={{ display: "inline", paddingRight: '20px' }}>{child?.name}   </p>
                        ))}

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>Image</h4>
                        <img
                            src={`${process.env.REACT_APP_SERVER_API}/static/categoryimages/${category?.image}`}
                            alt="CategoryImage"
                            width={280}
                            height={200}
                            style={{ borderRadius: '5px' }}
                        />

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>POSITION</h4>
                        <p>{category?.position}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED BY</h4>
                        <p>{category?.createdByUser?.username}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED BY</h4>
                        <p>{category?.updatedByUser?.username}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>CREATED AT</h4>
                        <p>{dateFormat(new Date(category?.createdAt).toString())}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>UPDATED AT</h4>
                        <p>{dateFormat(new Date(category?.updatedAt).toString())}</p>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleViewClose}>Close</Button>
                    </DialogActions>
                </Box>

            </Dialog>}
        </>
    );
};

export default ViewCategory;