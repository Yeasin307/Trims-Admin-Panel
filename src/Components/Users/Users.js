import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);

    const columns = [
        {
            field: 'username',
            headerName: 'User Name',
            sortable: false,
            width: 200
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            width: 350
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
        }
    ];

    React.useEffect(() => {
        axios.get("https://server.asdfashionbd.com/users", {
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
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Users;