import { Route, Redirect } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

export const ProtectedRoute = ({ Proute }) => {
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  return (
    <Route
      render={() =>
        myDecodedToken && isMyTokenExpired === false ? (
          <Proute />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
