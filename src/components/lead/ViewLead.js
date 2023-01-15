import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import dateFormat from "dateformat";

const ViewLead = ({ viewOpen, setViewOpen, lead }) => {

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
                    <DialogTitle style={{ textDecoration: 'underline', textAlign: 'center', fontSize: '26px', color: '#002884' }}>Details of Lead Number : {lead?.leadNum}</DialogTitle>
                    <DialogContent>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>NAME</h4>
                        <p>{lead?.fullName}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>EMAIL</h4>
                        <p>{lead?.email}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>PHONE</h4>
                        <p>{lead?.phone}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>ADDRESS</h4>
                        <p>{lead?.address}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SUBJECT</h4>
                        <p>{lead?.subject}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>MESSAGE</h4>
                        <p>{lead?.message}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SEND TIME</h4>
                        <p>{dateFormat(new Date(lead?.createdAt).toString())}</p>

                        <h4 style={{ textDecoration: 'underline', color: '#002884' }}>SEEN TIME</h4>
                        <p>{dateFormat(new Date(lead?.updatedAt).toString())}</p>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleViewClose}>Close</Button>
                    </DialogActions>
                </Box>

            </Dialog>}
        </>
    );
};

export default ViewLead;