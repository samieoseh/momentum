import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSignupUrl() {
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[1];

  let signupUrl: string;

  if (subdomain !== import.meta.env.VITE_DOMAIN) {
    signupUrl = "/auth/register-hospital";
  } else {
    signupUrl = "/auth/signup";
  }

  return signupUrl;
}
