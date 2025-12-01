import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth_api } from "../utils/api";

export const checkAuth = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }

          const { response } = await auth_api("/auth/jwt/verify/", {
            method: "POST",
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (err) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    }, []);

    if (loading) {
      return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return <Component {...props} />;
  };
};
