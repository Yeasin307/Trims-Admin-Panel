import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = React.useState([]);

    const columns = [
        {
            field: 'username',
            headerName: 'User Name',
            width: 200,
            sortable: false
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 350,
            sortable: false
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            sortable: false,
            width: 250
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            sortable: false,
            width: 250
        },
        {
            field: 'role_id',
            headerName: 'Role',
            sortable: false,
            width: 150
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 250,
            sortable: false
        }
    ];

    React.useEffect(() => {
        axios.get("http://localhost:5000/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setUsers(res.data);
            });

    }, [])

    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Users;