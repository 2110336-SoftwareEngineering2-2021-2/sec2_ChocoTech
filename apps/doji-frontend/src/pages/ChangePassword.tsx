import DojiAppBar from "@frontend/components/ChangePassword/ChangePasswordBar";
import { Alert, Button, Container, Snackbar, TextField, Typography,styled } from "@mui/material";
import React, { useEffect } from "react";
import {object,string} from 'yup';

export function ChangePassword(){
    const [valid,setValid] = React.useState(false);
    const [oldPassword,setOldPassword] = React.useState('');
    const [newPassword,setNewPassword] = React.useState('');
    const [passwordConfirmation,setPasswordConfirmation] = React.useState('');
    const [alertMessage,setalertMessage] = React.useState('');
    const [alertType,setAlertType] = React.useState('success');
    const [openAlert,setOpenAlert] = React.useState(false);
    let passwordSchema = object({
        oldPasswordSchema: string().required(),
        newPasswordSchema: string().required(),
        confirmPasswordSchema: string().required()
    })
    useEffect(verifyValidation,[oldPassword,newPassword,passwordConfirmation]);
    function submit(e){
        //assume that the old password is 12345
        //console.log(oldPassword,newPassword,passwordConfirmation);
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
        e.preventDefault();
        return false;
    }
    function verifyValidation(){
        setValid(passwordSchema.isValidSync({
            oldPasswordSchema : oldPassword,
            newPasswordSchema : newPassword,
            confirmPasswordSchema : passwordConfirmation
        }));
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
        <Container maxWidth = 'sm'>
            <Typography variant="small" fontWeight={400}> Choose a secure password </Typography>
            <Container sx={{mt:3,}} fixed>
                <form onSubmit={submit}>
                <TextField type = "password" sx={{width : "100%", mb:2}} onChange = {e => updateOldPassword(e)} label="Current password..."></TextField>
            <TextField type = "password" sx={{width : "100%", mb:2}} onChange = {e => updateNewPassword(e)} label="New password..."></TextField>
            <TextField type = "password" sx={{width : "100%", mb:3}} onChange = {e => updatePasswordConfirmation(e)} label="Confirm new password..."></TextField>
            <Button type="submit" size="medium" variant="contained" sx={{p:2, width:"100%"}} disabled = {!valid} onClick = {submit}>
                <Typography variant="large" fontWeight='400' >Change password</Typography>
            </Button>
                </form>
            
            <Snackbar sx = {{mb:8}}open = {openAlert} autoHideDuration = {5000} onClose = {handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={alertType} variant="outlined">{alertMessage}</Alert>
            </Snackbar>
        </Container>
        </Container>
        
        </div>
        
        
    )
}

export default ChangePassword;