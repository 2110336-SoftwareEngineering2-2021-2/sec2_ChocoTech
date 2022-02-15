import DojiAppBar from "@frontend/components/ChangePassword/ChangePasswordBar";
import { Alert, Button, Container, Snackbar, TextField, Typography,styled } from "@mui/material";
import React, { useEffect } from "react";
import {object,string} from 'yup';
import {useForm,useWatch} from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export function ChangePassword(){
    const {register, control} = useForm();
    const oldPassword = useWatch({
        control,
        name : "oldPassword"
    });
    const newPassword = useWatch({
        control,
        name : "newPassword"
    });
    const passwordConfirmation = useWatch({
        control,
        name : "passwordConfirmation"
    });
    let passwordSchema = object({
        oldPasswordSchema: string().required(),
        newPasswordSchema: string().required(),
        confirmPasswordSchema: string().required()
    })
    const valid = passwordSchema.isValidSync({
        oldPasswordSchema : oldPassword,
        newPasswordSchema : newPassword,
        confirmPasswordSchema : passwordConfirmation
    });
    function submit(e){
        //assume that the old password is 12345
        if(oldPassword != "12345"){
            toast.error('Current password is incorrect!');
        }
        else if(passwordConfirmation != newPassword){
            toast.error('Password Confirmation is incorrect!');
        }else{
            toast.success('Password has been changed');
        }
        e.preventDefault();
        return false;
    }
    return(
        <div><DojiAppBar></DojiAppBar>
        <Container maxWidth = 'sm'>
            <Typography variant="small" fontWeight={400}> Choose a secure password </Typography>
            <Container sx={{mt:3,}} fixed>
                <form onSubmit={submit}>
                <TextField {...register("oldPassword")} type = "password" sx={{width : "100%", mb:2}} label="Current password..."></TextField>
            <TextField {...register("newPassword")} type = "password" sx={{width : "100%", mb:2}} label="New password..."></TextField>
            <TextField {...register("passwordConfirmation")} type = "password" sx={{width : "100%", mb:3}} label="Confirm new password..."></TextField>
            <Button type="submit" size="medium" variant="contained" sx={{p:2, width:"100%"}} disabled = {!valid} onClick = {submit}>
                <Typography variant="large" fontWeight='400' >Change password</Typography>
            </Button>
                </form>
                <Toaster position="bottom-center" reverseOrder={false}/>
                
        </Container>
        </Container>
        
        </div>
        
        
    )
}

export default ChangePassword;