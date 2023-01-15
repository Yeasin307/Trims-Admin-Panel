import React from 'react';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ViewLead from '../components/lead/ViewLead';

const Leads = () => {
    const [leads, setLeads] = React.useState([]);
    const [lead, setLead] = React.useState({});
    const [viewOpen, setViewOpen] = React.useState(false);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/leads`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setLeads(res?.data);
            });
    }, [viewOpen]);

    const handleViewOpen = async (id) => {
        await axios.post(`${process.env.REACT_APP_SERVER_API}/leads/lead-details`, { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then(async (res) => {
                setLead(res?.data);
                if (res?.data?.seen === "0") {
                    await axios.put(`${process.env.REACT_APP_SERVER_API}/leads/seen`, { id }, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                    })
                }
            });
        setViewOpen(true);
    };

    return (
        <>
            <ViewLead
                viewOpen={viewOpen}
                setViewOpen={setViewOpen}
                lead={lead}
            ></ViewLead>

            <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Lead Number</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Subject</TableCell>
                            <TableCell align="center">View</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {leads?.map((lead) => (
                            <TableRow
                                key={lead?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: `${lead?.seen === "1" ? "#e6e4e1" : "#fff"}` }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {lead?.leadNum}
                                </TableCell>
                                <TableCell align="center">{lead?.fullName}</TableCell>
                                <TableCell align="center">{lead?.email}</TableCell>
                                <TableCell align="center">{lead?.subject}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => { handleViewOpen(lead?.id) }} sx={{ mr: 1 }} variant="outlined" color="success">VIEW</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default Leads;