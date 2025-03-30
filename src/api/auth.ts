import { CompanyRegistrationData } from "@/typings/company-registration";
import { UserRegistrationData } from "@/typings/user-registration";
import axios from "axios";
import axiosWithTenant from "./axios";
import { LoginData } from "@/typings/login";
import { SignupData } from "@/typings/signup";

const registerCompany = async (companyData: CompanyRegistrationData) => {
  const response = await axios.post("/auth/register-company", companyData);
  const data = await response.data;
  return data;
};

const registerAdmin = async (userData: UserRegistrationData) => {
  const response = await axiosWithTenant.post("/auth/register-admin", userData);
  const data = await response.data;
  return data;
};

const loginUser = async (loginData: LoginData) => {
  const tenantIdResponse = await axios.get(
    `/auth/get-tenant-id/${loginData.subdomain}`
  );
  const tenantIdData = await tenantIdResponse.data;

  axios.defaults.headers.common["x-tenant-id"] = tenantIdData.tenantId;
  axiosWithTenant.defaults.headers.common["x-tenant-id"] =
    tenantIdData.tenantId;

  const response = await axios.post("/auth/login", loginData);
  const data = await response.data;
  return data;
};

const signupUser = async (signupData: SignupData) => {
  const tenantIdResponse = await axios.get(
    `/auth/get-tenant-id/${signupData.subdomain}`
  );
  const tenantIdData = await tenantIdResponse.data;

  axios.defaults.headers.common["x-tenant-id"] = tenantIdData.tenantId;

  const response = await axios.post("/auth/signup", signupData);
  const data = await response.data;
  return data;
};
export { registerCompany, registerAdmin, loginUser, signupUser };
