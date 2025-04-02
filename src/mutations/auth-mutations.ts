import {
  loginUser,
  registerAdmin,
  registerDoctor,
  registerHospital,
  signupUser,
} from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function useAuthMutations() {
  const registerHospitalMutation = useMutation({
    mutationFn: registerHospital,
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occured!!");
      }
    },
  });

  const registerAdminMutation = useMutation({
    mutationFn: registerAdmin,
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occured!!");
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occured!!");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occured!!");
      }
    },
  });

  const doctorSignupMutation = useMutation({
    mutationFn: registerDoctor,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occured!!");
      }
    },
  });

  return {
    registerHospitalMutation,
    registerAdminMutation,
    loginMutation,
    signupMutation,
    doctorSignupMutation,
  };
}
