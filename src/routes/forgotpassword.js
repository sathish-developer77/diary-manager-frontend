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
  email: yup
    .string()
    .min(5, "email is too short")
    .required("email can't be blank")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "pattern not matches"),
});

export function Forgot() {
  const history = useHistory();

  const theme = createTheme();

  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        ForgotPassword(values);
      },
    });

  const ForgotPassword = async (values) => {
    const response = await fetch(
      `https://diary-manager-by-vrushabh.herokuapp.com/forgotPassword`,
      {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("resetToken", json.token);
      localStorage.setItem("id", json.id);
      history.push("/login");
      alert("An email sent to your account please verify");
    } else {
      alert("No User with this Email");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 27,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Please enter your Email
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: 350 }}
                    label="Email"
                    type="email"
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
