import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

import { Box } from "@mui/system";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const { user } = useUserContext();
    
    // alternativa con hook    const {user} = useUserContext ()
    useRedirectActiveUser(user, "/dashboard")

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            await register ({ email, password});
            console.log("user registered");
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if(error.code === "auth/invalid-login-credentials"){
                return setErrors({email: "Usuario no registrado"});
            } if(error.code === "auth/invalid-login-credentials") {
                return setErrors({password: "Password incorrecto"});
            }
        } finally{
            setSubmitting(false);
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().email().required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password requerido")
    });

    return (
        <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>
            <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
            <AddAPhotoIcon />
            </Avatar>

            <Typography 
            variant="h5" 
            component="h1"
            >
                Register
            </Typography>

            <Formik 
                initialValues={{email: "", password: ""}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting
                }) => (

                    <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>

                        <TextField 
                            type="text" 
                            placeholder="Ingrese email" 
                            value={values.email} 
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
                            placeholder="Ingrese contraseña" 
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
                        loading={isSubmitting}
                        variant="contained"
                        fullWidth
                        sx={{mb: 3}}
                        >
                            Registrate
                        </LoadingButton>

                        <Button
                        component={Link}
                        fullWidth
                        to="/"
                        >
                            Ya tienes cuenta? Ingresa
                        </Button>
                    </Box>
                )
                }
            </Formik>
        </Box>
    );
};

export default Register;
