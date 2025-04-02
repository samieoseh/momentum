import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSignupUrl() {
  const hostname = window.location.hostname;

  // Extract subdomain if exists
  const domainParts = hostname.split(".");
  const isLocalhost = hostname === "localhost";
  const isSubdomain = domainParts.length > 1;
  const subdomain = isSubdomain ? domainParts[0] : null;
  const baseDomain = domainParts.slice(-2).join(".");

  console.log({
    isLocalhost,
    isSubdomain,
    domainParts,
    subdomain,
    baseDomain,
    viteDomain: import.meta.env.VITE_DOMAIN,
  });

  let signupUrl: string;

  if (isLocalhost) {
    // Plain localhost should go to register hospital
    signupUrl = "/auth/register-hospital";
  } else if (isSubdomain && subdomain !== "www") {
    // Any subdomain that is not "www" should go to /auth/signup
    signupUrl = "/auth/signup";
  } else {
    // Default case: "www" subdomain or the base domain itself
    signupUrl = "/auth/register-hospital";
  }

  return signupUrl;
}
