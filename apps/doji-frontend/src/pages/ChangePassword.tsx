import DojiAppBar from "@frontend/components/ChangePassword/AppBar";
import { Button, Container, TextField, Typography } from "@mui/material";


export function ChangePassword(){
    return(
        <div><DojiAppBar></DojiAppBar>
        <Container>
            <Typography variant="small" fontWeight={400}> Choose a secure password </Typography>
            <Container sx={{mt:3}}>
            <TextField sx={{width : "100%", mb:2}} label="Current password..."></TextField>
            <TextField sx={{width : "100%", mb:2}} label="New password..."></TextField>
            <TextField sx={{width : "100%", mb:3}} label="Confirm new password..."></TextField>
            <Button size="medium" variant="contained" sx={{p:2, width:"100%"}}>
                <Typography variant="large" fontWeight='400' >Change Password</Typography>
            </Button>
        </Container>
        </Container>
        
        </div>
        
        
    )
}

export default ChangePassword;