import { Link } from "react-router-dom";

export default function Home() {
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[1];

  let signupUrl: string;

  console.log({ subdomain, viteDomain: import.meta.env.VITE_DOMAIN });
  if (subdomain !== import.meta.env.VITE_DOMAIN) {
    signupUrl = "register-company";
  } else {
    signupUrl = "signup";
  }

  return (
    <div className="flex items-center mx-auto py-32 w-[80%] justify-center">
      <div className="flex items-center flex-col space-y-12">
        <h1 className="text-4xl">Welcome to medispace</h1>

        <div className="flex space-x-12">
          <Link to="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
          <Link to={`/auth/${signupUrl}`} className="text-blue-600 underline">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
