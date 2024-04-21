import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { token } from "../../utils/token";

export default function PrivateRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  console.log(token);

  console.log(authenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (token !== undefined) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return authenticated ? children : <Navigate to="/authentication" />;
}
