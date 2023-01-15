import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AuthContext } from '../context/AuthProvider';
// import { DataGrid } from '@mui/x-data-grid';

const Users = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const { userInfo, logout } = React.useContext(AuthContext);
    // const [pageSize, setPageSize] = React.useState(10);

    // const columns = [
    //     {
    //         field: 'username',
    //         headerName: 'User Name',
    //         sortable: false,
    //         width: 300
    //     },
    //     {
    //         field: 'email',
    //         headerName: 'Email',
    //         sortable: false,
    //         width: 350
    //     },
    //     {
    //         field: 'firstName',
    //         headerName: 'First Name',
    //         sortable: false,
    //         width: 300
    //     },
    //     {
    //         field: 'lastName',
    //         headerName: 'Last Name',
    //         sortable: false,
    //         width: 300
    //     }
    // ];

    React.useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_API}/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            });

    }, [])

    const handleActive = async (userId, value) => {
        if (value === "0") {
            const proceed = window.confirm("Are you sure to deactivated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/users/activate-deactivate`, { userId, value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setIsLoading(true);
                        axios.get(`${process.env.REACT_APP_SERVER_API}/users`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res) => {
                                setUsers(res.data);
                                setIsLoading(false);
                                if (userInfo.id === userId) {
                                    logout();
                                }
                            });
                    });
            }
        } else {
            const proceed = window.confirm("Are you sure to activated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/users/activate-deactivate`, { userId, value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setIsLoading(true);
                        axios.get(`${process.env.REACT_APP_SERVER_API}/users`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                        })
                            .then((res) => {
                                setUsers(res.data);
                                setIsLoading(false);
                            });
                    });
            }
        }
    };

    return (
        <Box sx={{ height: 650, width: '100%' }}>

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/createuser">
                    <Button variant='outlined'>CREATE NEW USER</Button>
                </Link>
            </Box>

            {isLoading && <p>Loading...</p>}

            {!isLoading && <TableContainer component={Paper}>
                <Table sx={{ width: 1200 }} aria-label="categories table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="start">USER NAME</TableCell>
                            <TableCell align="start">EMAIL</TableCell>
                            <TableCell align="start">FIRST NAME</TableCell>
                            <TableCell align="start">LAST NAME</TableCell>
                            <TableCell align="start">ACTIVATE / DEACTIVATE</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users?.map((user) => (
                            <TableRow
                                key={user?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="start" component="th" scope="row">{user?.username}</TableCell>
                                <TableCell align="start">{user?.email}</TableCell>
                                <TableCell align="start">{user?.firstName}</TableCell>
                                <TableCell align="start">{user?.lastName}</TableCell>
                                <TableCell align="start">
                                    {user?.active === '1' ?
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() => handleActive(user?.id, '0')}
                                        >
                                            DEACTIVATE
                                        </Button>
                                        :
                                        <Button
                                            color="success"
                                            variant="outlined"
                                            onClick={() => handleActive(user?.id, '1')}
                                        >
                                            ACTIVATE
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

                // <DataGrid
                //     rows={users}
                //     columns={columns}
                //     pageSize={pageSize}
                //     onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                //     rowsPerPageOptions={[5, 10, 20]}
                //     pagination
                //     disableSelectionOnClick
                // />
            }
        </Box>
    );
};

export default Users;