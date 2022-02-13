import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
export function DojiAppBar(){
    return(
        <AppBar position="static" className="appBar"sx = {{
            backgroundColor : "white",
            boxShadow : "none",
            color : "black",
        }}>
                <Toolbar>
                    <Grid container spacing={0} sx={{ flexGrow: 1, alignItems : "center"}} >
                        <Grid xs={1} item>
                        <IconButton edge = "start" aria-label="menu">
                        </IconButton>
                        </Grid>
                        <Grid xs={11} textAlign = "center" item>
                        <Typography variant="large" fontWeight='400' >Change Password</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
    )
}
export default DojiAppBar