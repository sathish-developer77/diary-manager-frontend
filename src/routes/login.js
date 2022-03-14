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
import { IconButton, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";

export const formValidationSchema = yup.object({
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

export function Login({setLogin}) {
  const theme = createTheme();
  const history = useHistory();

  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        // addUser(values);
        checkCredentials(values);
      },
    });

  const checkCredentials = async (values) => {
    const response = await fetch(`https://diary-manager-by-vrushabh.herokuapp.com/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      setLogin(true);
      history.push("/list");
    } else {
      alert(json.message);
    }
  };

  
  const copyToClipboard = async (text) => {
    copy(text);
  };
  return (
    <div>
    <div className="demo">
        <h1>DIARY MANAGER</h1>
        {/* <h5>
          Email: vrushabhmungelwar221@gmail.com
          <IconButton
            onClick={() => {
              const text = "vrushabhmungelwar221@gmail.com";
              copyToClipboard(text);
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </h5>

        <h5>
          Password: vrushabh123
          <IconButton
            onClick={() => {
              const text = "vrushabh123";
              copyToClipboard(text);
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </h5>
      </div> */}
      </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
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
                  Login
                </Button>
              </form>
              <Link
                component="button"
                variant="body2"
                sx={{ mr: 26 }}
                onClick={() => history.push("/signup")}
              >
                Signup
              </Link>
              <Link
                component="button"
                variant="body2"
                sx={{ ml: 0 }}
                onClick={() => history.push("/forgotpassword")}
              >
                Forgot Password
              </Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
