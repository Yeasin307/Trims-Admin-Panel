import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';
import { Button, AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../Context/AuthProvider';

const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', my: 3 }}>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/">
                    <Button sx={{ width: '95%' }} variant='contained'>Dashboard</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/users">
                    <Button sx={{ width: '95%' }} variant='contained'>Users</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/productmanagement">
                    <Button sx={{ width: '95%' }} variant='contained'>Product Management</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/components">
                    <Button sx={{ width: '95%' }} variant='contained'>Components</Button>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/leads">
                    <Button sx={{ width: '95%' }} variant='contained'>Leads</Button>
                </Link>

                <div>
                    <Button sx={{ width: '95%', marginTop: '10px' }} onClick={logout} variant='contained'>Logout</Button>
                </div>

            </Box>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" noWrap component="div">
                            WELCOME TO ADMIN PANEL
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
