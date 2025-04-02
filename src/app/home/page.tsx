import { getSignupUrl } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Home() {
  const signupUrl = getSignupUrl();

  return (
    <div className="flex items-center mx-auto py-32 w-[80%] justify-center">
      <div className="flex items-center flex-col space-y-12">
        <h1 className="text-4xl">Welcome to medispace</h1>

        <div className="flex space-x-12">
          <Link to="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
          <Link to={signupUrl} className="text-blue-600 underline">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
