import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./app/home/page";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import axiosWithTenant from "./api/axios";
import AuthLayout from "./app/auth/layout";
import Signup from "./app/auth/signup/page";
import Login from "./app/auth/login/page";
import RegisterCompany from "./app/auth/register-company/page";
import Dashboard from "./app/dashboard/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register-company",
        element: <RegisterCompany />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const hostname = window.location.hostname;
const subdomain = hostname.split(".")[0];

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [tenantId, setTenantId] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/auth/register-company") {
      // Skip subdomain check for auth routes
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    if (hostname === import.meta.env.VITE_DOMAIN) {
      // skip domain check for root domain
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    const checkSubdomain = async () => {
      try {
        const response = await axios.get(`/auth/get-tenant-id/${subdomain}`);

        if (response.data.exists) {
          setIsAuthorized(true);
          setTenantId(response.data.tenantId);
        } else {
          window.location.href = "/auth/register-company";
        }
      } catch (error) {
        console.error("Subdomain check failed:", error);
        window.location.href = "/auth/register-company";
      } finally {
        setIsChecking(false);
      }
    };

    checkSubdomain();
  }, [location.pathname]);

  useEffect(() => {
    const interceptor = axiosWithTenant.interceptors.request.use(
      (config) => {
        if (tenantId) {
          config.headers["X-Tenant-ID"] = tenantId;
        }

        const token = localStorage.getItem(`${subdomain}-medispace-jwt-token`);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosWithTenant.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error) && error.config) {
          if (error.response?.status === 400) {
            try {
              console.log("Fetching tenant ID...");
              const tenantResponse = await axios.get(
                `/auth/get-tenant-id/${subdomain}`
              );

              if (tenantResponse.data.exists) {
                setTenantId(tenantResponse.data.tenantId);
                error.config.headers["X-Tenant-ID"] =
                  tenantResponse.data.tenantId;
                return axiosWithTenant.request(error.config);
              }
            } catch (fetchError) {
              console.error("Failed to fetch tenant ID", fetchError);
              window.location.href = "/auth/login";
            }
          }

          if (error.response?.status === 401) {
            console.log("Redirecting to signup");
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosWithTenant.interceptors.request.eject(interceptor);
      axiosWithTenant.interceptors.response.eject(responseInterceptor);
    };
  }, [tenantId]);

  if (isChecking) return <p>Checking access...</p>;

  return isAuthorized ? <RouterProvider router={router} /> : null;
}

export default App;
