import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import {useAuth} from "../core/Auth/useAuth";
import {useNavigate} from "react-router-dom";

export default function ResponsiveAppBar() {
    const {logout, user} = useAuth()
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogoutClick = () => {
        handleCloseUserMenu();
        // noinspection JSIgnoredPromiseFromCall
        logout();
    };

    const goToNotes = () => {
        navigate('/')
    }
    const goToNewNote = () => {
        navigate('/new')
    }
    const goToPong = () => {
        window.location.href = "pong.html"
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex'}}>
                        <Button
                            onClick={goToNotes}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Notes
                        </Button>
                        <Button
                            onClick={goToNewNote}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Create note
                        </Button>
                        {/*<Button*/}
                        {/*    onClick={goToPong}*/}
                        {/*    sx={{my: 2, color: 'white', display: 'block'}}*/}
                        {/*>*/}
                        {/*    PONG*/}
                        {/*</Button>*/}
                    </Box>

                    <Box sx={{
                        ml: 'auto'
                    }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            {user && <Avatar {...stringAvatar(user.name)} />}
                        </IconButton>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
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
                            <MenuItem onClick={onLogoutClick}>
                                <Typography textAlign="center">Log out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}


function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
