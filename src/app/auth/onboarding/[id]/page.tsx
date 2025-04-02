import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OnboardingUser() {
  const params = useParams();
  const { id } = params;
  console.log({ id });
  const navigate = useNavigate();
  const [category, setCategory] = useState<String | null>(null);

  return (
    <div className="w-[60%] space-y-12">
      <h1 className="text-xl text-center">Choose your category</h1>
      <div className="grid grid-cols-2 gap-4">
        <button
          className={`py-8 px-4 border rounded-md hover:border-primary cursor-pointer ease-in-out ${
            category === "doctor" && "border-primary"
          }`}
          onClick={() => {
            setCategory((prev) => {
              if (prev === "doctor") {
                return null;
              }
              return "doctor";
            });
          }}
        >
          <p className="text-lg">I am a doctor</p>
        </button>
        <button
          className={`py-8 px-4 border rounded-md hover:border-primary cursor-pointer ease-in-out ${
            category === "nurse" && "border-primary"
          }`}
          onClick={() => {
            setCategory((prev) => {
              if (prev === "nurse") {
                return null;
              }
              return "nurse";
            });
          }}
        >
          <p className="text-lg">I am a nurse</p>
        </button>

        <button
          className={`py-8 px-4 border rounded-md hover:border-primary cursor-pointer ease-in-out ${
            category === "receptionist" && "border-primary"
          }`}
          onClick={() => {
            setCategory((prev) => {
              if (prev === "receptionist") {
                return null;
              }
              return "receptionist";
            });
          }}
        >
          <p className="text-lg">I am a receptionist</p>
        </button>

        <button
          className={`py-8 px-4 border rounded-md hover:border-primary cursor-pointer ease-in-out ${
            category === "patient" && "border-primary"
          }`}
          onClick={() => {
            setCategory((prev) => {
              if (prev === "patient") {
                return null;
              }
              return "patient";
            });
          }}
        >
          <p className="text-lg">I am a patient</p>
        </button>
      </div>

      <div className={`flex justify-end`}>
        <Button
          className={`w-1/8 h-12 ${
            category !== null ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() => {
            if (category) {
              navigate("doctor");
            }
          }}
          disabled={category === null}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
