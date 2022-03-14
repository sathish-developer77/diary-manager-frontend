import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";


export const formValidationSchema = yup.object({
  name: yup
    .string()
    .min(2, "name is too short")
    .required("name can't be blank"),

  email: yup
    .string()
    .min(5, "email is too short")
    .required("email can't be blank")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "pattern not matches"),
  password: yup
    .string()
    .min(8, "password is too short")
    .required("password can't be blank"),
});

export function SignUp() {
  const theme = createTheme();
  const history = useHistory();


  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: { name: "", email: "", password: "" },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        Post(values);
      },
    });
  const Post = async (values) => {
    try {
      console.log(values);
      await fetch("https://diary-manager-by-vrushabh.herokuapp.com/user/signup", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(history.push("/login"))
      .then(alert("An Email sent to your Account please verify"))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    fullWidth
                    required
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Full Name"
                    type="text"
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email"
                    type="email"
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Password"
                    type="password"
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
