import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';
import { Button, AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/AuthProvider';
import { AccountCircle } from '@mui/icons-material';
import Profile from './Profile';

const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { setViewProfile, setEditProfile, logout } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const drawer = (
        <div>
            <Toolbar sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#1976D2' }}>
                <Typography color="#fff600ff" variant="h4" noWrap component="div">
                    Trim Tex
                </Typography>
            </Toolbar>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', my: 1 }}>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/">
                    <Button sx={{ width: '95%' }} variant='contained'>Dashboard</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/users">
                    <Button sx={{ width: '95%' }} variant='contained'>Users</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/productsmanagement">
                    <Button sx={{ width: '95%' }} variant='contained'>Products Management</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/components">
                    <Button sx={{ width: '95%' }} variant='contained'>Components</Button>
                </Link>

                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/leads">
                    <Button sx={{ width: '95%' }} variant='contained'>Leads</Button>
                </Link>

            </Box>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
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

                    <Box sx={{ flexGrow: 0, position: 'absolute', right: '32px' }}>
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <Avatar alt="Avatar">
                                <AccountCircle sx={{ fontSize: '48px' }} />
                            </Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                sx={{
                                    '&:hover': { color: '#1976d2' }
                                }}
                            >
                                <Typography
                                    onClick={() => setViewProfile(true)}
                                    sx={{ px: 2 }}
                                    textAlign="center"
                                >
                                    View Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    '&:hover': { color: '#1976d2' }
                                }}
                            >
                                <Typography
                                    onClick={() => setEditProfile(true)}
                                    sx={{ px: 2 }}
                                    textAlign="center"
                                >
                                    Edit Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    '&:hover': { color: '#1976d2' }
                                }}
                            >
                                <Typography
                                    onClick={logout}
                                    sx={{ px: 2 }}
                                    textAlign="center"
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
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
                <Profile />
                <Outlet />
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
