import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Users = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);

    const columns = [
        {
            field: 'username',
            headerName: 'User Name',
            sortable: false,
            width: 300
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
            width: 300
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            sortable: false,
            width: 300
        }
    ];

    React.useEffect(() => {
        setIsLoading(true);
        axios.get("https://server.asdfashionbd.com/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            });

    }, [])

    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <Link style={{ display: 'flex', justifyContent: 'end', textDecoration: 'none', marginBottom: '10px' }} to="/createuser">
                <Button variant='outlined'>CREATE NEW USER</Button>
            </Link>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <DataGrid
                rows={users}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableSelectionOnClick
            />}
        </Box>
    );
};

export default Users;