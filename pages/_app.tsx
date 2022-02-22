import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>

            </AppBar>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
