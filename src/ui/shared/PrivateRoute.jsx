import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../hook/UseAuth";
import { useEffect, useState } from "react";

export default function PrivateRout() {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const isLogged = async () => {
      const isLogin = await UseAuth();
      setLogin(isLogin);
    };
    isLogged();
  }, []);

  if (isLogin === null) {
    return <p>loading</p>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/authentication" />;
}
