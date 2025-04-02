import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthMutations from "@/mutations/auth-mutations";
import { LoginData } from "@/typings/login";
import { Link, useNavigate } from "react-router-dom";
import { getSignupUrl } from "@/lib/utils";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const registerUrl = getSignupUrl();
  const { loginMutation } = useAuthMutations();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "samieoseh@gmail.com",
      password: "123456",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    // send a request to create a company and tenant data
    const loginData: LoginData = {
      password: data.password,
      email: data.email,
      subdomain,
    };

    loginMutation.mutate(loginData, {
      onSuccess: (data) => {
        // store access token in local storage
        localStorage.setItem(
          `${subdomain}-medispace-jwt-token`,
          data.user.accessToken
        );
        navigate("/dashboard");
      },
    });
  }

  return (
    <div className="mx-auto w-[35%] space-y-4">
      <h2 className="text-center text-xl">Sign in to Medispace </h2>
      <div className="border p-6 rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`w-full cursor-pointer ${
                loginMutation.isPending ? "opacity-50" : "opacity-100"
              }`}
              size="lg"
            >
              {loginMutation.isPending ? "Please wait" : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="border flex items-center justify-center p-6 rounded-md">
        <p>
          Don't have an account?{" "}
          <Link to={registerUrl} className="text-primary underline">
            Create account
          </Link>
        </p>
      </div>
      <div className="flex space-x-4 justify-center">
        <Link to="/terms" className="text-xs text-gray-700">
          Terms
        </Link>
        <Link to="/privacy-policy" className="text-xs text-gray-700">
          Privacy policy
        </Link>
        <Link to="/manage-cookies" className="text-xs text-gray-700">
          Manage cookies
        </Link>
        <Link to="/about" className="text-xs text-gray-700">
          About
        </Link>
      </div>
      <div className="justify-center items-center absolute bottom-0 flex w-[30%]">
        <p className="text-xs text-gray-600 text-center">Version 1.0.0.1</p>
      </div>
    </div>
  );
}
