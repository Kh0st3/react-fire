import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import { Box } from "@mui/system";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {

    const navigate = useNavigate()
    const {user} = useUserContext ()

    useEffect(() =>{
        if(user) {
            navigate("/dashboard");
        }
    }, [user]);
    
    const onSubmit = async (
        { email, password }, 
        { setSubmitting, setErrors, resetForm}
    ) => {
        console.log(email, password);
        try{
            const credentialUser = await login({ email, password })
            console.log(credentialUser);
            resetForm();
        }catch (error) {
            console.log(error.code);
            console.log(error.message);
            if(error.code === "auth/invalid-login-credentials"){
                return setErrors({ email: "Usuario no registrado" });
            } if(error.code === "auth/invalid-login-credentials") {
                return setErrors({password: "Password incorrecto"});
            }
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password requerido"),
    });

    return (
        <Box sx={{mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>

            <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
            <AddAPhotoIcon />
            </Avatar>

            <Typography 
            variant="h5" 
            component="h1"
            >
                Login
            </Typography>

            <Formik 
            initialValues={{email: "", password: ""}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
                {
                    ({
                        values, 
                        handleSubmit, 
                        handleChange, 
                        errors, 
                        touched, 
                        handleBlur,
                        isSubmitting
                    }) =>(
            
                        <Box onSubmit={handleSubmit} 
                        sx={{mt:1}}
                        component="form" 
                        >

                        <TextField 
                        type="text" 
                        placeholder="email@example.com" 
                        value= {values.email} 
                        onChange={handleChange}
                        name="email"
                        onBlur={handleBlur}
                        id="email"
                        label="Ingrese Email"
                        fullWidth
                        sx={{mb: 3}}
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email && errors.email}
                        />
                            
                        <TextField
                        type="text" 
                        placeholder="123123" 
                        value={values.password} 
                        onChange={handleChange}
                        name="password"
                        onBlur={handleBlur}
                        id="password"
                        label="Ingrese Password"
                        fullWidth
                        sx={{mb: 3}}
                        error={errors.password && touched.password}
                        helperText={errors.password && touched.password && errors.password}
                        />

                        <LoadingButton
                        type="submit" 
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        variant="contained"
                        fullWidth
                        sx={{mb: 3}}
                        >
                            Acceder
                        </LoadingButton>

                        <Button
                        fullWidth
                        component={Link}
                        to= "/register"
                        >
                            No tienes cuenta? Resgistrate
                        </Button>
                        </Box>
                    )}
            </Formik>
                    </Box>
    );
};

export default Login;
