import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Google as GoogleIcon, Facebook as FacebookIcon, GitHub as GitHubIcon} from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Grid} from "@mui/material";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../constants";

const theme = createTheme();

export default function LoginPage() {
    // const link = useLi
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Authorization
                    </Typography>
                    <Typography variant="subtitle1">
                        If the account does not exist, it will be automatically created
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item>
                                <Button component="a" href={GOOGLE_AUTH_URL} variant="contained"
                                        size="large"
                                        startIcon={<GoogleIcon/>}>
                                    Log in with Google
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component="a" href={FACEBOOK_AUTH_URL} variant="outlined" size="large" startIcon={<FacebookIcon/>}>
                                    Log in with Facebook
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component="a" href={GITHUB_AUTH_URL}  variant="outlined" size="large" startIcon={<GitHubIcon/>}>
                                    Log in with GitHub
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
