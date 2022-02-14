import DojiAppBar from "@frontend/components/ChangePassword/AppBar";
import { Alert, Button, Container, Snackbar, TextField, Typography,styled } from "@mui/material";
import React, { useEffect } from "react";

export function ChangePassword(){
    const [valid,setValid] = React.useState(false);
    const [oldPassword,setOldPassword] = React.useState('');
    const [newPassword,setNewPassword] = React.useState('');
    const [passwordConfirmation,setPasswordConfirmation] = React.useState('');
    const [alertMessage,setalertMessage] = React.useState('');
    const [alertType,setAlertType] = React.useState('success');
    const [openAlert,setOpenAlert] = React.useState(false);
    useEffect(verifyValidation);
    function submit(){
        //assume that the old password is 12345
        console.log(oldPassword,newPassword,passwordConfirmation);
        if(oldPassword != "12345"){
            setAlertType('error');
            setalertMessage('Current password is incorrect!');
        }
        else if(passwordConfirmation != newPassword){
            setAlertType('error');
            setalertMessage('Password Confirmation is incorrect!');
        }else{
            setAlertType('success');
            setalertMessage('Password has been changed');
        }
        setOpenAlert(true);
    }
    function verifyValidation(){
        
        if(oldPassword != "" && passwordConfirmation != "" && newPassword != ""){
            setValid(true);
        }
        else{
            setValid(false);
        }
    }
    function updateOldPassword(e){
        setOldPassword(e.target.value,);
    }
    function updateNewPassword(e){
        setNewPassword(e.target.value);
    }
    function updatePasswordConfirmation(e){
        setPasswordConfirmation(e.target.value);
    }
    function handleClose(){
        setOpenAlert(false);
    }
    return(
        <div><DojiAppBar></DojiAppBar>
        <Container fixed sx = {{
            width : {
                xs:'100%',
                md:'40%'
            }}
        }>
            <Typography variant="small" fontWeight={400}> Choose a secure password </Typography>
            <Container sx={{mt:3,}} fixed>
            <TextField type = "password" sx={{width : "100%", mb:2}} onChange = {e => updateOldPassword(e)} label="Current password..."></TextField>
            <TextField type = "password" sx={{width : "100%", mb:2}} onChange = {e => updateNewPassword(e)} label="New password..."></TextField>
            <TextField type = "password" sx={{width : "100%", mb:3}} onChange = {e => updatePasswordConfirmation(e)} label="Confirm new password..."></TextField>
            <Button size="medium" variant="contained" sx={{p:2, width:"100%"}} disabled = {!valid} onClick = {submit}>
                <Typography variant="large" fontWeight='400' >Change password</Typography>
            </Button>
            <Snackbar sx = {{mb:8}}open = {openAlert} autoHideDuration = {5000} onClose = {handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={alertType} variant="outlined">{alertMessage}</Alert>
            </Snackbar>
        </Container>
        </Container>
        
        </div>
        
        
    )
}

export default ChangePassword;