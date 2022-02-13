import { AppBar, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export function DojiAppBar(){
    return(
        <AppBar position="static">
                <Toolbar>
                    <IconButton edge = "start" aria-label="menu" >
                        <Icon> <ArrowBackIosNewIcon></ArrowBackIosNewIcon> </Icon>
                    </IconButton>
                    <Typography variant="large" fontWeight='400'>Change Password</Typography>
                </Toolbar>
            </AppBar>
    )
}
export default DojiAppBar