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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoctorRegistrationData } from "@/typings/user-registration";

const FormSchema = z.object({
  medicalLicenseNumber: z
    .string()
    .length(11, {
      message: "Medical License Number must be exactly 11 characters.",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Medical License Number must be alphanumeric.",
    }),
  specialization: z.string().min(5, { message: "Specialization is required." }),
  yearsOfExperience: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === "string" ? Number(value) : value))
    .refine((value) => !isNaN(value) && value >= 1, {
      message: "Years of experience must be a valid number and at least 1.",
    }),
});

export default function DoctorSignup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { doctorSignupMutation } = useAuthMutations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      medicalLicenseNumber: "",
      specialization: "",
      yearsOfExperience: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    const doctorData: DoctorRegistrationData = {
      medicalLicenseNumber: data.medicalLicenseNumber,
      specialization: data.specialization,
      yearsOfExperience: data.yearsOfExperience,
      userId: id ?? "",
      subdomain: subdomain,
    };

    doctorSignupMutation.mutate(doctorData, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }

  return (
    <div className="mx-auto w-[35%] space-y-4">
      <h2 className="text-center text-xl">
        Finish setting up your account on Medispace{" "}
      </h2>
      <div className="border p-6 rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="medicalLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Medical License Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Years of Experience"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`w-full cursor-pointer ${
                doctorSignupMutation.isPending ? "opacity-50" : "opacity-100"
              }`}
              size="lg"
            >
              {doctorSignupMutation.isPending ? "Please wait" : "Sign up"}
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
