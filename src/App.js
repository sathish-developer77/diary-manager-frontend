import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./routes/login";
import { SignUp } from "./routes/signup";
import { AddEvents } from "./routes/Addevent";
import { Forgot } from "./routes/forgotpassword";
import { Reset } from "./routes/resetpassword";
import { EventList } from "./routes/eventlist";
import { AppBar, Button, Toolbar } from "@mui/material";
import { AddToDiary } from "./routes/addToDiary";
import { Diary } from "./routes/diary";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { isExpired, decodeToken } from "react-jwt";
import { useState } from "react";

function App() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  const [login, setLogin] = useState(
    myDecodedToken && isMyTokenExpired === false ? true : false
  );
  function Logout() {
    localStorage.removeItem("token");
    setLogin(false);
    history.push("/login");
  }
  return (
    <div className="App">
      <AppBar position="static" style={{ marginBottom: "24px" }}>
        <Toolbar variant="dense">
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/list")}
          >
            Events
          </Button>

          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/diary")}
          >
            Diary
          </Button>

          {login === true ? (
            <Button color="inherit" sx={{ ml: "auto" }} onClick={Logout}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ ml: "auto" }}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Login setLogin={setLogin} />
        </Route>
        <Route path="/login">
          <Login setLogin={setLogin} />
        </Route>
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotpassword" component={Forgot} />
        <ProtectedRoute path="/addEvents" Proute={AddEvents} />
        <ProtectedRoute path="/resetpassword" Proute={Reset} />
        <ProtectedRoute path="/list" Proute={EventList} />
        <ProtectedRoute path="/add" Proute={AddToDiary} />
        <ProtectedRoute path="/diary" Proute={Diary} />
      </Switch>
    </div>
  );
}

export default App;
