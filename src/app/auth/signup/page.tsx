"use client";

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
import { SignupData } from "@/typings/signup";
import { Link, useNavigate } from "react-router-dom";

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Signup() {
  const navigate = useNavigate();
  const { signupMutation } = useAuthMutations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    const signupData: SignupData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      subdomain,
    };

    signupMutation.mutate(signupData, {
      onSuccess: (data) => {
        console.log({ data });
        navigate("/auth/onboarding/" + data.user._id);
      },
    });
  }

  return (
    <div className="mx-auto w-[35%] space-y-4">
      <h2 className="text-center text-xl">Sign up to Medispace </h2>
      <div className="border p-6 rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                signupMutation.isPending ? "opacity-50" : "opacity-100"
              }`}
              size="lg"
            >
              {signupMutation.isPending ? "Please wait" : "Next"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="border flex items-center justify-center p-6 rounded-md">
        <p>
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary underline">
            Sign in
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
