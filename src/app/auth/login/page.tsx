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
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
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
    <div className="mx-auto w-[50%] py-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
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

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
