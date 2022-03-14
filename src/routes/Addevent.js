import * as yup from "yup";
import { useFormik } from "formik";
import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Button, TextField } from "@mui/material";

const formValidationSchema = yup.object({
  eventname: yup.string().required("can't be blank"),
  eventdata: yup.string().required("can't be blank"),
  date: yup.date().nullable(),
});

export function AddEvents() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  if (isMyTokenExpired) {
    history.push("/login");
  }

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      userId: myDecodedToken.id,
      eventname: "",
      eventdata: "",
      date: new Date().toISOString(),
    },
    validationSchema: formValidationSchema,

    onSubmit: (values) => {
      const current = values.date;
      var hours = current.getHours();
      const date = `${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()} ${
        current.getHours() % 12 || 12
      }:${current.getMinutes()} ${hours >= 12 ? "pm" : "am"}`;
      console.log(date);

      const fdate = `${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`;
      const usersevent = {
        userId: values.userId,
        eventname: values.eventname,
        eventdata: values.eventdata,
        date: date,
        fdate: fdate,
      };

      AddEvent(usersevent);
    },
  });

  const AddEvent = async (values) => {
    const response = await fetch(`https://diary-manager-by-vrushabh.herokuapp.com/event`, {
      method: "POST",
      body: JSON.stringify({
        userId: values.userId,
        eventname: values.eventname,
        eventdata: values.eventdata,
        date: values.date,
        fdate: values.fdate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      history.push("/list");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="main-cont">
      <form onSubmit={handleSubmit}>
        <div className="event-container">
          <div className="Date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                inputFormat="dd-MM-yyyy hh:mm a"
                renderInput={(props) => <TextField {...props} />}
                label="Select Date and Time"
                value={values.date}
                minDate={new Date()}
                onChange={(value) => setFieldValue("date", value)}
              />
            </LocalizationProvider>
          </div>

          <div>
            <TextField
              id="eventname"
              name="eventname"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Event name"
              sx={{ width: 600 }}
              error={errors.eventname && touched.eventname}
              helperText={
                errors.eventname && touched.eventname && errors.eventname
              }
            />
          </div>
          <div>
            <TextField
              id="eventdata"
              name="eventdata"
              value={values.eventdata}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Event"
              multiline={true}
              rows={15}
              style={{
                width: 600,
                minWidth: 200,
                marginTop: 10,
              }}
              error={errors.eventdata && touched.eventdata}
              helperText={
                errors.eventdata && touched.eventdata && errors.eventdata
              }
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
